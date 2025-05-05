import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Department } from '../../models/department.model';
import { Plant } from '../../models/plant.model';
import { environment } from '@/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = environment.apiUrl;

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
  // Plant operations
  getPlants(): Observable<Plant[]> {
    return this.http.get<Plant[]>(`${this.apiUrl}/public/plants`);
  }
}
