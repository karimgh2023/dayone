import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '@/environments/environment';
import { Department } from '../../models/department.model';

@Injectable({
  providedIn: 'root'
})
export class DepartmentAdminService {
  private apiUrl = `${environment.apiUrl}/departments`;

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

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = error.error.message;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(() => new Error(errorMessage));
  }

  // Get all departments
  getDepartments(): Observable<Department[]> {
    return this.http.get<Department[]>(this.apiUrl, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  // Get a single department by ID
  getDepartment(id: number): Observable<Department> {
    return this.http.get<Department>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  // Create a new department
  createDepartment(department: Department): Observable<Department> {
    return this.http.post<Department>(this.apiUrl, department, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  // Update an existing department
  updateDepartment(id: number, department: Department): Observable<Department> {
    return this.http.put<Department>(`${this.apiUrl}/${id}`, department, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  // Delete a department
  deleteDepartment(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  // Add a new department (legacy method - consider using createDepartment instead)
  addDepartment(name: string): Observable<Department> {
    const department: Department = { id: 0, name };
    return this.createDepartment(department);
  }
}