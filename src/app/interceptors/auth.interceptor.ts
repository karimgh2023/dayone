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
import { AuthService } from '../shared/services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Get the auth token from the service
    const token = this.authService.getToken();
    
    // Check if this is a public endpoint that doesn't require authentication
    const isPublicEndpoint = this.isPublicEndpoint(request.url);
    
    if (token && !isPublicEndpoint) {
      // Clone the request and add the authorization header
      const authReq = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
      
      // Log for API requests (optional, helps with debugging)
      if (request.url.includes('/api/')) {
        console.log(`[Auth Interceptor] Adding token to request: ${request.url}`);
      }
      
      // Send the newly created request with auth token
      return next.handle(authReq).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            console.error('[Auth Interceptor] Authentication failed - token may be expired');
            // Handle token expiration
            this.authService.logout();
            window.location.href = '/login';
          } else if (error.status === 403) {
            console.error('[Auth Interceptor] Forbidden - access denied');
          } else {
            console.error(`[Auth Interceptor] Error on request to ${request.url}:`, error);
          }
          return throwError(() => error);
        })
      );
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
    
    // If no token, proceed with the original request
    return next.handle(request);
  }
  
  private isPublicEndpoint(url: string): boolean {
    // Define patterns for endpoints that don't need authentication
    // Only consider base protocol endpoints as public, not specific endpoints like criteria
    if (url.includes('/api/protocols/')) {
      // Check if it's a specific criteria endpoint - these need authentication
      if (url.includes('/criteria') || 
          url.includes('/standard-criteria') || 
          url.includes('/specific-criteria')) {
        return false;
      }
    }
    
    return url.includes('/api/auth/') || 
           url.includes('/api/public/') || 
           url.includes('/api/protocols'); // This will match the base protocols endpoint
  }
} 