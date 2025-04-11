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
    });
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
  
    this.authservice.login(credentials).subscribe({
      next: (token: string) => {
        // ✅ Decode the token to extract user info
        const decoded = jwtDecode<any>(token);
        const user: User = {
          firstName: decoded.user.firstName,
          lastName: decoded.user.lastName,
          email: decoded.user.email,
          department: decoded.user.department,
          role: decoded.user.role,
          phoneNumber: Number(decoded.user.phone),
          id: decoded.user.id
        };

        console.log(jwtDecode(token));

        this.authservice.saveAuthData(token, user);
  
        this.toastr.success(
          `Bienvenue, ${user.firstName} ${user.lastName} `,
          'Connexion réussie',
          {
            timeOut: 3000,
            positionClass: 'toast-top-right',
          }
        );
  
        this.router.navigate(['/dashboard/hrmdashboards/dashboard']);
      },
      error: (err) => {
        this.toastr.error('Invalid credentials', 'Login Failed', {
          timeOut: 3000,
          positionClass: 'toast-top-right',
        });
        console.error(err);
      }
    });
  }
  
  
  
  
  

}