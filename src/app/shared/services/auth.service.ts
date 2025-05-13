import { Injectable } from '@angular/core';
import { environment } from '@/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';
import { Department } from '../../models/department.model';
import { Plant } from '../../models/plant.model';
import { jwtDecode } from 'jwt-decode';
import { PasswordUpdateRequest } from '../../models/PasswordUpdateRequest.model'; 
import { NotificationWebSocketService } from './notification-websocket.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasValidToken());
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  private defaultProfilePhoto = 'https://res.cloudinary.com/dbgo6jzqe/image/upload/v1740737558/default_profile_idqbuv.png';

  constructor(
    private http: HttpClient,
    private router: Router,
    private notificationService: NotificationWebSocketService
  ) {
    this.validateStoredToken();
    this.isAuthenticatedSubject.next(this.hasValidToken());
  }

  // Token Validation and Management
  validateStoredToken(): void {
    const token = this.getToken();
    if (token) {
      try {
        if (typeof token !== 'string' || !token.trim()) {
          console.warn('[Auth Service] Empty token detected, clearing auth data');
          this.clearAuthData();
          return;
        }
        const decoded = JSON.parse(atob(token.split('.')[1]));
        console.log('[Auth Service] Token validated successfully');
      } catch (error) {
        console.warn('[Auth Service] Invalid token format detected, clearing auth data');
        this.clearAuthData();
      }
    }
  }

  clearAuthData(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('rememberMe');
    localStorage.removeItem('savedEmail');
    localStorage.removeItem('savedPassword');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    this.isAuthenticatedSubject.next(false);
  }

  // Authentication Methods
  register(userData: any): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/auth/register`, userData, {
      responseType: 'text' as 'json'
    });
  }

  verifyEmailCode(code: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/verify?code=${code}`, {});
  }

  login(credentials: { email: string; password: string }): Observable<string> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/auth/login`, credentials).pipe(
      map((res: any) => res.token)
    );
  }

  saveAuthData(token: string, user: User, rememberMe: boolean = false): void {
    // Always store token and user in localStorage for authentication
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    // Only store credentials if rememberMe is true
    if (rememberMe) {
      localStorage.setItem('rememberMe', 'true');
    } else {
      localStorage.removeItem('rememberMe');
      localStorage.removeItem('savedEmail');
      localStorage.removeItem('savedPassword');
    }
    this.isAuthenticatedSubject.next(true);
    // Initialize notifications after successful login
    this.notificationService.initializeNotifications();
  }

  // Token and User Management
  getToken(): string | null {
    const rememberMe = localStorage.getItem('rememberMe') === 'true';
    return rememberMe ? localStorage.getItem('token') : sessionStorage.getItem('token');
  }

  hasValidToken(): boolean {
    const token = this.getToken();
    if (!token) return false;

    try {
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

      if (user && !user.profilePhoto) {
        user.profilePhoto = this.defaultProfilePhoto;
      }

      return user;
    } catch (error) {
      console.error('Invalid token:', error);
      return null;
    }
  }

  getCurrentUser(): User | null {
    const rememberMe = localStorage.getItem('rememberMe') === 'true';
    const user = rememberMe ? localStorage.getItem('user') : sessionStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  // Role and Permission Methods
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

  // Additional Data Methods
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
  updatePassword(request: PasswordUpdateRequest) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<{ message: string }>(
      `${this.apiUrl}/auth/update-password`,
      request,
      { headers }
    );
  }

  logout(): void {
    this.clearAuthData();
    this.router.navigate(['/auth/login']);
  }
}
