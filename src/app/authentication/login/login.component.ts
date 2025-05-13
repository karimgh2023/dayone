import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, RouterModule } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { AuthService } from '../../shared/services/auth.service';
import { AppStateService } from '../../shared/services/app-state.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { jwtDecode } from 'jwt-decode';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterModule,
    NgbModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule
  ],
  providers: [
    { provide: ToastrService, useClass: ToastrService }
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {
  public showPassword: boolean = false;
  toggleClass = 'eye-off';
  active = "Leoni";
  public loginForm!: FormGroup;
  public errorMessage = '';
  public _error: any = '';

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private elementRef: ElementRef,
    private sanitizer: DomSanitizer,
    public authservice: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private renderer: Renderer2,
    private toastr: ToastrService,
    private appStateService: AppStateService,
  ) {
    document.body.classList.add('error-1');
    this.initLoginForm();
  }

  private initLoginForm(): void {
    console.log('[Login] Initializing login form...');
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      rememberMe: [false]
    });

    // Load saved credentials if they exist
    const savedCredentials = this.authservice.getSavedCredentials();
    console.log('[Login] Saved credentials:', savedCredentials);
    
    if (savedCredentials) {
      console.log('[Login] Found saved credentials, populating form...');
      this.loginForm.patchValue({
        email: savedCredentials.email,
        password: savedCredentials.password,
        rememberMe: true
      });
      console.log('[Login] Form values after population:', this.loginForm.value);
    }
  }

  ngOnDestroy(): void {
    document.body.classList.remove('error-1');
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
    this.toggleClass = this.toggleClass === 'eye' ? 'eye-off' : 'eye';
  }

  clearErrorMessage(): void {
    this.errorMessage = '';
    this._error = { name: '', message: '' };
  }

  login(): void {
    this.clearErrorMessage();

    if (!this.loginForm.valid) {
      this.errorMessage = 'Please fill in all required fields';
      return;
    }

    const credentials = this.loginForm.value;
    const rememberMe = this.loginForm.get('rememberMe')?.value;
    console.log('[Login] Attempting login with credentials:', { 
      email: credentials.email, 
      rememberMe: rememberMe 
    });

    this.authservice.login(credentials).subscribe({
      next: (token: string) => {
        try {
          if (typeof token !== 'string' || !token.trim()) {
            throw new Error('Invalid token');
          }

          const decoded = jwtDecode<any>(token);
          console.log('[Login] Token decoded successfully:', decoded);

          const user: User = {
            id: decoded.userId || 0,
            email: decoded.email || '',
            firstName: decoded.firstName || '',
            lastName: decoded.lastName || '',
            phoneNumber: decoded.phoneNumber || '',
            role: decoded.role || '',
            department: decoded.department,
            plant: decoded.plant,
            loggedIn: decoded.loggedIn,
            profilePhoto: decoded.profilePhoto || ''
          };

          console.log('[Login] Remember me status:', rememberMe);
          
          // Handle remember me credentials
          if (rememberMe) {
            console.log('[Login] Setting remember me flag...');
            localStorage.setItem('rememberMe', 'true');
            console.log('[Login] Saving credentials to localStorage...');
            localStorage.setItem('savedEmail', credentials.email);
            localStorage.setItem('savedPassword', credentials.password);
          } else {
            // Only clear credentials if remember me was unchecked
            const wasRemembered = localStorage.getItem('rememberMe') === 'true';
            if (wasRemembered) {
              console.log('[Login] Remember me was previously enabled, clearing credentials...');
              localStorage.removeItem('rememberMe');
              localStorage.removeItem('savedEmail');
              localStorage.removeItem('savedPassword');
            } else {
              console.log('[Login] Remember me was not previously enabled, no need to clear credentials');
            }
          }

          // Save auth data
          this.authservice.saveAuthData(token, user, rememberMe);
          console.log('[Login] Auth data saved successfully');

          // Ensure user name is displayed properly in toast
          const fullName = `${user.firstName || ''} ${user.lastName || ''}`.trim();
          const welcomeMessage = fullName ? `Bienvenue, ${fullName}` : 'Bienvenue';
          
          this.toastr.success(welcomeMessage, 'Connexion réussie');
          this.router.navigate(['/dashboard/report-dashboard/view-reports']); 
               } catch (error) {
          console.error('[Login] Error processing token:', error);
          this.toastr.error('Token error', 'Login Failed');
          this.authservice.clearAuthData();
        }
      },
      error: (err) => {
        console.error('[Login] Login failed:', err);
        this.toastr.error('Invalid credentials', 'Login Failed');
        this.authservice.clearAuthData();
      }
    });
  }
}
