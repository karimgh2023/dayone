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
    const token = this.authService.getToken();
    const openRouterUrl = 'https://openrouter.ai';

    console.log(`[Auth Interceptor] Request to ${request.url}`);
    console.log(`[Auth Interceptor] Token exists: ${!!token}`);

    // ✅ 1. Ignorer les requêtes OpenRouter
    if (request.url.startsWith(openRouterUrl)) {
      console.log('[Auth Interceptor] OpenRouter request detected - skipping token');
      return next.handle(request);
    }

    // ✅ 2. Ignorer les requêtes de login
    if (request.url.includes('auth/login')) {
      console.log('[Auth Interceptor] Login request detected - bypassing auth header');
      return next.handle(request);
    }

    // ✅ 3. Ajouter le token si présent
    if (token) {
      const authRequest = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });

      console.log(`[Auth Interceptor] Adding auth header to request: ${request.url}`);

      return next.handle(authRequest).pipe(
        tap(() => {
          console.log(`[Auth Interceptor] Request to ${request.url} successful`);
        }),
        catchError((error: HttpErrorResponse) => {
          console.error(`[Auth Interceptor] Error on request to ${request.url}:`, error);

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

    // ✅ 4. Si pas de token : requête non protégée
    console.log(`[Auth Interceptor] No token, proceeding without auth header: ${request.url}`);
    return next.handle(request);
  }
}

