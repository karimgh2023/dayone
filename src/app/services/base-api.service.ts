import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class BaseApiService {
  protected apiUrl = environment.apiUrl;
  
  /**
   * Handles HTTP errors in a consistent way across services
   * @param operation Name of the operation that failed
   * @param result Optional default value to return
   * @returns A function that handles errors for an observable stream
   */
  protected handleError<T>(operation = 'operation', result?: T) {
    return (error: HttpErrorResponse): Observable<T> => {
      // Log the error for debugging
      console.error(`${operation} failed:`, error);

      // Prepare a user-friendly error message
      let errorMessage: string;
      
      if (error.error instanceof ErrorEvent) {
        // Client-side or network error
        errorMessage = `Network error: ${error.error.message}`;
      } else {
        // Backend returned an unsuccessful response code
        // The response body may contain more information
        const serverError = error.error?.message || error.statusText;
        errorMessage = `Server error: ${error.status}. ${serverError}`;
      }
      
      // Return an observable with a user-facing error message
      return throwError(() => ({
        error: error.error,
        message: errorMessage,
        status: error.status,
        operation
      }));
    };
  }
  
  /**
   * Formats query parameters for HTTP requests
   * @param params Object containing query parameters
   * @returns Formatted query string
   */
  protected formatQueryParams(params: Record<string, any>): string {
    const queryParams = Object.entries(params)
      .filter(([_, value]) => value !== null && value !== undefined)
      .map(([key, value]) => {
        if (Array.isArray(value)) {
          return value.map(v => `${key}=${encodeURIComponent(v)}`).join('&');
        }
        return `${key}=${encodeURIComponent(value)}`;
      })
      .join('&');
      
    return queryParams ? `?${queryParams}` : '';
  }
} 