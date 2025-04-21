import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MaintenanceFormDTO } from '../models/maintenance-form-dto.model';
import { MaintenanceForm } from '../models/maintenance-form.model';
import { SpecificChecklistItemDTO } from '../models/SpecificChecklistItemDTO.model';
import { SpecificReportEntryDTO } from '../models/specificReportEntryDTO.model';
import { StandardChecklistItemDTO } from '../models/StandardChecklistItemDTO.model';
import { StandardReportEntryDTO } from '../models/standardReportEntryDTO.model';





@Injectable({
  providedIn: 'root'
})
export class ReportEntryService {
  private apiUrl = `http://localhost:8081/api/rapports`;

  constructor(private http: HttpClient) {}

  // ✅ Get standard checklist
  getStandardChecklist(reportId: number): Observable<StandardChecklistItemDTO[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<StandardChecklistItemDTO[]>(`${this.apiUrl}/standard-checklist/${reportId}`, { headers } )
  }

  // ✅ Get specific checklist
  getSpecificChecklist(reportId: number): Observable<SpecificChecklistItemDTO[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<SpecificChecklistItemDTO[]>(`${this.apiUrl}/specific-checklist/${reportId}`, { headers } );
      headers

  }

  // ✅ Update standard checklist entry
  updateMultipleStandardEntries(entries: StandardReportEntryDTO[]): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put(`${this.apiUrl}/entry/standard/batch-update`, entries, {
      headers,
      responseType: 'json'  // make sure Angular expects a JSON response
    });
  }



  // ✅ Update specific checklist entry
  updateMultipleSpecificEntries(entries: SpecificReportEntryDTO[]): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put(`${this.apiUrl}/entry/specific/batch-update`, entries, {
      headers,
      responseType: 'json'  // Ensure Angular expects a JSON response
    });
  }


  // ✅ Get full maintenance form DTO with editability flags
  getMaintenanceForm(reportId: number): Observable<MaintenanceFormDTO> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<MaintenanceFormDTO>(`${this.apiUrl}/maintenance-form/${reportId}`, { headers } );

  }

  // ✅ Update maintenance form
  updateMaintenanceForm(reportId: number, form: MaintenanceForm): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put(`${this.apiUrl}/maintenance-form/update/${reportId}`, form, { headers } );
  }
}
