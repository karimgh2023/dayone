import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from '../../../../../shared/common/sharedmodule';
import { UserService } from '@/app/shared/services/user.service';
import { UserAdminService } from '@/app/shared/services/user-admin.service';
import { DataService } from '@/app/shared/services/data.service';
import { User } from '@/app/models/user.model';
import { Department } from '@/app/models/department.model';
import { Plant } from '@/app/models/plant.model';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [SharedModule, RouterModule, NgSelectModule, FormsModule, ReactiveFormsModule],
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {
  users: User[] = [];
  filteredUsers: User[] = [];
  departments: Department[] = [];
  plants: Plant[] = [];
  editForms: { [userId: number]: FormGroup } = {};
  addUserForm!: FormGroup;
  loading = false;
  error: string | null = null;
  searchTerm = '';
  private searchSubject = new Subject<string>();
  pageSize = 10;
  currentPage = 1;

  get totalEmployees(): number {
    return this.users.length;
  }

  get activeEmployees(): number {
    return this.users.filter(user => user.loggedIn).length;
  }

  get totalDepartments(): number {
    return this.departments.length;
  }

  get totalPlants(): number {
    return this.plants.length;
  }
  
  constructor(
    private userService: UserService,
    private userAdminService: UserAdminService,
    private fb: FormBuilder,
    private dataService: DataService
  ) {
    // Setup search with debounce
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(term => {
      this.filterUsers(term);
    });
   }

  ngOnInit(): void {
    this.loadAllData();
    this.initAddUserForm();
  }

  loadAllData() {
    this.loading = true;
    this.error = null;

    this.userService.getAllUsersExceptAdmins().subscribe({
      next: (users) => {
        console.log('Loaded users:', users);
        this.users = users;
        this.filteredUsers = users;
        this.loading = false;
      },
      error: (err) => {
        console.error('Load users error:', err);
        this.error = 'Failed to load users. Please try again later.';
        this.loading = false;
      }
    });

    this.dataService.getDepartments().subscribe({
      next: (deps) => {
        console.log('Loaded departments:', deps);
        this.departments = deps;
      },
      error: (err) => {
        console.error('Load departments error:', err);
        this.error = 'Failed to load departments.';
      }
    });

    this.dataService.getPlants().subscribe({
      next: (plants) => {
        console.log('Loaded plants:', plants);
        this.plants = plants;
      },
      error: (err) => {
        console.error('Load plants error:', err);
        this.error = 'Failed to load plants.';
      }
    });
  }

  onSearch(term: string) {
    this.searchSubject.next(term);
  }

  filterUsers(term: string) {
    if (!term.trim()) {
      this.filteredUsers = this.users;
      return;
    }

    const searchTerm = term.toLowerCase();
    this.filteredUsers = this.users.filter(user => 
      user.firstName.toLowerCase().includes(searchTerm) ||
      user.lastName.toLowerCase().includes(searchTerm) ||
      user.email.toLowerCase().includes(searchTerm) ||
      user.phoneNumber.includes(searchTerm) ||
      user.department?.name.toLowerCase().includes(searchTerm) ||
      user.plant?.name.toLowerCase().includes(searchTerm)
    );
  }

  onPageSizeChange(size: number) {
    this.pageSize = size;
    this.currentPage = 1;
  }

  get paginatedUsers() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.filteredUsers.slice(startIndex, startIndex + this.pageSize);
  }

  get totalPages() {
    return Math.ceil(this.filteredUsers.length / this.pageSize);
  }

  onPageChange(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  initAddUserForm() {
    this.addUserForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      departmentId: [null, Validators.required],
      plantId: [null, Validators.required],
      role: ['EMPLOYEE', Validators.required]
    });
  }

  initEditForm(user: User): FormGroup {
    return this.fb.group({
      departmentId: [user.department?.id, Validators.required],
      plantId: [user.plant?.id, Validators.required],
      phoneNumber: [user.phoneNumber, Validators.required],
      role: [user.role, Validators.required]
    });
  }

  getEditForm(userId: number): FormGroup {
    if (!this.editForms[userId]) {
      const user = this.users.find(u => u.id === userId);
      this.editForms[userId] = this.initEditForm(user!);
    }
    return this.editForms[userId];
  }

  asFormControl(control: AbstractControl | null): FormControl {
    return control as FormControl;
  }

  updateUser(userId: number): void {
    const form = this.getEditForm(userId);
    if (form.invalid) return;

    this.userAdminService.updateUser(userId, form.value).subscribe({
      next: res => {
        console.log('[✅ User UPDATED]', res.message);
        alert('✅ User updated successfully.');
        this.loadAllData();
      },
      error: err => {
        console.error('[❌ User UPDATE ERROR]', err);
        alert('❌ Failed to update user.');
      }
    });
  }

  addUser(): void {
    if (this.addUserForm.invalid) return;

    this.userAdminService.addUser(this.addUserForm.value).subscribe({
      next: (response) => {
        const message = response?.message || '✅ User added and email sent';
        alert(message);
        this.addUserForm.reset();
        this.addUserForm.get('role')?.setValue('EMPLOYEE');
        this.loadAllData();
      },
      error: (err) => {
        alert('❌ Failed to add user');
        console.error('Add user error:', err);
      }
    });
  }

  deleteUser(userId: number): void {
    if (!confirm('Are you sure you want to delete this user?')) return;

    this.userAdminService.deleteUser(userId).subscribe({
      next: (res) => {
        alert(res.message);
        this.loadAllData();
      },
      error: (err) => {
        console.error('❌ Delete user error:', err);
        alert('❌ Failed to delete user');
      }
    });
  }
}
