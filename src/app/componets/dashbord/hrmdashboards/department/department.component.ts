import { NgSelectModule } from '@ng-select/ng-select';
import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../../../../shared/common/sharedmodule';
import { RouterModule } from '@angular/router';
import { DepartmentAdminService } from '../../../../shared/services/department-admin.service';
import { DataService } from '../../../../shared/services/data.service';

import { Department } from '../../../../models/department.model';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-department',
  standalone: true,
  imports: [NgbModule, NgSelectModule, SharedModule, RouterModule, FormsModule, CommonModule],
  templateUrl: './department.component.html',
  styleUrl: './department.component.scss'
})
export class DepartmentComponent implements OnInit {
  departments: Department[] = [];
  selectedDepartment: Department | null = null;
  newDepartmentName: string = '';
  searchText: string = '';
  pageSize: number = 10;
  currentPage: number = 1;
  isLoading: boolean = false;

  constructor(
    private modalService: NgbModal,
    private departmentAdminService: DepartmentAdminService,
    private dataService: DataService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadDepartments();
  }

  loadDepartments(): void {
    this.isLoading = true;
    this.dataService.getDepartments().subscribe({
      next: (departments: Department[]) => {
        console.log('Departments loaded:', departments); // Debug log
        this.departments = departments;
        this.isLoading = false;
      },
      error: (err: any) => {
        console.error('Error loading departments:', err);
        this.toastr.error('Failed to load departments', 'Error');
        this.isLoading = false;
      }
    });
  }

  open(content: any) {
    this.newDepartmentName = '';
    this.selectedDepartment = null;
    this.modalService.open(content, { windowClass: 'modalCusSty' });
  }

  edit(editData: any, department: Department) {
    this.selectedDepartment = department;
    this.newDepartmentName = department.name;
    this.modalService.open(editData, { backdrop: 'static', windowClass: 'modalCusSty' });
  }

  saveDepartment(): void {
    if (!this.newDepartmentName.trim()) {
      this.toastr.error('Department name is required', 'Error');
      return;
    }

    if (this.selectedDepartment) {
      // Update existing department
      const updatedDepartment: Department = {
        id: this.selectedDepartment.id,
        name: this.newDepartmentName
      };
      this.departmentAdminService.updateDepartment(this.selectedDepartment.id,updatedDepartment).subscribe({
        next: () => {
          this.toastr.success('Department updated successfully');
          this.loadDepartments();
          this.modalService.dismissAll();
        },
        error: (err) => {
          console.error('Error updating department:', err);
          this.toastr.error('Failed to update department', 'Error');
        }
      });
    } else {
      // Create new department
      const newDepartment: Department = {
        id: 0, // Temporary ID, will be assigned by backend
        name: this.newDepartmentName
      };
      this.departmentAdminService.addDepartment(this.newDepartmentName).subscribe({
        next: () => {
          this.toastr.success('Department created successfully');
          this.loadDepartments();
          this.modalService.dismissAll();
        },
        error: (err: any) => {
          console.error('Error creating department:', err);
          this.toastr.error('Failed to create department', 'Error');
        }
      });
    }
  }

  deleteDepartment(id: number): void {
    if (confirm('Are you sure you want to delete this department?')) {
        this.departmentAdminService.deleteDepartment(id).subscribe({
        next: () => {
          // Remove department from local array immediately
          this.departments = this.departments.filter(dept => dept.id !== id);
          
          // Show success message
          this.toastr.success('Department deleted successfully');
          
          // Also reload from server to ensure consistency
          this.loadDepartments();
        },
        error: (err) => {
          console.error('Error deleting department:', err);
          this.toastr.error('Failed to delete department', 'Error');
        }
      });
    }
  }

  // Filter departments based on search text
  get filteredDepartments(): Department[] {
    if (!this.searchText) {
      return this.departments;
    }
    return this.departments.filter(dept => 
      dept.name.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  // Pagination methods
  get paginatedDepartments(): Department[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.filteredDepartments.slice(startIndex, startIndex + this.pageSize);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredDepartments.length / this.pageSize);
  }

  changePageSize(size: number): void {
    this.pageSize = size;
    this.currentPage = 1;
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }
}
