import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, throwError } from 'rxjs';
import { environment } from '@/environments/environment';
import { ReportRequest } from '../../models/reportRequest.model';
import { ReportDTO } from '../../models/reportDTO.model';

@Injectable({ providedIn: 'root' })
export class ReportService {
    private apiUrl = `${environment.apiUrl}/rapports`;

  constructor(private http: HttpClient) {}

  createReport(req: ReportRequest) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.apiUrl}/create`, req, { headers });
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


}

