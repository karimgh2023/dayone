import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Check for token
    const token = this.authService.getToken();
    
    console.log(`[Auth Interceptor] Request to ${request.url}`);
    console.log(`[Auth Interceptor] Token exists: ${!!token}`);

    // Don't add auth header for authentication endpoints
    if (request.url.includes('/api/auth/login') || request.url.includes('/api/auth/register')) {
      console.log(`[Auth Interceptor] Auth endpoint detected, skipping token: ${request.url}`);
      return next.handle(request);
    }

    // Only clone and add auth header if token exists
    if (token) {
      const authRequest = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
      
      console.log(`[Auth Interceptor] Adding auth header to request: ${request.url}`);
      
      // Continue with modified request and add error handling
      return next.handle(authRequest).pipe(
        tap(event => {
          // Log on successful response
          console.log(`[Auth Interceptor] Request to ${request.url} successful`);
        }),
        catchError((error: HttpErrorResponse) => {
          console.error(`[Auth Interceptor] Error on request to ${request.url}:`, error);
          
          // Handle authentication errors (401, 403)
          if (error.status === 401) {
            console.warn('[Auth Interceptor] Unauthorized - redirecting to login');
            this.authService.logout();
            this.router.navigate(['/auth/login']);
          } else if (error.status === 403) {
            console.warn('[Auth Interceptor] Forbidden - access denied');
          }
          
          return throwError(() => error);
        })
      );
    }
    
    // Just pass the request through if no token
    console.log(`[Auth Interceptor] No token, proceeding without auth header: ${request.url}`);
    return next.handle(request);
  }
} 