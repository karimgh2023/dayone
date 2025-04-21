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

  constructor(private http: HttpClient) {
    // Validate token on service initialization
    this.validateStoredToken();
  }

  // Add method to validate token format
  validateStoredToken(): void {
    const token = this.getToken();
    if (token) {
      try {
        // Just check if it's a string with some content
        if (typeof token !== 'string' || !token.trim()) {
          console.warn('[Auth Service] Empty token detected, clearing auth data');
          this.clearAuthData();
          return;
        }
        
        // Try to decode the token with jwt-decode
        // If it fails, it will throw an error which we'll catch
        const decoded = JSON.parse(atob(token.split('.')[1]));
        
        // If we get here, token is at least decodable
        console.log('[Auth Service] Token validated successfully');
      } catch (error) {
        console.warn('[Auth Service] Invalid token format detected, clearing auth data');
        this.clearAuthData();
      }
    }
  }

  // Add method to clear all auth data from both storages
  clearAuthData(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
  }

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
    this.clearAuthData();
    localStorage.removeItem('rememberMe');
    localStorage.removeItem('savedEmail');
    localStorage.removeItem('savedPassword');
  }
}
