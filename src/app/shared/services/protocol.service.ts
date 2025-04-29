import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { BaseApiService } from './base-api.service';
import { environment } from '@/environments/environment';
import { Protocol } from '../../models/protocol.model';
import { ProtocolCreationRequest } from '../../models/protocol-creation-request.model';

@Injectable({
  providedIn: 'root'
})
export class ProtocolService extends BaseApiService {
  private protocolsUrl = `${this.apiUrl}/protocols`;

  constructor(private http: HttpClient) {
    super();
  }

  /**
   * Get all protocols grouped by their type
   * @returns Observable of protocols grouped by type
   */
  getAllProtocolsGroupedByType(): Observable<{ [key: string]: Protocol[] }> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
    return this.http.get<{ [key: string]: Protocol[] }>(`${this.protocolsUrl}/grouped`, { headers })
      .pipe(
        tap(response => console.log('[ProtocolService] Fetched grouped protocols:', response)),
        catchError((error: HttpErrorResponse) => {
          console.error('[ProtocolService] Error fetching grouped protocols:', error);
          return throwError(() => new Error('Failed to fetch grouped protocols'));
        })
      );
  }

  /**
   * Create a new protocol
   * @param data The protocol creation request data
   * @returns Observable of the created protocol
   */
  createProtocol(data: ProtocolCreationRequest): Observable<Protocol> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post<Protocol>(`${this.protocolsUrl}/create`, data, { headers })
      .pipe(
        tap(response => console.log('[ProtocolService] Created protocol:', response)),
        catchError((error: HttpErrorResponse) => {
          console.error('[ProtocolService] Error creating protocol:', error);
          return throwError(() => new Error('Failed to create protocol'));
        })
      );
  }
}
