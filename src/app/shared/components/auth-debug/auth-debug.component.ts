import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { catchError, of } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-auth-debug',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="auth-debug-container p-4">
      <h2 class="mb-4">Authentication Debugging Tool</h2>
      
      <div class="card mb-4">
        <div class="card-header bg-primary text-white">
          <h5 class="mb-0">Authentication Status</h5>
        </div>
        <div class="card-body">
          <div class="mb-3">
            <strong>Authenticated:</strong> {{ isAuthenticated ? '✅ Yes' : '❌ No' }}
          </div>
          <div *ngIf="isAuthenticated">
            <div class="mb-2"><strong>User:</strong> {{ userData?.email || decodedToken?.sub }}</div>
            <div class="mb-2"><strong>Role:</strong> {{ userData?.role || decodedToken?.role }}</div>
            <div class="mb-2"><strong>Token Expires:</strong> {{ tokenExpiryDate }}</div>
          </div>
          <button class="btn btn-outline-danger mt-3" (click)="logout()" *ngIf="isAuthenticated">Logout</button>
          <a class="btn btn-outline-primary mt-3 ms-2" routerLink="/auth/login" *ngIf="!isAuthenticated">Login</a>
        </div>
      </div>
      
      <div class="card mb-4">
        <div class="card-header bg-info text-white">
          <h5 class="mb-0">API Endpoints Test</h5>
        </div>
        <div class="card-body">
          <div class="mb-3">
            <button class="btn btn-sm btn-primary me-2" (click)="testProtocolsEndpoint()">Test Protocols API</button>
            <button class="btn btn-sm btn-warning me-2" (click)="testReportsEndpoint()">Test Reports API</button>
            <button class="btn btn-sm btn-info" (click)="testAdminEndpoint()">Test Admin API</button>
          </div>
          <div *ngIf="endpointResults.length > 0">
            <h6 class="mt-3">Results:</h6>
            <div *ngFor="let result of endpointResults" 
                 class="alert" 
                 [ngClass]="{'alert-success': result.status === 200, 'alert-danger': result.status !== 200}">
              <strong>{{ result.endpoint }}:</strong> 
              Status {{ result.status }} - {{ result.message }}
            </div>
          </div>
        </div>
      </div>
      
      <div class="card" *ngIf="isAuthenticated">
        <div class="card-header bg-secondary text-white">
          <h5 class="mb-0">JWT Token Decoder</h5>
        </div>
        <div class="card-body">
          <div class="mb-3">
            <strong>Token:</strong>
            <div class="token-display">
              {{ token ? (token.length > 40 ? token.substring(0, 40) + '...' : token) : 'No token found' }}
            </div>
          </div>
          <div *ngIf="decodedToken">
            <h6>Decoded Token Payload:</h6>
            <pre class="token-payload">{{ decodedToken | json }}</pre>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .auth-debug-container {
      max-width: 800px;
      margin: 0 auto;
    }
    .token-display {
      font-family: monospace;
      word-break: break-all;
      padding: 8px;
      background-color: #f8f9fa;
      border: 1px solid #ced4da;
      border-radius: 4px;
      margin-top: 8px;
    }
    .token-payload {
      background-color: #f8f9fa;
      padding: 10px;
      border-radius: 4px;
      max-height: 300px;
      overflow: auto;
    }
  `]
})
export class AuthDebugComponent implements OnInit {
  isAuthenticated = false;
  token: string | null = null;
  decodedToken: any = null;
  userData: any = null;
  tokenExpiryDate: string = '';
  endpointResults: Array<{endpoint: string, status: number, message: string}> = [];

  constructor(
    private authService: AuthService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.checkAuthStatus();
  }

  checkAuthStatus(): void {
    this.isAuthenticated = this.authService.isAuthenticated();
    this.token = this.authService.getToken();
    this.userData = this.authService.getCurrentUser();
    
    if (this.token) {
      this.decodedToken = this.decodeToken(this.token);
      
      if (this.decodedToken && this.decodedToken.exp) {
        const expiryDate = new Date(this.decodedToken.exp * 1000);
        this.tokenExpiryDate = expiryDate.toLocaleString();
      }
    }
  }

  decodeToken(token: string): any {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      
      return JSON.parse(jsonPayload);
    } catch (e) {
      console.error('Error decoding token:', e);
      return null;
    }
  }

  logout(): void {
    this.authService.logout();
    this.checkAuthStatus();
  }

  testProtocolsEndpoint(): void {
    this.http.get(`${environment.apiUrl}/protocols`)
      .pipe(
        catchError(error => {
          this.endpointResults.unshift({
            endpoint: 'Protocols API',
            status: error.status,
            message: error.message || 'Failed to access endpoint'
          });
          return of(null);
        })
      )
      .subscribe(response => {
        if (response) {
          this.endpointResults.unshift({
            endpoint: 'Protocols API',
            status: 200,
            message: 'Access successful'
          });
        }
      });
  }

  testReportsEndpoint(): void {
    this.http.get(`${environment.apiUrl}/rapports`)
      .pipe(
        catchError(error => {
          this.endpointResults.unshift({
            endpoint: 'Reports API',
            status: error.status,
            message: error.message || 'Failed to access endpoint'
          });
          return of(null);
        })
      )
      .subscribe(response => {
        if (response) {
          this.endpointResults.unshift({
            endpoint: 'Reports API',
            status: 200,
            message: 'Access successful'
          });
        }
      });
  }

  testAdminEndpoint(): void {
    this.http.get(`${environment.apiUrl}/admin/users`)
      .pipe(
        catchError(error => {
          this.endpointResults.unshift({
            endpoint: 'Admin API',
            status: error.status,
            message: error.message || 'Failed to access endpoint'
          });
          return of(null);
        })
      )
      .subscribe(response => {
        if (response) {
          this.endpointResults.unshift({
            endpoint: 'Admin API',
            status: 200,
            message: 'Access successful'
          });
        }
      });
  }
} 