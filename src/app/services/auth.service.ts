import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { LoginRequest } from '../models/login-request.model';
import { AuthResponse } from '../models/auth-response.model';
import { User } from '../models/user.model';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl || 'http://localhost:8081/api';
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasValidToken());
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  private defaultProfilePhoto = 'https://res.cloudinary.com/dbgo6jzqe/image/upload/v1740737558/default_profile_idqbuv.png';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    // Check token validity when service is initialized
    this.isAuthenticatedSubject.next(this.hasValidToken());
  }

  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/login`, credentials)
      .pipe(
        tap(response => {
          localStorage.setItem('token', response.token);
          this.isAuthenticatedSubject.next(true);
          
          // Extract user info from token and save
          const userInfo = this.getUserFromToken();
          if (userInfo) {
            this.setUser(userInfo);
          }
        }),
        catchError(error => {
          console.error('Login error:', error);
          return throwError(() => new Error(error.error?.message || 'Login failed. Please try again.'));
        })
      );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  hasValidToken(): boolean {
    const token = this.getToken();
    if (!token) return false;
    
    try {
      // Check token expiration manually instead of using jwtHelper
      const decoded: any = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      return decoded.exp > currentTime;
    } catch (err) {
      return false;
    }
  }

  getUserFromToken(): any {
    const token = this.getToken();
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

  getUserRole(): string | null {
    const user = this.getUserFromToken();
    return user ? user.role : null;
  }

  getUserId(): number | null {
    const user = this.getUserFromToken();
    return user ? user.id : null;
  }

  getUserName(): string | null {
    const user = this.getUserFromToken();
    return user ? `${user.firstName} ${user.lastName}` : null;
  }

  isAdmin(): boolean {
    return this.getUserRole() === 'ADMIN';
  }

  isDepartmentManager(): boolean {
    return this.getUserRole() === 'DEPARTMENT_MANAGER';
  }

  isUser(): boolean {
    return this.getUserRole() === 'USER';
  }
  
  setUser(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  getCurrentUser(): User | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
}