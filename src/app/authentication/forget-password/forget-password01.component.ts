import { Component, ElementRef, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { finalize } from 'rxjs/operators';
import { AuthService } from '@/app/shared/services/auth.service';

@Component({
  selector: 'app-forget-password01',
  standalone: true,
  imports: [RouterModule, CommonModule, ReactiveFormsModule],
  templateUrl: './forget-password01.component.html',
  styleUrls: ['./forget-password01.component.scss'],
})
export class ForgetPassword01Component implements OnInit, OnDestroy {
  step = 1;
  loading = false;
  emailForm: FormGroup;
  codeForm: FormGroup;
  passwordForm: FormGroup;

  showPassword = false;
  showPassword1 = false;
  toggleClass = 'eye-off';
  toggleClass1 = 'eye-off';

  canResend: boolean = false;
  resendTimer: number = 30;
  private timerInterval: any;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService,
    private elementRef: ElementRef,
    private cdr: ChangeDetectorRef // ✅ For manual UI updates
  ) {
    document.body.classList.add('error-1');

    this.emailForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });

    this.codeForm = this.fb.group({
      code: ['', [Validators.required, Validators.minLength(5)]],
    });

    this.passwordForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    document.body.classList.remove('error-1');
    clearInterval(this.timerInterval);
  }

  sendResetCode() {
    if (this.emailForm.invalid) return;

    this.loading = true;
    const email = this.emailForm.value.email;

    this.authService.sendResetPasswordCode(email)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (res) => {
          this.toastr.success(res.message);
          this.step = 2;
          this.cdr.detectChanges(); // ✅ Update UI
          this.startResendCooldown();
        },
        error: (err) => {
          console.error('❌ sendResetCode error:', err);
          this.toastr.error(err.error?.error || 'Échec d\'envoi de l\'email');
        },
      });
  }

  resendCode() {
    if (!this.canResend || this.emailForm.invalid) return;

    this.loading = true;
    const email = this.emailForm.value.email;

    this.authService.sendResetPasswordCode(email)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: () => {
          this.toastr.success('Le code a été renvoyé.');
          this.startResendCooldown();
        },
        error: (err) => {
          this.toastr.error('Échec du renvoi de l\'email.');
          console.error(err);
        },
      });
  }

  private startResendCooldown(): void {
    this.canResend = false;
    this.resendTimer = 30;

    clearInterval(this.timerInterval);
    this.timerInterval = setInterval(() => {
      this.resendTimer--;
      this.cdr.detectChanges(); // ✅ Refresh countdown

      if (this.resendTimer <= 0) {
        clearInterval(this.timerInterval);
        this.canResend = true;
        this.cdr.detectChanges(); // ✅ Final UI refresh
      }
    }, 1000);
  }

  verifyCode() {
    if (this.codeForm.invalid) return;

    this.loading = true;
    const { email } = this.emailForm.value;
    const { code } = this.codeForm.value;

    this.authService.verifyResetCode(email, code)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (res) => {
          if (res.valid) {
            this.toastr.success('Code vérifié');
            this.step = 3;
            this.cdr.detectChanges(); // ✅ Immediate update to Step 3
          } else {
            this.toastr.error('Code invalide ou expiré');
          }
        },
        error: (err) => {
          console.error('❌ verifyCode error:', err);
          this.toastr.error(err.error?.error || 'Erreur de vérification');
        },
      });
  }

  resetPassword() {
    if (this.passwordForm.invalid) return;

    const { newPassword, confirmPassword } = this.passwordForm.value;
    const { email } = this.emailForm.value;
    const { code } = this.codeForm.value;

    if (newPassword !== confirmPassword) {
      this.toastr.warning('Les mots de passe ne correspondent pas');
      return;
    }

    this.loading = true;

    this.authService.resetPassword(email, newPassword, code)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (res) => {
          this.toastr.success(res.message);
          this.step = 4;
          this.cdr.detectChanges(); // ✅ Show final confirmation step
        },
        error: (err) => {
          console.error('❌ resetPassword error:', err);
          this.toastr.error(err.error?.error || 'Échec de la réinitialisation');
        },
      });
  }

  createpassword(field: number) {
    if (field === 1) {
      this.showPassword = !this.showPassword;
      this.toggleClass = this.showPassword ? 'line' : 'eye-off';
    } else {
      this.showPassword1 = !this.showPassword1;
      this.toggleClass1 = this.showPassword1 ? 'line' : 'eye-off';
    }
  }
}
