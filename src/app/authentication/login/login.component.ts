import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, RouterModule } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { AuthService } from '../../shared/services/auth.service';
import { AppStateService } from '../../shared/services/app-state.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { jwtDecode } from 'jwt-decode'; // <-- import jwtDecode
import { User } from '../../models/user.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterModule,
    NgbModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule, // <-- THIS is the one that fixes formGroup error
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
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      rememberMe: [false]
    });

    // Load saved credentials if they exist
    const savedEmail = localStorage.getItem('savedEmail');
    const savedPassword = localStorage.getItem('savedPassword');
    if (savedEmail && savedPassword) {
      this.loginForm.patchValue({
        email: savedEmail,
        password: savedPassword,
        rememberMe: true
      });
    }
  }



  ngOnDestroy(): void {
    document.body.classList.remove('error-1');
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
    this.toggleClass = this.toggleClass === 'eye' ? 'eye-off' : 'eye';
  }

  clearErrorMessage() {
    this.errorMessage = '';
    this._error = { name: '', message: '' };
  }

  login() {
    this.clearErrorMessage();

    if (!this.loginForm.valid) {
      this.errorMessage = 'Please fill in all required fields';
      return;
    }

    const credentials = this.loginForm.value;
    const rememberMe = this.loginForm.get('rememberMe')?.value;

    this.authservice.login(credentials).subscribe({
      next: (token: string) => {
        try {
          if (typeof token !== 'string' || !token.trim()) throw new Error('Invalid token');

          const decoded = jwtDecode<any>(token);
          console.log('Decoded token:', decoded); // Log decoded token for debugging

          const user: User = {
            id: decoded.userId || 0,
            email: decoded.email || '',
            firstName: decoded.firstName || '',
            lastName: decoded.lastName || '',
            phoneNumber: decoded.phoneNumber || '',
            role: decoded.role || '',
            department: decoded.department,
            plant: decoded.plant,
            profilePhoto: decoded.profilePhoto || ''
          };

          // Save login info
          if (rememberMe) {
            localStorage.setItem('savedEmail', credentials.email);
            localStorage.setItem('savedPassword', credentials.password);
          } else {
            localStorage.removeItem('savedEmail');
            localStorage.removeItem('savedPassword');
          }

          this.authservice.clearAuthData();
          this.authservice.saveAuthData(token, user, rememberMe);

          // Ensure user name is displayed properly in toast
          const fullName = `${user.firstName || ''} ${user.lastName || ''}`.trim();
          const welcomeMessage = fullName ? `Bienvenue, ${fullName}` : 'Bienvenue';
          
          this.toastr.success(welcomeMessage, 'Connexion réussie');
          this.router.navigate(['/dashboard/hrmdashboards/dashboard']);
        } catch (error) {
          console.error('Error processing token:', error);
          this.toastr.error('Token error', 'Login Failed');
          this.authservice.clearAuthData();
        }
      },
      error: (err) => {
        console.error('Login failed:', err);
        this.toastr.error('Invalid credentials', 'Login Failed');
        this.authservice.clearAuthData();
      }
    });
  }





}
