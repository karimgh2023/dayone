import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { 
  StandardReportEntry, 
  SpecificReportEntry,
  StandardReportEntryUpdateRequest,
  SpecificReportEntryUpdateRequest
} from '../models/report.model';
import { BaseApiService } from './base-api.service';

@Injectable({
  providedIn: 'root'
})
export class ReportEntryService extends BaseApiService {
  // Override the endpoint for report entries
  private reportsUrl = `${this.apiUrl}/reports`;
  
  constructor(private http: HttpClient) {
    super();
  }
  
  /**
   * Get standard entries for a report
   * @param reportId ID of the report
   * @returns Observable of StandardReportEntry array
   */
  getStandardEntries(reportId: number): Observable<StandardReportEntry[]> {
    return this.http.get<StandardReportEntry[]>(`${this.reportsUrl}/${reportId}/standard-entries`)
      .pipe(
        catchError(this.handleError<StandardReportEntry[]>('getStandardEntries', []))
      );
  }
  
  /**
   * Get specific entries for a report
   * @param reportId ID of the report
   * @returns Observable of SpecificReportEntry array
   */
  getSpecificEntries(reportId: number): Observable<SpecificReportEntry[]> {
    return this.http.get<SpecificReportEntry[]>(`${this.reportsUrl}/${reportId}/specific-entries`)
      .pipe(
        catchError(this.handleError<SpecificReportEntry[]>('getSpecificEntries', []))
      );
  }
  
  /**
   * Update a standard report entry
   * @param reportId ID of the report
   * @param entryId ID of the entry to update
   * @param data Update data
   * @returns Observable of updated StandardReportEntry
   */
  updateStandardEntry(
    reportId: number, 
    entryId: number, 
    data: StandardReportEntryUpdateRequest
  ): Observable<StandardReportEntry> {
    return this.http.put<StandardReportEntry>(
      `${this.reportsUrl}/${reportId}/standard-entries/${entryId}`, 
      data
    ).pipe(
      catchError(this.handleError<StandardReportEntry>('updateStandardEntry'))
    );
  }
  
  /**
   * Update a specific report entry
   * @param reportId ID of the report
   * @param entryId ID of the entry to update
   * @param data Update data
   * @returns Observable of updated SpecificReportEntry
   */
  updateSpecificEntry(
    reportId: number, 
    entryId: number, 
    data: SpecificReportEntryUpdateRequest
  ): Observable<SpecificReportEntry> {
    return this.http.put<SpecificReportEntry>(
      `${this.reportsUrl}/${reportId}/specific-entries/${entryId}`, 
      data
    ).pipe(
      catchError(this.handleError<SpecificReportEntry>('updateSpecificEntry'))
    );
  }
  
  /**
   * Update entry status (standard or specific)
   * @param reportId ID of the report
   * @param entryId ID of the entry to update
   * @param isStandard Whether the entry is standard or specific
   * @param status New status
   * @returns Observable of the updated entry
   */
  updateEntryStatus(
    reportId: number,
    entryId: number,
    isStandard: boolean,
    status: string
  ): Observable<any> {
    const entryType = isStandard ? 'standard' : 'specific';
    const url = `${this.reportsUrl}/${reportId}/${entryType}-entries/${entryId}/status`;
    
    return this.http.patch(url, { status })
      .pipe(
        catchError(this.handleError('updateEntryStatus'))
      );
  }
} 