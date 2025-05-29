import {
  Component,
  ElementRef,
  OnInit,
  OnDestroy,
  ChangeDetectorRef,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  Router,
  ActivatedRoute,
  RouterModule,
} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../shared/services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-verify',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterModule,
    CommonModule,
    FormsModule,
  ],
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss'],
})
export class VerifyComponent implements OnInit, OnDestroy {
  verifyForm!: FormGroup;
  email: string = '';
  canResend: boolean = false;
  resendTimer: number = 30;
  isLoading: boolean = false; // ✅ loading state
  private timerInterval: any;


  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private elementRef: ElementRef,
    private cdr: ChangeDetectorRef
  ) {
    document.body.classList.add('error-1');
  }

  ngOnInit(): void {
    this.verifyForm = this.fb.group({
      code: ['', [Validators.required, Validators.minLength(6)]],
    });

    this.route.queryParams.subscribe((params) => {
      this.email = params['email'];
      if (!this.email) {
        this.toastr.error('Email is missing from URL. Redirecting to login.');
        this.router.navigate(['/auth/login']);
      } else {
        this.startResendCooldown();
      }
    });
  }

  ngOnDestroy(): void {
    document.body.classList.remove('error-1');
    clearInterval(this.timerInterval);
  }

onVerify(): void {
  if (this.verifyForm.invalid) {
    this.toastr.error('Please enter the verification code');
    return;
  }

  this.isLoading = true; // use isLoading
  const code = this.verifyForm.value.code;

  this.authService.verifyEmailCode(this.email, code).subscribe({
    next: () => {
      this.toastr.success('Account verified successfully! You can now log in.');
      this.router.navigate(['/auth/login']);
    },
    error: (err) => {
      this.toastr.error(err.error?.error || 'Invalid verification code');
      this.isLoading = false;
    },
    complete: () => {
      this.isLoading = false;
    }
  });
}



  resendEmail(): void {
    if (!this.canResend) return;

    this.isLoading = true;
    this.authService.resendVerificationEmail(this.email).subscribe({
      next: () => {
        this.toastr.success('Verification email resent.');
        this.startResendCooldown();
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
        this.toastr.error('Failed to resend email.');
        console.error(err);
      },
    });
  }

  private startResendCooldown(): void {
    this.canResend = false;
    this.resendTimer = 5;

    this.timerInterval = setInterval(() => {
      this.resendTimer--;
      this.cdr.detectChanges();

      if (this.resendTimer <= 0) {
        clearInterval(this.timerInterval);
        this.canResend = true;
        this.cdr.detectChanges();
      }
    }, 1000);
  }
}
