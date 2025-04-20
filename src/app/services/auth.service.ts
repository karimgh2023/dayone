import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginRequest } from '../models/login-request.model';
import { AuthResponse } from '../models/auth-response.model';
import { User } from '../models/user.model';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}`;
  private defaultProfilePhoto = 'https://res.cloudinary.com/dbgo6jzqe/image/upload/v1740737558/default_profile_idqbuv.png';

  constructor(private http: HttpClient) {}

  onLogin(login: LoginRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/login`, login, { observe: 'response' });
  }

  register(userData: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/register`, userData);
  }

  saveAuthData(token: string, user: User) {
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

  getUserFromToken(): any {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
      const decoded: any = jwtDecode(token);
      const user = decoded?.user || decoded;
      
      // If profilePhoto is undefined or null, set default value
      if (user && !user.profilePhoto) {
        user.profilePhoto = this.defaultProfilePhoto;
      }
      
      return user;
    } catch (error) {
      console.error('Invalid token:', error);
      return null;
    }
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/login`, credentials);
  }

  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  saveUser(user: any): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}