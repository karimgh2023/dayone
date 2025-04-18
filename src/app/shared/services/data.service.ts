import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Department } from '../../models/department.model';
import { Plant } from '../../models/plant.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'http://localhost:8081/api';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    
    return headers;
  }

  // Department methods
  getDepartments(): Observable<Department[]> {
    // No need for authentication for public endpoints
    return this.http.get<Department[]>(`${this.apiUrl}/public/departments`);
  }

  getDepartment(id: number): Observable<Department> {
    // No need for authentication for public endpoints
    return this.http.get<Department>(`${this.apiUrl}/public/departments/${id}`);
  }

  createDepartment(department: Department): Observable<Department> {
    // Only add the Content-Type header without authentication
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<Department>(`${this.apiUrl}/public/departments`, department, { headers });
  }

  updateDepartment(department: Department): Observable<Department> {
    // Only add the Content-Type header without authentication
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.put<Department>(`${this.apiUrl}/public/departments/${department.id}`, department, { headers });
  }

  deleteDepartment(id: number): Observable<void> {
    // Only add the Content-Type header without authentication
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.delete<void>(`${this.apiUrl}/public/departments/${id}`, { headers });
  }

  // Plant operations
  getPlants(): Observable<Plant[]> {
    return this.http.get<Plant[]>(`${this.apiUrl}/public/plants`);
  }
}
