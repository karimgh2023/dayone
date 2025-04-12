import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { jwtDecode } from 'jwt-decode';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-test-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="container mt-5">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="card">
            <div class="card-header">
              <h4>Test Login</h4>
            </div>
            <div class="card-body">
              <div *ngIf="errorMessage" class="alert alert-danger">
                {{ errorMessage }}
              </div>
              <div *ngIf="successMessage" class="alert alert-success">
                {{ successMessage }}
              </div>
              
              <form (ngSubmit)="login()">
                <div class="mb-3">
                  <label for="email" class="form-label">Email</label>
                  <input 
                    type="email" 
                    class="form-control" 
                    id="email" 
                    [(ngModel)]="credentials.email" 
                    name="email" 
                    required
                  >
                </div>
                <div class="mb-3">
                  <label for="password" class="form-label">Password</label>
                  <input 
                    type="password" 
                    class="form-control" 
                    id="password" 
                    [(ngModel)]="credentials.password" 
                    name="password" 
                    required
                  >
                </div>
                <div class="mb-3 form-check">
                  <input 
                    type="checkbox" 
                    class="form-check-input" 
                    id="rememberMe" 
                    [(ngModel)]="rememberMe" 
                    name="rememberMe"
                  >
                  <label class="form-check-label" for="rememberMe">Remember me</label>
                </div>
                <button type="submit" class="btn btn-primary">Login</button>
              </form>
              
              <hr />
              
              <div class="mt-3">
                <button (click)="checkAuthStatus()" class="btn btn-info">
                  Check Authentication Status
                </button>
                
                <div *ngIf="authStatus" class="mt-3">
                  <div class="card">
                    <div class="card-header bg-info text-white">
                      Authentication Status
                    </div>
                    <div class="card-body">
                      <pre class="mb-0">{{ authStatus | json }}</pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class TestLoginComponent {
  credentials = {
    email: '',
    password: ''
  };
  rememberMe = false;
  errorMessage = '';
  successMessage = '';
  authStatus: any;

  constructor(private authService: AuthService) {}

  login() {
    this.errorMessage = '';
    this.successMessage = '';
    
    console.log('Attempting login with:', this.credentials);
    
    this.authService.login(this.credentials).subscribe({
      next: (token: string) => {
        try {
          const decoded = jwtDecode<any>(token);
          console.log('Decoded token:', decoded);
          
          const user: User = {
            firstName: decoded.user.firstName,
            lastName: decoded.user.lastName,
            email: decoded.user.email,
            department: decoded.user.department,
            role: decoded.user.role,
            phoneNumber: Number(decoded.user.phone),
            id: decoded.user.id
          };
          
          this.authService.saveAuthData(token, user, this.rememberMe);
          this.successMessage = `Login successful. Welcome, ${user.firstName} ${user.lastName}!`;
          console.log('Login successful, token saved.');
        } catch (error) {
          console.error('Error decoding token:', error);
          this.errorMessage = 'Error processing login response';
        }
      },
      error: (error) => {
        console.error('Login error:', error);
        this.errorMessage = 'Login failed. Please check your credentials.';
      }
    });
  }

  checkAuthStatus() {
    const token = this.authService.getToken();
    const user = this.authService.getCurrentUser();
    
    this.authStatus = {
      isAuthenticated: !!token,
      token: token ? `${token.substring(0, 20)}...` : null,
      user: user,
      tokenExpiry: token ? this.getTokenExpiry(token) : null
    };
  }

  getTokenExpiry(token: string): any {
    try {
      const decoded = jwtDecode<any>(token);
      return {
        exp: decoded.exp,
        expiryDate: new Date(decoded.exp * 1000).toLocaleString(),
        isExpired: decoded.exp * 1000 < Date.now()
      };
    } catch (error) {
      console.error('Error decoding token expiry:', error);
      return 'Invalid token or no expiry';
    }
  }
} 