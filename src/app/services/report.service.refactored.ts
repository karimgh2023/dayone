import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { BaseApiService } from './base-api.service';
import { Report, ReportCreationRequest } from '../models/report.model';

/**
 * Service for managing reports
 * This is a refactored version of the original ReportService
 * that focuses only on core report operations
 */
@Injectable({
  providedIn: 'root'
})
export class ReportService extends BaseApiService {
  private reportsUrl = `${this.apiUrl}/reports`;
  
  constructor(private http: HttpClient) {
    super();
  }
  
  /**
   * Get all reports
   * @returns Observable of Report array
   */
  getAllReports(): Observable<Report[]> {
    return this.http.get<Report[]>(this.reportsUrl)
      .pipe(
        catchError(this.handleError<Report[]>('getAllReports', []))
      );
  }
  
  /**
   * Get a specific report by ID
   * @param id Report ID
   * @returns Observable of a single Report
   */
  getReportById(id: number): Observable<Report> {
    return this.http.get<Report>(`${this.reportsUrl}/${id}`)
      .pipe(
        catchError(this.handleError<Report>('getReportById'))
      );
  }
  
  /**
   * Create a new report
   * @param reportData Report creation data
   * @returns Observable of the created Report
   */
  createReport(reportData: ReportCreationRequest): Observable<Report> {
    return this.http.post<Report>(this.reportsUrl, reportData)
      .pipe(
        catchError(this.handleError<Report>('createReport'))
      );
  }
  
  /**
   * Update an existing report
   * @param id Report ID
   * @param reportData Partial report data to update
   * @returns Observable of the updated Report
   */
  updateReport(id: number, reportData: Partial<Report>): Observable<Report> {
    return this.http.put<Report>(`${this.reportsUrl}/${id}`, reportData)
      .pipe(
        catchError(this.handleError<Report>('updateReport'))
      );
  }
  
  /**
   * Delete a report
   * @param id Report ID
   * @returns Observable of void
   */
  deleteReport(id: number): Observable<void> {
    return this.http.delete<void>(`${this.reportsUrl}/${id}`)
      .pipe(
        catchError(this.handleError<void>('deleteReport'))
      );
  }
  
  /**
   * Get reports assigned to a specific user
   * @param userId User ID
   * @returns Observable of Report array
   */
  getReportsByUserId(userId: number): Observable<Report[]> {
    return this.http.get<Report[]>(`${this.apiUrl}/users/${userId}/reports`)
      .pipe(
        catchError(this.handleError<Report[]>('getReportsByUserId', []))
      );
  }
  
  /**
   * Get reports for a specific protocol
   * @param protocolId Protocol ID
   * @returns Observable of Report array
   */
  getReportsByProtocolId(protocolId: number): Observable<Report[]> {
    return this.http.get<Report[]>(`${this.apiUrl}/protocols/${protocolId}/reports`)
      .pipe(
        catchError(this.handleError<Report[]>('getReportsByProtocolId', []))
      );
  }
  
  /**
   * Mark a report as completed
   * @param reportId Report ID
   * @returns Observable of the updated Report
   */
  markReportAsCompleted(reportId: number): Observable<Report> {
    return this.http.patch<Report>(`${this.reportsUrl}/${reportId}/complete`, {})
      .pipe(
        catchError(this.handleError<Report>('markReportAsCompleted'))
      );
  }
  
  /**
   * Update report status
   * @param reportId Report ID
   * @param status New status
   * @returns Observable of the updated Report
   */
  updateReportStatus(reportId: number, status: string): Observable<Report> {
    return this.http.patch<Report>(`${this.reportsUrl}/${reportId}/status`, { status })
      .pipe(
        catchError(this.handleError<Report>('updateReportStatus'))
      );
  }
} 