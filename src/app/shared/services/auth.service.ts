import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { LoginRequest } from '../../models/login-request.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../../models/user.model';
import { Department } from '../../models/department.model';
import { Plant } from '../../models/plant.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  login(credentials: LoginRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/login`, credentials, {
      responseType: 'text' 
    });
  }

  register(userData: any): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/auth/register`, userData, {
      responseType: 'text' as 'json'
    });
  }
  
  
verifyEmailCode( code: string): Observable<any> {
  return this.http.post(`${this.apiUrl}/auth/verify?code=${code}`, {});
  // empty body but code is in URL
}

  

  saveAuthData(token: string, user: User): void {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getCurrentUser(): User | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
  getPlants(): Observable<Plant[]> {
    return this.http.get<Plant[]>(`${this.apiUrl}/plants`);
  }
  
  getDepartments(): Observable<Department[]> {
    return this.http.get<Department[]>(`${this.apiUrl}/departments`);
  }
  

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
}
