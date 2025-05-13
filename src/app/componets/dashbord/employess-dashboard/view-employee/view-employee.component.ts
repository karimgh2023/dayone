import { FormBuilder, FormsModule, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { Component, OnInit } from '@angular/core';
import { NgbDateStruct, NgbModule, NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { SharedModule } from '@/app/shared/common/sharedmodule';
import { FlatpickrModule, FlatpickrDefaults } from 'angularx-flatpickr';
import { UserService } from '@/app/shared/services/user.service';
import { UserAdminService } from '@/app/shared/services/user-admin.service';
import { DataService } from '@/app/shared/services/data.service';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { Department } from '@/app/models/department.model';
import { Plant } from '@/app/models/plant.model';
import { Role } from '@/app/models/role.enum';
import { forkJoin } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-view-employee',
  standalone: true,
  imports: [
    NgbModule,
    NgSelectModule,
    FormsModule,
    NgCircleProgressModule,
    SharedModule,
    FlatpickrModule,
    ReactiveFormsModule,
    CommonModule
  ],
  providers: [FlatpickrDefaults],
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.scss']
})
export class ViewEmployeeComponent implements OnInit {
  model!: NgbDateStruct;
  model1!: NgbDateStruct;
  model2!: NgbDateStruct;

  active = 1;
  currentRate = 3;
  loading = false;
  error: string | null = null;
  departments: Department[] = [];
  plants: Plant[] = [];
  employeeForm!: FormGroup;
  
  // Available roles from enum
  availableRoles = Object.values(Role).filter(role => role !== Role.ADMIN);

  constructor(
    config: NgbRatingConfig,
    private userService: UserService,
    private userAdminService: UserAdminService,
    private fb: FormBuilder,
    private dataService: DataService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {
    config.max = 5;
  }

  ngOnInit(): void {
    this.initForm();
    this.loadDepartmentsAndPlants();
    this.loadEmployeeData();
  }

  initForm() {
    this.employeeForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      plantId: [null, Validators.required],
      departmentId: [null, Validators.required],
      role: [null, Validators.required],
      isActive: [true],
      profilePhoto: [null]
    });
  }

  loadDepartmentsAndPlants() {
    this.loading = true;
    this.error = null;

    forkJoin({
      departments: this.dataService.getDepartments(),
      plants: this.dataService.getPlants()
    }).subscribe({
      next: ({ departments, plants }) => {
        this.departments = departments;
        this.plants = plants;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading departments or plants:', err);
        this.toastr.error('Failed to load departments and plants.', 'Error');
        this.loading = false;
      }
    });
  }

  loadEmployeeData() {
    const employeeId = this.route.snapshot.params['id'];
    if (!employeeId) {
      this.toastr.error('No employee ID provided', 'Error');
      this.router.navigate(['/dashboard/hrmdashboards/employees/employee-list']);
      return;
    }

    this.loading = true;
    // Use getAllUsersExceptAdmins and find the specific user
    this.userService.getAllUsersExceptAdmins().subscribe({
      next: (users) => {
        const employee = users.find(u => u.id === +employeeId);
        if (!employee) {
          this.toastr.error('Employee not found', 'Error');
          this.router.navigate(['/dashboard/hrmdashboards/employees/employee-list']);
          return;
        }

        // Wait for departments and plants to be loaded
        if (this.departments.length === 0 || this.plants.length === 0) {
          setTimeout(() => this.loadEmployeeData(), 100);
          return;
        }

        this.employeeForm.patchValue({
          firstName: employee.firstName,
          lastName: employee.lastName,
          phoneNumber: employee.phoneNumber,
          email: employee.email,
          plantId: this.plants.find(p => p.id === employee.plant.id),
          departmentId: this.departments.find(d => d.id === employee.department.id),
          role: employee.role,
          isActive: employee.loggedIn,
          profilePhoto: employee.profilePhoto || null
        });
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading employee:', err);
        this.toastr.error('Failed to load employee data', 'Error');
        this.loading = false;
      }
    });
  }

  onUpdate() {
    if (this.employeeForm.invalid) {
      this.markFormGroupTouched(this.employeeForm);
      this.toastr.warning('Please fill in all required fields correctly.', 'Validation Error');
      return;
    }

    this.loading = true;
    const employeeId = this.route.snapshot.params['id'];
    const formValue = this.employeeForm.value;

    const payload = {
      ...formValue,
      plantId: formValue.plantId?.id,
      departmentId: formValue.departmentId?.id,
      role: formValue.role
    };

    this.userAdminService.updateUser(employeeId, payload).subscribe({
      next: (response) => {
        this.toastr.success('Employee updated successfully', 'Success');
        this.router.navigate(['/dashboard/hrmdashboards/employees/employee-list']);
      },
      error: (err) => {
        console.error('Update employee error:', err);
        this.loading = false;
        
        if (err.status === 409) {
          this.toastr.error('An employee with this email already exists.', 'Error');
          this.employeeForm.get('email')?.setErrors({ emailExists: true });
        } else if (err.status === 400) {
          this.toastr.error('Invalid data provided. Please check your input.', 'Validation Error');
        } else {
          this.toastr.error('Failed to update employee. Please try again.', 'Error');
        }
      }
    });
  }

  onCancel() {
    this.router.navigate(['/dashboard/employess-dashboard/employees/employee-list']);
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}