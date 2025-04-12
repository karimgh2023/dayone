import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDateStruct, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../../../../shared/common/sharedmodule';
import { NgSelectModule } from '@ng-select/ng-select';
import { FlatpickrDefaults, FlatpickrModule } from 'angularx-flatpickr';
import flatpickr from 'flatpickr';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { NgxEditorModule, Editor, Toolbar } from 'ngx-editor';
import { ReportService } from '../../../../services/report.service';
import { ReportCreationRequest, UserAssignmentDTO, Protocol } from '../../../../models/report.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-new-report',
  standalone: true,
  imports: [
    SharedModule,
    NgSelectModule,
    NgxEditorModule,
    FormsModule,
    ReactiveFormsModule,
    FlatpickrModule,
    RouterModule,
    NgbModule,
    CommonModule
  ],
  template: `
    <div class="page-header">
      <div>
        <h2 class="page-title">New Report</h2>
        <ol class="breadcrumb mb-0">
          <li class="breadcrumb-item">
            <a [routerLink]="['../report-list']">Reports</a>
          </li>
          <li class="breadcrumb-item active" aria-current="page">Create New Report</li>
        </ol>
      </div>
      <div class="ms-auto pageheader-btn">
        <a [routerLink]="['../protocols']" class="btn btn-info btn-icon text-white me-2">
          <span>
            <i class="fe fe-plus"></i>
          </span> Manage Protocols
        </a>
      </div>
    </div>

    <div class="row">
      <div class="col-xl-12 col-md-12 col-lg-12">
        <div class="card custom-card">
          <div class="card-header border-bottom">
            <h3 class="card-title">New Report Details</h3>
          </div>
          <div class="card-body">
            <form [formGroup]="reportForm" (ngSubmit)="onSubmit()">
              <div class="row">
                <div class="col-md-6 mb-3">
                  <label for="protocolId" class="form-label">Protocol <span class="text-danger">*</span></label>
                  <div class="input-group">
                    <ng-select 
                      [items]="protocols"
                      bindLabel="name"
                      bindValue="id"
                      placeholder="Select a protocol"
                      formControlName="protocolId"
                      [clearable]="false"
                      class="form-control p-0"
                      style="border: none; height: auto"
                    ></ng-select>
                    <button type="button" class="btn btn-primary" (click)="refreshProtocols()">
                      <i class="fe fe-refresh-cw"></i>
                    </button>
                  </div>
                  <div *ngIf="submitted && f['protocolId'].errors" class="invalid-feedback d-block">
                    <div *ngIf="f['protocolId'].errors['required']">Protocol is required</div>
                  </div>
                  <div *ngIf="protocols.length === 0" class="text-danger mt-1">
                    No protocols available. Please create one first.
                  </div>
                </div>

                <div class="col-md-6 mb-3">
                  <label for="type" class="form-label">Report Type <span class="text-danger">*</span></label>
                  <ng-select 
                    [items]="reportTypes"
                    placeholder="Select a report type"
                    formControlName="type"
                    [clearable]="false"
                  ></ng-select>
                  <div *ngIf="submitted && f['type'].errors" class="invalid-feedback d-block">
                    <div *ngIf="f['type'].errors['required']">Report type is required</div>
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-md-6 mb-3">
                  <label for="serialNumber" class="form-label">Serial Number <span class="text-danger">*</span></label>
                  <input type="text" class="form-control" id="serialNumber" formControlName="serialNumber" placeholder="Enter serial number">
                  <div *ngIf="submitted && f['serialNumber'].errors" class="invalid-feedback d-block">
                    <div *ngIf="f['serialNumber'].errors['required']">Serial number is required</div>
                  </div>
                </div>

                <div class="col-md-6 mb-3">
                  <label for="designation" class="form-label">Designation <span class="text-danger">*</span></label>
                  <input type="text" class="form-control" id="designation" formControlName="designation" placeholder="Enter designation">
                  <div *ngIf="submitted && f['designation'].errors" class="invalid-feedback d-block">
                    <div *ngIf="f['designation'].errors['required']">Designation is required</div>
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-md-6 mb-3">
                  <label for="manufacturer" class="form-label">Manufacturer <span class="text-danger">*</span></label>
                  <input type="text" class="form-control" id="manufacturer" formControlName="manufacturer" placeholder="Enter manufacturer">
                  <div *ngIf="submitted && f['manufacturer'].errors" class="invalid-feedback d-block">
                    <div *ngIf="f['manufacturer'].errors['required']">Manufacturer is required</div>
                  </div>
                </div>

                <div class="col-md-6 mb-3">
                  <label for="immobilization" class="form-label">Immobilization <span class="text-danger">*</span></label>
                  <select class="form-select" id="immobilization" formControlName="immobilization">
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                  <div *ngIf="submitted && f['immobilization'].errors" class="invalid-feedback d-block">
                    <div *ngIf="f['immobilization'].errors['required']">Immobilization status is required</div>
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-md-12 mb-3">
                  <label for="equipmentDescription" class="form-label">Equipment Description <span class="text-danger">*</span></label>
                  <textarea class="form-control" id="equipmentDescription" formControlName="equipmentDescription" rows="3" placeholder="Enter equipment description"></textarea>
                  <div *ngIf="submitted && f['equipmentDescription'].errors" class="invalid-feedback d-block">
                    <div *ngIf="f['equipmentDescription'].errors['required']">Equipment description is required</div>
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-md-6 mb-3">
                  <label for="serviceSeg" class="form-label">Service Segment <span class="text-danger">*</span></label>
                  <input type="text" class="form-control" id="serviceSeg" formControlName="serviceSeg" placeholder="Enter service segment">
                  <div *ngIf="submitted && f['serviceSeg'].errors" class="invalid-feedback d-block">
                    <div *ngIf="f['serviceSeg'].errors['required']">Service segment is required</div>
                  </div>
                </div>

                <div class="col-md-6 mb-3">
                  <label for="businessUnit" class="form-label">Business Unit <span class="text-danger">*</span></label>
                  <input type="text" class="form-control" id="businessUnit" formControlName="businessUnit" placeholder="Enter business unit">
                  <div *ngIf="submitted && f['businessUnit'].errors" class="invalid-feedback d-block">
                    <div *ngIf="f['businessUnit'].errors['required']">Business unit is required</div>
                  </div>
                </div>
              </div>

              <hr />
              
              <div class="row">
                <div class="col-md-12 mb-3">
                  <h5>User Assignments</h5>
                  <p class="text-muted">Assign users to departments for this report.</p>
                  
                  <div formArrayName="assignedUsers" *ngFor="let user of assignedUsersControls.controls; let i = index">
                    <div [formGroupName]="i" class="row mb-3">
                      <div class="col-md-6">
                        <label class="form-label">Department</label>
                        <ng-select 
                          [items]="departments"
                          bindLabel="name"
                          bindValue="id"
                          placeholder="Select department"
                          formControlName="departmentId"
                          [clearable]="false"
                        ></ng-select>
                      </div>
                      <div class="col-md-5">
                        <label class="form-label">User</label>
                        <ng-select 
                          [items]="getUsersByDepartment(user.value.departmentId)"
                          bindLabel="fullName"
                          bindValue="id"
                          placeholder="Select user"
                          formControlName="userId"
                          [clearable]="false"
                        ></ng-select>
                      </div>
                      <div class="col-md-1 d-flex align-items-end">
                        <button type="button" class="btn btn-danger btn-sm" (click)="removeUserAssignment(i)">
                          <i class="fe fe-trash"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <button type="button" class="btn btn-primary" (click)="addUserAssignment()">
                    <i class="fe fe-plus"></i> Add User
                  </button>
                </div>
              </div>

              <div class="row mt-4">
                <div class="col-md-12">
                  <button type="submit" class="btn btn-primary me-2">Create Report</button>
                  <button type="button" class="btn btn-secondary" (click)="resetForm()">Reset</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./new-report.component.scss'],
  providers: [FlatpickrDefaults],
})
export class NewReportComponent implements OnInit {
  reportForm: FormGroup;
  submitted = false;
  loading = false;

  protocols: Protocol[] = [];
  
  reportTypes = [
    'Maintenance',
    'Inspection',
    'Repair',
    'Replacement',
    'Homologation'
  ];
  
  departments = [
    { id: 1, name: 'Engineering' },
    { id: 2, name: 'Maintenance' },
    { id: 3, name: 'Quality Control' },
    { id: 4, name: 'Safety' }
  ];
  
  users = [
    { id: 1, departmentId: 1, fullName: 'John Doe', email: 'john.doe@example.com' },
    { id: 2, departmentId: 1, fullName: 'Jane Smith', email: 'jane.smith@example.com' },
    { id: 3, departmentId: 2, fullName: 'Robert Johnson', email: 'robert.johnson@example.com' },
    { id: 4, departmentId: 2, fullName: 'Emily Wilson', email: 'emily.wilson@example.com' },
    { id: 5, departmentId: 3, fullName: 'Michael Brown', email: 'michael.brown@example.com' },
    { id: 6, departmentId: 4, fullName: 'Sarah Davis', email: 'sarah.davis@example.com' }
  ];

  constructor(
    private fb: FormBuilder,
    private reportService: ReportService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.reportForm = this.fb.group({
      protocolId: [null, Validators.required],
      type: [null, Validators.required],
      serialNumber: ['', Validators.required],
      designation: ['', Validators.required],
      manufacturer: ['', Validators.required],
      immobilization: ['Yes', Validators.required],
      equipmentDescription: ['', Validators.required],
      serviceSeg: ['', Validators.required],
      businessUnit: ['', Validators.required],
      assignedUsers: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.loadProtocols();
    // Add initial user assignment
    this.addUserAssignment();
  }

  loadProtocols(): void {
    this.loading = true;
    this.reportService.getAllProtocols().subscribe({
      next: (protocols) => {
        this.protocols = protocols;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading protocols', error);
        this.loading = false;
      }
    });
  }

  refreshProtocols(): void {
    this.loadProtocols();
  }

  // Getter for form controls
  get f() { return this.reportForm.controls; }
  
  // Getter for assigned users form array
  get assignedUsersControls() { return this.f['assignedUsers'] as any; }

  // Filter users by department
  getUsersByDepartment(departmentId: number): any[] {
    if (!departmentId) return [];
    return this.users.filter(user => user.departmentId === departmentId);
  }

  // Add a new user assignment row
  addUserAssignment(): void {
    this.assignedUsersControls.push(
      this.fb.group({
        departmentId: ['', Validators.required],
        userId: ['', Validators.required]
      })
    );
  }

  // Remove a user assignment row
  removeUserAssignment(index: number): void {
    this.assignedUsersControls.removeAt(index);
  }

  onSubmit(): void {
    this.submitted = true;
    
    // Check if form is valid
    if (this.reportForm.invalid) {
      return;
    }
    
    // Create report request from form data
    const reportRequest: ReportCreationRequest = {
      title: this.reportForm.value.designation,
      type: this.reportForm.value.type,
      protocolId: this.reportForm.value.protocolId,
      serialNumber: this.reportForm.value.serialNumber,
      equipmentDescription: this.reportForm.value.equipmentDescription,
      designation: this.reportForm.value.designation,
      manufacturer: this.reportForm.value.manufacturer,
      immobilization: this.reportForm.value.immobilization,
      serviceSeg: this.reportForm.value.serviceSeg,
      businessUnit: this.reportForm.value.businessUnit,
      assignedToId: this.reportForm.value.assignedUsers?.[0]?.userId
    };
    
    // Submit the form data
    this.reportService.createReport(reportRequest).subscribe({
      next: (response) => {
        console.log('Report created successfully', response);
        // Navigate to report list
        this.router.navigate(['../report-list'], { relativeTo: this.route });
      },
      error: (error) => {
        console.error('Error creating report', error);
        // In a real app, show error message to user
        alert('Error creating report. Please try again.');
      }
    });
  }

  resetForm(): void {
    this.submitted = false;
    this.reportForm.reset();
    
    // Reset default values
    this.reportForm.patchValue({
      immobilization: 'Yes'
    });
    
    // Clear and add a single user assignment
    this.assignedUsersControls.clear();
    this.addUserAssignment();
  }
} 