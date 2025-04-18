import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
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

  // Get all protocol types
  getAllProtocolTypes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/types`)
      .pipe(
        tap(types => console.log('Fetched protocol types:', types.length)),
        catchError(this.handleError<any[]>('getAllProtocolTypes', []))
      );
  }

  // Create a new protocol
  createProtocol(protocolData: any): Observable<Protocol> {
    return this.http.post<Protocol>(`${this.apiUrl}/create`, protocolData)
      .pipe(
        tap(newProtocol => console.log('Created new protocol:', newProtocol)),
        catchError(this.handleError<Protocol>('createProtocol'))
      );
  }

  // Update an existing protocol
  updateProtocol(protocol: Protocol): Observable<Protocol> {
    return this.http.put<Protocol>(`${this.apiUrl}/${protocol.id}`, protocol)
      .pipe(
        tap(_ => console.log(`Updated protocol id=${protocol.id}`)),
        catchError(this.handleError<Protocol>('updateProtocol'))
      );
  }

  // Delete a protocol
  deleteProtocol(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`)
      .pipe(
        tap(_ => console.log(`Deleted protocol id=${id}`)),
        catchError(this.handleError<any>('deleteProtocol'))
      );
  }

  // Add criteria to a protocol
  addCriteriaToProtocol(protocolId: number, criteriaData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${protocolId}/criteria`, criteriaData)
      .pipe(
        tap(criteria => console.log(`Added criteria to protocol id=${protocolId}`)),
        catchError(this.handleError<any>('addCriteriaToProtocol'))
      );
  }

  // Delete criteria from a protocol
  deleteCriteria(protocolId: number, criteriaId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${protocolId}/criteria/${criteriaId}`)
      .pipe(
        tap(_ => console.log(`Deleted criteria id=${criteriaId} from protocol id=${protocolId}`)),
        catchError(this.handleError<any>('deleteCriteria'))
      );
  }

  // Get all criteria for a protocol
  getCriteriaByProtocolId(protocolId: number): Observable<{ standardCriteria: any[], specificCriteria: any[] }> {
    return this.http.get<{ standardCriteria: any[], specificCriteria: any[] }>(
      `${this.apiUrl}/${protocolId}/criteria`
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

  // Update standard criteria
  updateStandardCriteria(protocolId: number, criteriaId: number, criteriaData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${protocolId}/standard-criteria/${criteriaId}`, criteriaData)
      .pipe(
        tap(_ => console.log(`Updated standard criteria id=${criteriaId} for protocol id=${protocolId}`)),
        catchError(this.handleError<any>('updateStandardCriteria'))
      );
  }

  // Update specific criteria
  updateSpecificCriteria(protocolId: number, criteriaId: number, criteriaData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${protocolId}/specific-criteria/${criteriaId}`, criteriaData)
      .pipe(
        tap(_ => console.log(`Updated specific criteria id=${criteriaId} for protocol id=${protocolId}`)),
        catchError(this.handleError<any>('updateSpecificCriteria'))
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