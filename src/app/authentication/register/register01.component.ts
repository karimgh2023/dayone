import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../shared/services/data.service';
import { Department } from '../../models/department.model';
import { Plant } from '../../models/plant.model';
import { NgSelectModule } from '@ng-select/ng-select';
import { forkJoin, Observable, of } from 'rxjs';
import { catchError, finalize, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-register01',
  standalone: true,
  imports: [
    RouterModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    NgSelectModule
  ],
  templateUrl: './register01.component.html',
  styleUrls: ['./register01.component.scss']
})
export class Register01Component implements OnInit {
  registerForm!: FormGroup;
  showPassword = false;
  toggleClass = 'eye-off';

  plants: Plant[] = [];
  departments: Department[] = [];
  isLoading = false;

  // Cache for plants and departments
  private plants$: Observable<Plant[]>;
  private departments$: Observable<Department[]>;

  constructor(
    private elementRef: ElementRef,
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private dataService: DataService
  ) {
    document.body.classList.add('error-1');
    
    // Initialize cached observables
    this.plants$ = this.dataService.getPlants().pipe(
      shareReplay(1),
      catchError(err => {
        console.error('Failed to load plants:', err);
        return of([]);
      })
    );

    this.departments$ = this.dataService.getDepartments().pipe(
      shareReplay(1),
      catchError(err => {
        console.error('Failed to load departments:', err);
        return of([]);
      })
    );
  }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      departmentId: ['', Validators.required],
      plantId: ['', Validators.required],
      phoneNumber: ['', Validators.required]
    }, {
      validator: this.passwordsMatchValidator
    });

    this.loadDepartmentsAndPlants();
  }

  loadDepartmentsAndPlants(): void {
    this.isLoading = true;
    
    forkJoin({
      plants: this.plants$,
      departments: this.departments$
    }).pipe(
      finalize(() => this.isLoading = false)
    ).subscribe({
      next: ({ plants, departments }) => {
        this.plants = plants;
        this.departments = departments;
        console.log('✅ Data loaded successfully');
      },
      error: (err) => {
        console.error('❌ Failed to load data:', err);
        this.toastr.error('Failed to load form data. Please refresh the page.');
      }
    });
  }

  ngOnDestroy(): void {
    document.body.classList.remove('error-1');
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
    this.toggleClass = this.toggleClass === 'eye' ? 'eye-off' : 'eye';
  }

  passwordsMatchValidator(form: FormGroup) {
    return form.get('password')!.value === form.get('confirmPassword')!.value
      ? null : { mismatch: true };
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      this.toastr.error('Please complete the form correctly');
      return;
    }

    const userData = {
      firstName: this.registerForm.value.firstName,
      lastName: this.registerForm.value.lastName,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
      confirmPassword: this.registerForm.value.confirmPassword,
      phoneNumber: this.registerForm.value.phoneNumber,
      department: {
        id: this.registerForm.value.departmentId
      },
      plant: {
        id: this.registerForm.value.plantId
      }
    };

    console.log('Register payload:', userData);

    this.authService.register(userData).subscribe({
      next: (message: string) => {
        this.toastr.success(message || 'Account created! Check your email.');
        this.router.navigate(['/auth/verify'], { queryParams: { email: userData.email } });
      },
      error: (err) => {
        const errorMessage = err.error || '';

        if (
          errorMessage.includes('Failed to send verification email') ||
          errorMessage.includes('Authentication failed')
        ) {
          this.toastr.warning('Registered, but email was not sent. Please contact admin.');
          this.router.navigate(['/auth/verify'], { queryParams: { email: userData.email } });
        } else {
          this.toastr.error(errorMessage || 'Registration failed');
          console.error('Registration error:', err);
        }
      }
    });
  }
}
