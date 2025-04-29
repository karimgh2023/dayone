import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BaseApiService } from './base-api.service';
import { MaintenanceForm } from '../../models/maintenance-form.model';
import { MaintenanceFormDTO } from '../../models/maintenance-form-dto.model';

@Injectable({
  providedIn: 'root'
})
export class MaintenanceFormService extends BaseApiService {
  private reportsUrl = `${this.apiUrl}/reports`;
  
  constructor(private http: HttpClient) {
    super();
  }
  
  /**
   * Get maintenance form for a report
   * @param reportId ID of the report
   * @returns Observable of MaintenanceFormDTO
   */
  getMaintenanceForm(reportId: number): Observable<MaintenanceFormDTO> {
    return this.http.get<MaintenanceFormDTO>(`${this.reportsUrl}/${reportId}/maintenance-form`)
      .pipe(
        catchError(this.handleError<MaintenanceFormDTO>('getMaintenanceForm'))
      );
  }
  
  /**
   * Update a maintenance form
   * @param reportId ID of the report
   * @param formData Updated form data
   * @returns Observable of updated MaintenanceForm
   */
  updateMaintenanceForm(reportId: number, formData: Partial<MaintenanceForm>): Observable<MaintenanceForm> {
    return this.http.put<MaintenanceForm>(`${this.reportsUrl}/${reportId}/maintenance-form`, formData)
      .pipe(
        catchError(this.handleError<MaintenanceForm>('updateMaintenanceForm'))
      );
  }
  
  /**
   * Update maintenance form status
   * @param reportId ID of the report
   * @param key Status key to update ('maintenanceSystemUpdated' or 'sheUpdated')
   * @param value New status value
   * @returns Observable of updated MaintenanceForm
   */
  updateFormStatus(reportId: number, key: string, value: boolean): Observable<MaintenanceForm> {
    const updateData = { [key]: value };
    
    return this.http.patch<MaintenanceForm>(
      `${this.reportsUrl}/${reportId}/maintenance-form/status`, 
      updateData
    ).pipe(
      catchError(this.handleError<MaintenanceForm>('updateFormStatus'))
    );
  }
} 