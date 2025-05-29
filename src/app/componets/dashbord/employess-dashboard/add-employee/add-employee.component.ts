import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NgbDateStruct, NgbRatingConfig, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

import { NgSelectModule } from '@ng-select/ng-select';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { SharedModule } from '@/app/shared/common/sharedmodule';
import { RouterModule } from '@angular/router';
import flatpickr from 'flatpickr';
import { FlatpickrDefaults, FlatpickrModule } from 'angularx-flatpickr';
import { CommonModule } from '@angular/common';

import { UserAdminService } from '@/app/shared/services/user-admin.service';
import { DataService } from '@/app/shared/services/data.service';
import { Department } from '@/app/models/department.model';
import { Plant } from '@/app/models/plant.model';
import { Role } from '@/app/models/role.enum';

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [
    CommonModule,
    NgbModule,
    NgSelectModule,
    NgCircleProgressModule,
    SharedModule,
    RouterModule,
    FlatpickrModule,
    ReactiveFormsModule
  ],
  providers: [FlatpickrDefaults],
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit {
  model!: NgbDateStruct;
  active = 1;
  loading = false;
  error: string | null = null;

  employeeForm!: FormGroup;
  departments: Department[] = [];
  plants: Plant[] = [];

  availableRoles = Object.values(Role).filter(role => role !== Role.ADMIN);

  flatpickrOptions: any = {
    inline: true,
  };

  constructor(
    config: NgbRatingConfig,
    private fb: FormBuilder,
    private userAdminService: UserAdminService,
    private dataService: DataService,
    private router: Router,
    private toastr: ToastrService,
    private cdr: ChangeDetectorRef // 👈 Needed to fix loading spinner issue
  ) {
    config.max = 5;
  }

  ngOnInit(): void {
    this.initForm();
    this.loadDepartmentsAndPlants();
    this.setupDatePickers();
  }

  initForm() {
    this.employeeForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      plantId: [null, Validators.required],
      departmentId: [null, Validators.required],
      role: [null, Validators.required],
    });
  }

  loadDepartmentsAndPlants() {
    this.error = null;
    forkJoin({
      departments: this.dataService.getDepartments(),
      plants: this.dataService.getPlants()
    }).subscribe({
      next: ({ departments, plants }) => {
        this.departments = departments;
        this.plants = plants;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error loading departments or plants:', err);
        this.toastr.error('Failed to load departments and plants.', 'Error');
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  setupDatePickers() {
    this.flatpickrOptions = {
      enableTime: true,
      noCalendar: true,
      dateFormat: 'H:i',
    };
    flatpickr('#inlinetime', this.flatpickrOptions);

    this.flatpickrOptions = {
      enableTime: true,
      dateFormat: 'Y-m-d H:i',
      defaultDate: '2023-11-07 14:30',
    };
    flatpickr('#pretime', this.flatpickrOptions);
  }

  onSave() {
    if (this.employeeForm.invalid) {
      this.markFormGroupTouched(this.employeeForm);
      this.toastr.warning('Please fill in all required fields correctly.', 'Validation Error');
      return;
    }

    this.loading = true;
    this.error = null;

    const formValue = this.employeeForm.value;
    const payload = {
      ...formValue,
      plantId: formValue.plantId?.id,
      departmentId: formValue.departmentId?.id,
      role: formValue.role
    };

    this.userAdminService.addUser(payload).subscribe({
      next: (response) => {
        this.toastr.success('Employee added successfully', 'Success');
        this.router.navigate(['/dashboard/employess-dashboard/employees/employee-list']);
        this.loading = false;
        this.cdr.detectChanges(); // ✅ ensure spinner stops
      },
      error: (err) => {
        console.error('Add employee error:', err);

        if (err.status === 409) {
          this.toastr.error('An employee with this email already exists.', 'Error');
          this.employeeForm.get('email')?.setErrors({ emailExists: true });
        } else if (err.status === 400) {
          this.toastr.error('Invalid data provided. Please check your input.', 'Validation Error');
        } else {
          this.toastr.error('Failed to add employee. Please try again.', 'Error');
        }

        this.loading = false;
        this.cdr.detectChanges(); // ✅ manually trigger UI update
      }
    });
  }

  onCancel() {
    this.router.navigate(['/dashboard/hrmdashboards/employees/employee-list']);
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.employeeForm.patchValue({
          profilePhoto: e.target.result
        });
      };
      reader.readAsDataURL(file);
    }
  }
}
