// services/protocol.service.ts
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProtocolCreationRequest } from '../../models/protocol-creation-request.model';
import { environment } from '@/environments/environment';

@Injectable({ providedIn: 'root' })
export class ProtocolService {

   // Adjust if needed
    private apiUrl = `${environment.apiUrl}/protocols`;

  constructor(private http: HttpClient) {}

  getAllProtocolsGroupedByType() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<{ [key: string]: any[] }>(`${this.apiUrl}/grouped`, { headers });
  }

  createProtocol(data: ProtocolCreationRequest): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post(`${this.apiUrl}/create`, data, { headers });
  }

}
