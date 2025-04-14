import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginRequest } from '../models/login-request.model';
import { AuthResponse } from '../models/auth-response.model';
import { User } from '../models/user.model';
import { tap } from 'rxjs/operators';

interface LoginResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8081/api/'; // your backend API base

  constructor(private http: HttpClient) {}

  onLogin(login: LoginRequest): Observable<any> {
    return this.http.post<LoginResponse>('http://localhost:8081/api/auth/login', login, { observe: 'response' })
      .pipe(
        tap(response => {
          console.log('Login response:', response);
          if (response.body && response.body.token) {
            this.validateAndStoreToken(response.body.token);
          }
        })
      );
  }

  register(userData: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/register`, userData);
  }

  saveAuthData(token: string, user: User) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  }

  // New method to validate and store token
  validateAndStoreToken(token: string): void {
    try {
      // Basic validation
      const parts = token.split('.');
      if (parts.length !== 3) {
        console.error('Invalid JWT token format - does not have three parts');
        return;
      }
      
      // Try to decode token payload
      const payload = JSON.parse(atob(parts[1]));
      console.log('Token payload:', payload);
      
      // Check for required fields
      if (!payload.sub && !payload.user) {
        console.error('Invalid JWT token - missing required fields');
        return;
      }
      
      // Store token if valid
      localStorage.setItem('token', token);
      
      // If the token contains user info, store that too
      if (payload.user) {
        localStorage.setItem('user', JSON.stringify(payload.user));
      }
      
      console.log('JWT token stored successfully');
    } catch (e) {
      console.error('Error validating JWT token:', e);
    }
  }

  // New method to decode and check token
  decodeToken(): any {
    const token = this.getToken();
    if (!token) return null;
    
    try {
      const parts = token.split('.');
      if (parts.length !== 3) return null;
      
      const payload = JSON.parse(atob(parts[1]));
      return payload;
    } catch (e) {
      console.error('Error decoding JWT token:', e);
      return null;
    }
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getCurrentUser(): User | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
  
  // Check if user is authenticated
  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) return false;
    
    try {
      const decoded = this.decodeToken();
      if (!decoded) return false;
      
      // Check if token is expired
      const expiryTime = decoded.exp * 1000; // Convert to milliseconds
      if (Date.now() >= expiryTime) {
        console.log('Token expired');
        this.logout();
        return false;
      }
      
      return true;
    } catch (e) {
      console.error('Error checking authentication:', e);
      return false;
    }
  }
}