import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { BaseApiService } from './base-api.service';
import { environment } from '../../../environments/environment';
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

  getAllProtocolsGroupedByType() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<{ [key: string]: any[] }>(`${this.protocolsUrl}/grouped`, { headers });
  }

  createProtocol(data: ProtocolCreationRequest): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.protocolsUrl}/create`, data, { headers });
  }
}
