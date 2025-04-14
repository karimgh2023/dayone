import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, retry } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Get the auth token from the service
    const token = this.authService.getToken();
    
    // Log the request for debugging
    console.log(`[Auth Interceptor] Processing request: ${request.url}`);
    
    // Check if this is a public endpoint that doesn't require authentication
    const isPublicEndpoint = this.isPublicEndpoint(request.url);
    
    if (token && !isPublicEndpoint) {
      try {
        // Validate token format to prevent corrupted tokens
        if (this.isValidJwtFormat(token)) {
          // Log token diagnostic info
          this.logTokenDiagnostics(token);
          
          // Clone the request and add the authorization header
          const authReq = request.clone({
            setHeaders: {
              Authorization: `Bearer ${token}`
            }
          });
          
          // Log for API requests
          console.log(`[Auth Interceptor] Adding token to request: ${request.url}`);
          
          // Send the newly created request with auth token
          return next.handle(authReq).pipe(
            tap(event => {
              if (event.type === 0) { // HttpEventType.Sent
                console.log(`[Auth Interceptor] Request sent to: ${request.url}`);
              } else if (event.type === 4) { // HttpEventType.Response
                console.log(`[Auth Interceptor] Response received from: ${request.url}, status: ${(event as any).status}`);
              }
            }),
            catchError((error: HttpErrorResponse) => {
              if (error.status === 401) {
                console.error('[Auth Interceptor] Authentication failed - token may be expired');
                // Clear token diagnostic info
                console.table({
                  'URL': request.url,
                  'Status': '401 Unauthorized',
                  'Error': 'Token rejected by server - may be expired or invalid'
                });
                // Handle token expiration
                this.authService.logout();
                this.router.navigate(['/auth/login']);
              } else if (error.status === 403) {
                console.error('[Auth Interceptor] Forbidden - access denied');
                console.table({
                  'URL': request.url,
                  'Status': '403 Forbidden',
                  'Error': 'You have a valid token but lack permission for this resource',
                  'User Role': this.decodeToken(token)?.role || 'Unknown',
                  'Required Role': this.getRequiredRoleForEndpoint(request.url)
                });
              } else {
                console.error(`[Auth Interceptor] Error on request to ${request.url}:`, error);
              }
              return throwError(() => error);
            })
          );
        } else {
          // Invalid token format, clear it and proceed without authentication
          console.error('[Auth Interceptor] Invalid token format detected, clearing token');
          console.table({
            'URL': request.url,
            'Error': 'Invalid token format',
            'Action': 'Clearing invalid token'
          });
          this.authService.logout();
          
          // For API requests requiring auth, redirect to login
          if (request.url.includes('/api/rapports')) {
            this.router.navigate(['/auth/login']);
          }
        }
      } catch (e) {
        // Error parsing/validating token
        console.error('[Auth Interceptor] Error processing token:', e);
        this.authService.logout();
      }
    } else if (isPublicEndpoint) {
      // For public endpoints, don't add token but add retry logic
      console.log(`[Auth Interceptor] Public endpoint: ${request.url}`);
      return next.handle(request).pipe(
        // Retry public endpoints up to 2 times
        retry(2),
        catchError((error: HttpErrorResponse) => {
          console.error(`[Auth Interceptor] Error on public endpoint ${request.url}:`, error);
          return throwError(() => error);
        })
      );
    }
    
    // If no token or invalid token, proceed with the original request
    return next.handle(request);
  }
  
  private isPublicEndpoint(url: string): boolean {
    // Define patterns for endpoints that don't need authentication
    return url.includes('/api/auth/') || 
           url.includes('/api/public/') || 
           url.includes('/api/protocols');
  }
  
  // Basic check for JWT token format (header.payload.signature)
  private isValidJwtFormat(token: string): boolean {
    if (!token) return false;
    
    // JWT tokens have 3 parts separated by dots
    const parts = token.split('.');
    if (parts.length !== 3) {
      console.error('[Auth Interceptor] Token does not have three parts');
      return false;
    }
    
    // Each part should be base64 encoded (only basic check)
    try {
      // Check if each part can be decoded
      for (const part of parts) {
        if (!part || part.trim() === '') {
          console.error('[Auth Interceptor] Token part is empty');
          return false;
        }
      }
      return true;
    } catch (e) {
      console.error('[Auth Interceptor] Error validating token format:', e);
      return false;
    }
  }
  
  // Helper method to decode token for diagnostics
  private decodeToken(token: string): any {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      
      return JSON.parse(jsonPayload);
    } catch (e) {
      console.error('[Auth Interceptor] Error decoding token:', e);
      return null;
    }
  }
  
  // Log diagnostic information about the token
  private logTokenDiagnostics(token: string): void {
    try {
      const decoded = this.decodeToken(token);
      if (!decoded) {
        console.warn('[Auth Interceptor] Could not decode token for diagnostics');
        return;
      }
      
      const now = Math.floor(Date.now() / 1000);
      const expiry = decoded.exp || 0;
      const issuedAt = decoded.iat || 0;
      const timeToExpiry = expiry - now;
      
      console.group('[Auth Interceptor] Token Diagnostics');
      console.table({
        'User Email': decoded.sub || decoded.email || 'Unknown',
        'User Role': decoded.role || (decoded.user?.role) || 'Unknown',
        'Token Issued': new Date(issuedAt * 1000).toLocaleString(),
        'Token Expires': new Date(expiry * 1000).toLocaleString(),
        'Time to Expiry': timeToExpiry > 0 ? `${Math.floor(timeToExpiry / 60)} minutes` : 'EXPIRED',
        'Token Valid': timeToExpiry > 0 ? 'Yes' : 'No'
      });
      console.groupEnd();
      
      // Check for common issues
      if (timeToExpiry <= 0) {
        console.error('[Auth Interceptor] Token is expired!');
      }
      
      if (!decoded.role && !(decoded.user?.role)) {
        console.error('[Auth Interceptor] Token is missing role information!');
      }
    } catch (e) {
      console.error('[Auth Interceptor] Error in token diagnostics:', e);
    }
  }
  
  // Map URL patterns to their likely required roles
  private getRequiredRoleForEndpoint(url: string): string {
    if (url.includes('/api/admin')) {
      return 'ADMIN';
    } else if (url.includes('/api/rapports')) {
      return 'Any authenticated user (EMPLOYEE, DEPARTMENT_MANAGER, ADMIN)';
    }
    return 'Unknown';
  }
} 