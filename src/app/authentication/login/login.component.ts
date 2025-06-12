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

  ngOnDestroy(): void {
    document.body.classList.remove('error-1');
  }

  private initLoginForm(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      rememberMe: [false]
    });

    const savedCredentials = this.authservice.getSavedCredentials();
    if (savedCredentials) {
      this.loginForm.patchValue({
        email: savedCredentials.email,
        password: savedCredentials.password,
        rememberMe: true
      });
    }
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
    const rememberMe = credentials.rememberMe;

    this.authservice.login(credentials).subscribe({
      next: (token: string) => {
        try {
          if (!token || typeof token !== 'string') throw new Error('Invalid token');

          const decoded = jwtDecode<any>(token);
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
            profilePhoto: decoded.profilePhoto || '',
            isVerified: decoded.isVerified || false
          };

          if (!user.isVerified) {
            this.authservice.resendVerificationEmail(user.email).subscribe({
              next: () => {
                this.toastr.info('A verification code has been sent to your email.', 'Email Sent');
                this.router.navigate(['/auth/verify'], {
                  queryParams: { email: user.email },
                  replaceUrl: true
                }).finally(() => {
                });
              },
              error: (resendErr) => {
                this.toastr.error('Unable to resend verification email. Try again later.', 'Error');
              }
            });
            return;
          }

          if (rememberMe) {
            localStorage.setItem('rememberMe', 'true');
            localStorage.setItem('savedEmail', credentials.email);
            localStorage.setItem('savedPassword', credentials.password);
          } else {
            localStorage.removeItem('rememberMe');
            localStorage.removeItem('savedEmail');
            localStorage.removeItem('savedPassword');
          }

          this.authservice.saveAuthData(token, user, rememberMe);
          const fullName = `${user.firstName || ''} ${user.lastName || ''}`.trim();
          const welcomeMessage = fullName ? `Bienvenue, ${fullName}` : 'Bienvenue';
          this.toastr.success(welcomeMessage, 'Connexion réussie');

          this.router.navigate(['/dashboard/report-dashboard/view-reports'], { replaceUrl: true })
            .finally(() => {
            });

        } catch (err) {
          console.error('[Login] Token decode error:', err);
          this.toastr.error('Erreur de connexion', 'Token invalide');
          this.authservice.clearAuthData();
        }
      },
      error: (err) => {
        console.error('[Login] Login failed:', err);
        this.toastr.error('Email ou mot de passe incorrect', 'Échec de connexion');
        this.authservice.clearAuthData();
      }
    });
  }
}
