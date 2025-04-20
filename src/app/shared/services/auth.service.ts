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

  

  saveAuthData(token: string, user: User, rememberMe: boolean = false): void {
    console.log('Saving auth data with rememberMe:', rememberMe);
    if (rememberMe) {
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('rememberMe', 'true');
      console.log('Data saved to localStorage');
    } else {
      sessionStorage.setItem('token', token);
      sessionStorage.setItem('user', JSON.stringify(user));
      localStorage.removeItem('rememberMe');
      console.log('Data saved to sessionStorage');
    }
  }

  getToken(): string | null {
    const rememberMe = localStorage.getItem('rememberMe') === 'true';
    console.log('Getting token, rememberMe:', rememberMe);
    return rememberMe ? localStorage.getItem('token') : sessionStorage.getItem('token');
  }

  getCurrentUser(): User | null {
    const rememberMe = localStorage.getItem('rememberMe') === 'true';
    console.log('Getting user, rememberMe:', rememberMe);
    const user = rememberMe ? localStorage.getItem('user') : sessionStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
  getPlants(): Observable<Plant[]> {
    return this.http.get<Plant[]>(`${this.apiUrl}/plants`);
  }
  
  getDepartments(): Observable<Department[]> {
    return this.http.get<Department[]>(`${this.apiUrl}/departments`);
  }
  

  getSavedCredentials(): { email: string, password: string } | null {
    const rememberMe = localStorage.getItem('rememberMe') === 'true';
    if (rememberMe) {
      const email = localStorage.getItem('savedEmail');
      const password = localStorage.getItem('savedPassword');
      if (email && password) {
        return { email, password };
      }
    }
    return null;
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('rememberMe');
    localStorage.removeItem('savedEmail');
    localStorage.removeItem('savedPassword');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
  }
}
