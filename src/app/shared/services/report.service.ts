import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@/environments/environment';
import { ReportDTO } from '../../models/reportDTO.model';
import { AssignedUserDTO } from '@/app/models/assignedUserDTO.model';
import { ImmobilizationUpdateDTO } from '@/app/models/ImmobilizationUpdateDTO.model';
import { ReportMetadataDTO } from '@/app/models/ReportMetadataDTO.model';
import { ReportCreateRequest } from '@/app/models/ReportCreateRequest.model';

@Injectable({ providedIn: 'root' })
export class ReportService {
    private apiUrl = `${environment.apiUrl}/rapports`;

  constructor(private http: HttpClient) {}

 
  createNewReport(req: ReportCreateRequest) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<{ message: string; reportId: number }>(
      `${this.apiUrl}/create`,
      req,
      { headers }
    );
  }

  getRequiredUsers(protocolId: number): Observable<AssignedUserDTO[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<AssignedUserDTO[]>(`${this.apiUrl}/required-users/${protocolId}`, { headers });
  }

  updateImmobilization(reportId: number, dto: ImmobilizationUpdateDTO) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<{ message: string }>(`${this.apiUrl}/rapports/update-immobilization/${reportId}`, dto, { headers });
  }
  
  getReportsAssignedToMe() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<ReportDTO[]>(`${this.apiUrl}/assigned`, { headers });
  }
  getReportsCreatedByMe() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<ReportDTO[]>(`${this.apiUrl}/my-created`, { headers });
  }

  getReportMetadata(reportId: number): Observable<ReportMetadataDTO> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<ReportMetadataDTO>(`${this.apiUrl}/metadata/${reportId}`, { headers });
  }


}

