import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Protocol } from '../models/report.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProtocolService {
  private apiUrl = `${environment.apiUrl}/protocols`;

  constructor(private http: HttpClient) { }

  // Get all protocols
  getAllProtocols(): Observable<Protocol[]> {
    return this.http.get<Protocol[]>(this.apiUrl)
      .pipe(
        tap(protocols => console.log('Fetched protocols:', protocols.length)),
        catchError(this.handleError<Protocol[]>('getAllProtocols', []))
      );
  }

  // Get protocol by ID
  getProtocolById(id: number): Observable<Protocol> {
    return this.http.get<Protocol>(`${this.apiUrl}/${id}`)
      .pipe(
        tap(protocol => console.log(`Fetched protocol id=${id}`)),
        catchError(this.handleError<Protocol>(`getProtocolById id=${id}`))
      );
  }

  // Get protocols by type
  getProtocolsByType(type: 'Homologation' | 'Requalification'): Observable<Protocol[]> {
    return this.http.get<Protocol[]>(`${this.apiUrl}/type/${type}`)
      .pipe(
        tap(protocols => console.log(`Fetched ${type} protocols:`, protocols.length)),
        catchError(this.handleError<Protocol[]>(`getProtocolsByType type=${type}`, []))
      );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      if (error instanceof HttpErrorResponse) {
        if (error.status === 403) {
          console.error(`${operation} failed: Not authorized`);
        } else if (error.status === 401) {
          console.error(`${operation} failed: Not authenticated`);
        } else {
          console.error(`${operation} failed: ${error.message}`);
        }
      } else {
        console.error(`${operation} failed: ${error.message}`);
      }

      // Let the app keep running by returning an empty result
      return of(result as T);
    };
  }
} 