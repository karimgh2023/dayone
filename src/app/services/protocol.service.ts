import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { Protocol } from '../models/report.model';
import { BaseApiService } from './base-api.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProtocolService extends BaseApiService {
  private protocolsUrl = `${this.apiUrl}/protocols`;

  constructor(private http: HttpClient) {
    super();
  }

  /**
   * Get all protocols
   * @returns Observable of Protocol array
   */
  getAllProtocols(): Observable<Protocol[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<Protocol[]>(this.protocolsUrl, { headers })
      .pipe(
        map(protocols => {
          return protocols.map(protocol => {
            // Ensure type property is set based on protocolType
            if (protocol.protocolType && !protocol.type) {
              protocol.type = protocol.protocolType;
            }
            
            // Ensure standardCriteriaCount and specificCriteriaCount are set
            if (!protocol.standardCriteriaCount) {
              protocol.standardCriteriaCount = 0;
            }
            if (!protocol.specificCriteriaCount) {
              protocol.specificCriteriaCount = 0;
            }
            
            return protocol;
          });
        }),
        tap(protocols => console.log('Fetched protocols:', protocols.length)),
        catchError(this.handleError<Protocol[]>('getAllProtocols', []))
      );
  }

  /**
   * Get all protocols grouped by type
   * @returns Observable of grouped protocols
   */
  getAllProtocolsGroupedByType(): Observable<{ [key: string]: Protocol[] }> {
    const headers = this.getAuthHeaders();
    return this.http.get<{ [key: string]: Protocol[] }>(`${this.protocolsUrl}/grouped`, { headers })
      .pipe(
        catchError(this.handleError<{ [key: string]: Protocol[] }>('getAllProtocolsGroupedByType', {}))
      );
  }

  /**
   * Get protocol by ID
   * @param id Protocol ID
   * @returns Observable of a single Protocol
   */
  getProtocolById(id: number): Observable<Protocol> {
    const headers = this.getAuthHeaders();
    return this.http.get<Protocol>(`${this.protocolsUrl}/${id}`, { headers })
      .pipe(
        tap(protocol => console.log(`Fetched protocol id=${id}`)),
        catchError(this.handleError<Protocol>(`getProtocolById id=${id}`))
      );
  }

  /**
   * Get protocols by type
   * @param type Protocol type
   * @returns Observable of Protocol array
   */
  getProtocolsByType(type: 'Homologation' | 'Requalification'): Observable<Protocol[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<Protocol[]>(`${this.protocolsUrl}/type/${type}`, { headers })
      .pipe(
        tap(protocols => console.log(`Fetched ${type} protocols:`, protocols.length)),
        catchError(this.handleError<Protocol[]>(`getProtocolsByType type=${type}`, []))
      );
  }

  /**
   * Get all protocol types
   * @returns Observable of protocol types
   */
  getAllProtocolTypes(): Observable<any[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<any[]>(`${this.protocolsUrl}/types`, { headers })
      .pipe(
        tap(types => console.log('Fetched protocol types:', types.length)),
        catchError(this.handleError<any[]>('getAllProtocolTypes', []))
      );
  }

  /**
   * Create a new protocol
   * @param protocol Protocol data
   * @returns Observable of the created Protocol
   */
  createProtocol(protocol: Partial<Protocol>): Observable<Protocol> {
    const headers = this.getAuthHeaders();
    return this.http.post<Protocol>(this.protocolsUrl, protocol, { headers })
      .pipe(
        tap(newProtocol => console.log('Created new protocol:', newProtocol)),
        catchError(this.handleError<Protocol>('createProtocol'))
      );
  }

  /**
   * Update an existing protocol
   * @param id Protocol ID
   * @param protocol Protocol data
   * @returns Observable of the updated Protocol
   */
  updateProtocol(id: number, protocol: Partial<Protocol>): Observable<Protocol> {
    const headers = this.getAuthHeaders();
    return this.http.put<Protocol>(`${this.protocolsUrl}/${id}`, protocol, { headers })
      .pipe(
        tap(_ => console.log(`Updated protocol id=${id}`)),
        catchError(this.handleError<Protocol>('updateProtocol'))
      );
  }

  /**
   * Delete a protocol
   * @param id Protocol ID
   * @returns Observable of void
   */
  deleteProtocol(id: number): Observable<void> {
    const headers = this.getAuthHeaders();
    return this.http.delete<void>(`${this.protocolsUrl}/${id}`, { headers })
      .pipe(
        tap(_ => console.log(`Deleted protocol id=${id}`)),
        catchError(this.handleError<void>('deleteProtocol'))
      );
  }

  /**
   * Add criteria to a protocol
   * @param protocolId Protocol ID
   * @param criteriaData Criteria data
   * @returns Observable of added criteria
   */
  addCriteriaToProtocol(protocolId: number, criteriaData: any): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post<any>(`${this.protocolsUrl}/${protocolId}/criteria`, criteriaData, { headers })
      .pipe(
        tap(criteria => console.log(`Added criteria to protocol id=${protocolId}`)),
        catchError(this.handleError<any>('addCriteriaToProtocol'))
      );
  }

  /**
   * Delete criteria from a protocol
   * @param protocolId Protocol ID
   * @param criteriaId Criteria ID
   * @returns Observable of void
   */
  deleteCriteria(protocolId: number, criteriaId: number): Observable<void> {
    const headers = this.getAuthHeaders();
    return this.http.delete<void>(`${this.protocolsUrl}/${protocolId}/criteria/${criteriaId}`, { headers })
      .pipe(
        tap(_ => console.log(`Deleted criteria id=${criteriaId} from protocol id=${protocolId}`)),
        catchError(this.handleError<void>('deleteCriteria'))
      );
  }

  /**
   * Get all criteria for a protocol
   * @param protocolId Protocol ID
   * @returns Observable of criteria
   */
  getCriteriaByProtocolId(protocolId: number): Observable<{ standardCriteria: any[], specificCriteria: any[] }> {
    const headers = this.getAuthHeaders();
    return this.http.get<{ standardCriteria: any[], specificCriteria: any[] }>(
      `${this.protocolsUrl}/${protocolId}/criteria`,
      { headers }
    ).pipe(
      tap(criteria => console.log(`Fetched criteria for protocol id=${protocolId}`)),
      catchError((error) => {
        console.error(`Error fetching criteria for protocol id=${protocolId}:`, error);
        // Fallback to mock data if the API call fails
        console.warn('Using mock data as fallback for criteria');
        
        // Mock data structure similar to the expected API response
        const mockCriteria = {
          standardCriteria: [
            {
              id: 1,
              description: 'Check all safety equipment is properly installed',
              implementationResponsible: { id: 1, name: 'Safety Department' },
              checkResponsible: { id: 2, name: 'Quality Control' }
            },
            {
              id: 2,
              description: 'Verify all documentation is complete and up-to-date',
              implementationResponsible: { id: 3, name: 'Documentation' },
              checkResponsible: { id: 4, name: 'Management' }
            }
          ],
          specificCriteria: [
            {
              id: 3,
              description: 'Perform pressure testing on all valves',
              implementationResponsible: [
                { id: 1, name: 'Engineering' },
                { id: 5, name: 'Maintenance' }
              ],
              checkResponsible: [
                { id: 2, name: 'Quality Control' }
              ]
            },
            {
              id: 4,
              description: 'Verify electrical systems meet industry standards',
              implementationResponsible: [
                { id: 6, name: 'Electrical Engineering' }
              ],
              checkResponsible: [
                { id: 2, name: 'Quality Control' },
                { id: 4, name: 'Management' }
              ]
            }
          ]
        };
        
        return of(mockCriteria);
      })
    );
  }

  /**
   * Update standard criteria
   * @param protocolId Protocol ID
   * @param criteriaId Criteria ID
   * @param criteriaData Criteria data
   * @returns Observable of updated criteria
   */
  updateStandardCriteria(protocolId: number, criteriaId: number, criteriaData: any): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.put<any>(`${this.protocolsUrl}/${protocolId}/standard-criteria/${criteriaId}`, criteriaData, { headers })
      .pipe(
        tap(_ => console.log(`Updated standard criteria id=${criteriaId} for protocol id=${protocolId}`)),
        catchError(this.handleError<any>('updateStandardCriteria'))
      );
  }

  /**
   * Update specific criteria
   * @param protocolId Protocol ID
   * @param criteriaId Criteria ID
   * @param criteriaData Criteria data
   * @returns Observable of updated criteria
   */
  updateSpecificCriteria(protocolId: number, criteriaId: number, criteriaData: any): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.put<any>(`${this.protocolsUrl}/${protocolId}/specific-criteria/${criteriaId}`, criteriaData, { headers })
      .pipe(
        tap(_ => console.log(`Updated specific criteria id=${criteriaId} for protocol id=${protocolId}`)),
        catchError(this.handleError<any>('updateSpecificCriteria'))
      );
  }

  /**
   * Get authorization headers
   * @returns HttpHeaders with Bearer token
   */
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  override handleError<T>(operation = 'operation', result?: T) {
    return (error: HttpErrorResponse): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
} 