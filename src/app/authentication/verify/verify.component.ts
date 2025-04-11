import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
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
    FormsModule
  ],
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss']
})
export class VerifyComponent implements OnInit {
  verifyForm!: FormGroup;
  email: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private elementRef: ElementRef
  ) {
    document.body.classList.add('error-1');
    console.log("VerifyComponent loaded ✅");

  }

  ngOnInit(): void {
    this.verifyForm = this.fb.group({
      code: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.route.queryParams.subscribe(params => {
      this.email = params['email'];
      if (!this.email) {
        this.toastr.error('Email is missing from URL. Redirecting to login.');
        this.router.navigate(['/auth/login']);
      }
    });
  }

  ngOnDestroy(): void {
    document.body.classList.remove('error-1');
  }

  onVerify(): void {
    if (this.verifyForm.invalid) {
      this.toastr.error('Please enter the verification code');
      return;
    }

    const code = this.verifyForm.value.code;

    this.authService.verifyEmailCode(code).subscribe({
      next: () => {
        this.toastr.success('Account verified successfully! You can now log in.');
        this.router.navigate(['/auth/login']);
      },
      error: (err) => {
        this.toastr.error(err.error?.message || 'Invalid verification code');
        console.error(err);
      }
    });
  }
}
