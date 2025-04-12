import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule, FormArray } from '@angular/forms';
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
import { finalize, Subject, takeUntil } from 'rxjs';

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

    <!-- Alert for errors -->
    <div *ngIf="error" class="alert alert-danger alert-dismissible fade show" role="alert">
      {{ error }}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" (click)="clearError()"></button>
    </div>

    <div class="row">
      <div class="col-xl-12 col-md-12 col-lg-12">
        <div class="card custom-card">
          <div class="card-header border-bottom">
            <h3 class="card-title">New Report Details</h3>
          </div>
          <div class="card-body">
            <!-- Protocol Selection Step -->
            <div *ngIf="currentStep === 1">
              <h4 class="mb-4">Step 1: Select Protocol</h4>
              
              <!-- Loading state -->
              <div *ngIf="loadingProtocols" class="text-center my-5">
                <div class="spinner-border text-primary" role="status">
                  <span class="visually-hidden">Loading protocols...</span>
                </div>
                <p class="mt-2">Loading available protocols...</p>
              </div>
              
              <div *ngIf="!loadingProtocols">
                <div class="mb-4">
                  <div class="form-group">
                    <label class="form-label">Filter by Protocol Type</label>
                    <div class="btn-group w-100" role="group">
                      <button type="button" class="btn" [class.btn-primary]="protocolTypeFilter === 'all'" 
                              [class.btn-outline-primary]="protocolTypeFilter !== 'all'"
                              (click)="filterProtocolsByType('all')">
                        All Types
                      </button>
                      <button type="button" class="btn" [class.btn-primary]="protocolTypeFilter === 'Homologation'" 
                              [class.btn-outline-primary]="protocolTypeFilter !== 'Homologation'"
                              (click)="filterProtocolsByType('Homologation')">
                        Homologation
                      </button>
                      <button type="button" class="btn" [class.btn-primary]="protocolTypeFilter === 'Requalification'" 
                              [class.btn-outline-primary]="protocolTypeFilter !== 'Requalification'"
                              (click)="filterProtocolsByType('Requalification')">
                        Requalification
                      </button>
                    </div>
                  </div>
                </div>
                
                <div *ngIf="filteredProtocols.length === 0" class="alert alert-info">
                  No protocols found for the selected type. Please create a protocol first.
                </div>
                
                <div class="row" *ngIf="filteredProtocols.length > 0">
                  <div class="col-md-12">
                    <div class="table-responsive">
                      <table class="table border text-nowrap">
                        <thead>
                          <tr>
                            <th>Select</th>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Created By</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr *ngFor="let protocol of filteredProtocols">
                            <td>
                              <div class="form-check">
                                <input class="form-check-input" type="radio" name="selectedProtocol" 
                                       [value]="protocol.id"
                                       [checked]="selectedProtocolId === protocol.id"
                                       (change)="selectProtocol(protocol)">
                              </div>
                            </td>
                            <td>{{protocol.name}}</td>
                            <td>
                              <span class="badge bg-{{getTypeColor(protocol.protocolType)}}">
                                {{protocol.protocolType}}
                              </span>
                            </td>
                            <td>{{protocol.createdBy && protocol.createdBy.firstName}} {{protocol.createdBy && protocol.createdBy.lastName}}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                
                <div class="d-flex justify-content-between mt-4">
                  <button type="button" class="btn btn-outline-secondary" (click)="refreshProtocols()">
                    <i class="fe fe-refresh-cw me-1"></i> Refresh Protocols
                  </button>
                  <button type="button" class="btn btn-primary" [disabled]="!selectedProtocolId" (click)="nextStep()">
                    Next <i class="fe fe-arrow-right ms-1"></i>
                  </button>
                </div>
              </div>
            </div>
            
            <!-- Report Details Step -->
            <div *ngIf="currentStep === 2">
              <h4 class="mb-4">Step 2: Enter Report Details</h4>
              
              <div *ngIf="selectedProtocol" class="mb-4">
                <div class="alert alert-info">
                  <strong>Selected Protocol:</strong> {{selectedProtocol.name}} 
                  <span class="badge bg-{{getTypeColor(selectedProtocol.protocolType)}} ms-2">
                    {{selectedProtocol.protocolType}}
                  </span>
                </div>
              </div>
              
              <form [formGroup]="reportForm" (ngSubmit)="onSubmit()">
                <div class="row">
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
                  
                  <div class="col-md-6 mb-3">
                    <label for="serialNumber" class="form-label">Serial Number <span class="text-danger">*</span></label>
                    <input type="text" class="form-control" id="serialNumber" formControlName="serialNumber" placeholder="Enter serial number">
                    <div *ngIf="submitted && f['serialNumber'].errors" class="invalid-feedback d-block">
                      <div *ngIf="f['serialNumber'].errors['required']">Serial number is required</div>
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-6 mb-3">
                    <label for="designation" class="form-label">Designation <span class="text-danger">*</span></label>
                    <input type="text" class="form-control" id="designation" formControlName="designation" placeholder="Enter designation">
                    <div *ngIf="submitted && f['designation'].errors" class="invalid-feedback d-block">
                      <div *ngIf="f['designation'].errors['required']">Designation is required</div>
                    </div>
                  </div>

                  <div class="col-md-6 mb-3">
                    <label for="manufacturer" class="form-label">Manufacturer <span class="text-danger">*</span></label>
                    <input type="text" class="form-control" id="manufacturer" formControlName="manufacturer" placeholder="Enter manufacturer">
                    <div *ngIf="submitted && f['manufacturer'].errors" class="invalid-feedback d-block">
                      <div *ngIf="f['manufacturer'].errors['required']">Manufacturer is required</div>
                    </div>
                  </div>
                </div>

                <div class="row">
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
                  
                  <div class="col-md-6 mb-3">
                    <label for="businessUnit" class="form-label">Business Unit <span class="text-danger">*</span></label>
                    <input type="text" class="form-control" id="businessUnit" formControlName="businessUnit" placeholder="Enter business unit">
                    <div *ngIf="submitted && f['businessUnit'].errors" class="invalid-feedback d-block">
                      <div *ngIf="f['businessUnit'].errors['required']">Business unit is required</div>
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
                  
                  <div class="col-md-6">
                    <!-- Empty column to balance layout -->
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

                <hr />
                
                <!-- Protocol-specific fields section -->
                <div *ngIf="selectedProtocol?.protocolType === 'Homologation'" class="mb-4">
                  <h5>Homologation Specific Details</h5>
                  <div class="row">
                    <!-- Add homologation-specific fields here -->
                    <div class="col-md-6 mb-3">
                      <label class="form-label">Initial Verification Date</label>
                      <input type="date" class="form-control" formControlName="initialVerificationDate">
                    </div>
                    
                    <div class="col-md-6 mb-3">
                      <label class="form-label">Equipment Category</label>
                      <select class="form-select" formControlName="equipmentCategory">
                        <option value="">Select category</option>
                        <option value="Electrical">Electrical</option>
                        <option value="Mechanical">Mechanical</option>
                        <option value="Hydraulic">Hydraulic</option>
                        <option value="Pneumatic">Pneumatic</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                <div *ngIf="selectedProtocol?.protocolType === 'Requalification'" class="mb-4">
                  <h5>Requalification Specific Details</h5>
                  <div class="row">
                    <!-- Add requalification-specific fields here -->
                    <div class="col-md-6 mb-3">
                      <label class="form-label">Last Qualification Date</label>
                      <input type="date" class="form-control" formControlName="lastQualificationDate">
                    </div>
                    
                    <div class="col-md-6 mb-3">
                      <label class="form-label">Maintenance Frequency (months)</label>
                      <select class="form-select" formControlName="maintenanceFrequency">
                        <option value="">Select frequency</option>
                        <option value="3">3 months</option>
                        <option value="6">6 months</option>
                        <option value="12">12 months</option>
                        <option value="24">24 months</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                <hr />
                
                <div class="row">
                  <div class="col-md-12 mb-3">
                    <h5>User Assignments</h5>
                    <p class="text-muted">Assign users to departments for this report.</p>
                    
                    <div class="mb-3">
                      <button type="button" class="btn btn-outline-primary" (click)="addUserAssignment()">
                        <i class="fe fe-user-plus me-1"></i> Add User Assignment
                      </button>
                    </div>
                    
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
                    
                    <div *ngIf="assignedUsersControls.controls.length === 0" class="alert alert-warning">
                      <i class="fe fe-alert-triangle me-1"></i> No users assigned yet. Please add at least one user assignment.
                    </div>
                  </div>
                </div>

                <div class="d-flex justify-content-between mt-4">
                  <button type="button" class="btn btn-outline-secondary" (click)="previousStep()">
                    <i class="fe fe-arrow-left me-1"></i> Back
                  </button>
                  <div>
                    <button type="button" class="btn btn-outline-secondary me-2" (click)="resetForm()">
                      <i class="fe fe-refresh-cw me-1"></i> Reset
                    </button>
                    <button type="submit" class="btn btn-primary" [disabled]="loading">
                      <span *ngIf="loading" class="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>
                      Create Report
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .badge {
      font-size: 0.8rem;
    }
  `]
})
export class NewReportComponent implements OnInit, OnDestroy {
  reportForm: FormGroup;
  submitted = false;
  loading = false;
  loadingProtocols = false;
  error = '';
  
  // Multi-step form
  currentStep = 1;
  
  // Protocol data
  protocols: Protocol[] = [];
  filteredProtocols: Protocol[] = [];
  selectedProtocolId: number | null = null;
  selectedProtocol: Protocol | null = null;
  protocolTypeFilter = 'all';
  
  // Field visibility flags
  showHomologationFields = false;
  showRequalificationFields = false;
  
  // Report types and department data
  reportTypes = [
    'Maintenance',
    'Inspection',
    'Repair',
    'Replacement'
  ];
  
  // Mock departments and users (replace with API calls in real implementation)
  departments = [
    { id: 1, name: 'Engineering' },
    { id: 2, name: 'Maintenance' },
    { id: 3, name: 'Quality Control' }
  ];
  
  users = [
    { id: 1, fullName: 'John Doe', departmentId: 1 },
    { id: 2, fullName: 'Jane Smith', departmentId: 1 },
    { id: 3, fullName: 'Michael Johnson', departmentId: 2 },
    { id: 4, fullName: 'Sarah Williams', departmentId: 2 },
    { id: 5, fullName: 'Robert Brown', departmentId: 3 },
    { id: 6, fullName: 'Emily Davis', departmentId: 3 }
  ];
  
  // Cleanup
  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private reportService: ReportService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.reportForm = this.fb.group({
      protocolId: [null, Validators.required],
      type: ['', Validators.required],
      serialNumber: ['', Validators.required],
      designation: ['', Validators.required],
      manufacturer: ['', Validators.required],
      immobilization: ['Yes', Validators.required],
      equipmentDescription: ['', Validators.required],
      serviceSeg: ['', Validators.required],
      businessUnit: ['', Validators.required],
      assignedUsers: this.fb.array([]),
      
      // Conditionally required fields based on protocol type
      initialVerificationDate: [''],
      equipmentCategory: [''],
      lastQualificationDate: [''],
      maintenanceFrequency: ['']
    });
  }

  ngOnInit(): void {
    this.loadProtocols();
    
    // Initialize with first user assignment
    this.addUserAssignment();
  }
  
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadProtocols(): void {
    this.loadingProtocols = true;
    this.error = '';
    
    this.reportService.getAllProtocols()
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => this.loadingProtocols = false)
      )
      .subscribe({
        next: (protocols) => {
          this.protocols = protocols;
          this.filterProtocolsByType(this.protocolTypeFilter);
        },
        error: (err) => {
          this.error = `Error loading protocols: ${err.message}`;
          console.error('Error loading protocols', err);
        }
      });
  }
  
  filterProtocolsByType(type: string): void {
    this.protocolTypeFilter = type;
    
    if (type === 'all') {
      this.filteredProtocols = [...this.protocols];
    } else {
      this.filteredProtocols = this.protocols.filter(
        protocol => protocol.protocolType === type
      );
    }
  }

  refreshProtocols(): void {
    this.loadProtocols();
  }
  
  selectProtocol(protocol: Protocol): void {
    this.selectedProtocolId = protocol.id;
    this.selectedProtocol = protocol;
  }
  
  nextStep(): void {
    if (this.currentStep === 1 && this.selectedProtocolId) {
      this.currentStep = 2;
      
      // Set the protocol ID in the form
      this.reportForm.patchValue({
        protocolId: this.selectedProtocolId
      });
      
      // Add conditional validators based on protocol type
      if (this.selectedProtocol?.protocolType === 'Homologation') {
        this.reportForm.get('initialVerificationDate')?.setValidators(Validators.required);
        this.reportForm.get('equipmentCategory')?.setValidators(Validators.required);
        
        // Clear requalification fields
        this.reportForm.get('lastQualificationDate')?.clearValidators();
        this.reportForm.get('maintenanceFrequency')?.clearValidators();
      } else if (this.selectedProtocol?.protocolType === 'Requalification') {
        this.reportForm.get('lastQualificationDate')?.setValidators(Validators.required);
        this.reportForm.get('maintenanceFrequency')?.setValidators(Validators.required);
        
        // Clear homologation fields
        this.reportForm.get('initialVerificationDate')?.clearValidators();
        this.reportForm.get('equipmentCategory')?.clearValidators();
      }
      
      // Update form validation
      this.reportForm.get('initialVerificationDate')?.updateValueAndValidity();
      this.reportForm.get('equipmentCategory')?.updateValueAndValidity();
      this.reportForm.get('lastQualificationDate')?.updateValueAndValidity();
      this.reportForm.get('maintenanceFrequency')?.updateValueAndValidity();
    }
  }
  
  previousStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  get f() { return this.reportForm.controls; }

  get assignedUsersControls() { return this.f['assignedUsers'] as FormArray; }

  getUsersByDepartment(departmentId: number): any[] {
    if (!departmentId) return [];
    return this.users.filter(user => user.departmentId === departmentId);
  }

  addUserAssignment(): void {
    const userAssignment = this.fb.group({
      departmentId: [null, Validators.required],
      userId: [null, Validators.required]
    });
    
    this.assignedUsersControls.push(userAssignment);
  }

  removeUserAssignment(index: number): void {
    this.assignedUsersControls.removeAt(index);
  }

  onSubmit(): void {
    this.submitted = true;
    
    if (this.reportForm.invalid) {
      // Mark all fields as touched to trigger validation messages
      Object.keys(this.reportForm.controls).forEach(key => {
        const control = this.reportForm.get(key);
        control?.markAsTouched();
      });
      
      return;
    }
    
    this.loading = true;
    this.error = '';
    
    // Prepare user assignments
    const assignedUsers: UserAssignmentDTO[] = this.assignedUsersControls.controls.map(
      control => ({
        departmentId: control.get('departmentId')?.value,
        userId: control.get('userId')?.value
      })
    );
    
    // Prepare request data
    const reportRequest: ReportCreationRequest = {
      protocolId: this.reportForm.get('protocolId')?.value,
      type: this.reportForm.get('type')?.value,
      serialNumber: this.reportForm.get('serialNumber')?.value,
      designation: this.reportForm.get('designation')?.value,
      manufacturer: this.reportForm.get('manufacturer')?.value,
      immobilization: this.reportForm.get('immobilization')?.value,
      equipmentDescription: this.reportForm.get('equipmentDescription')?.value,
      serviceSeg: this.reportForm.get('serviceSeg')?.value,
      businessUnit: this.reportForm.get('businessUnit')?.value,
      assignedUsers: assignedUsers
    };
    
    // Add protocol type specific fields
    if (this.selectedProtocol?.protocolType === 'Homologation') {
      reportRequest.initialVerificationDate = this.reportForm.get('initialVerificationDate')?.value;
      reportRequest.equipmentCategory = this.reportForm.get('equipmentCategory')?.value;
    } else if (this.selectedProtocol?.protocolType === 'Requalification') {
      reportRequest.lastQualificationDate = this.reportForm.get('lastQualificationDate')?.value;
      reportRequest.maintenanceFrequency = this.reportForm.get('maintenanceFrequency')?.value;
    }
    
    this.reportService.createReport(reportRequest)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => this.loading = false)
      )
      .subscribe({
        next: (response) => {
          // Navigate to the report view page
          this.router.navigate(['../report-list'], { relativeTo: this.route });
        },
        error: (err) => {
          this.error = `Error creating report: ${err.message}`;
          console.error('Error creating report', err);
        }
      });
  }

  resetForm(): void {
    this.submitted = false;
    this.reportForm.reset({
      protocolId: this.selectedProtocolId,
      immobilization: 'Yes'
    });
    
    // Reset the assigned users array
    while (this.assignedUsersControls.length !== 0) {
      this.assignedUsersControls.removeAt(0);
    }
    
    // Add back one empty user assignment
    this.addUserAssignment();
  }
  
  getTypeColor(type: string): string {
    switch (type) {
      case 'Homologation':
        return 'primary';
      case 'Requalification':
        return 'success';
      default:
        return 'info';
    }
  }
  
  clearError(): void {
    this.error = '';
  }

  // Fix optional chaining that TypeScript says is unnecessary
  onProtocolChange(protocol: Protocol): void {
    if (!protocol) return;
    // Replace unnecessary optional chaining with standard property access
    if (protocol.protocolType === 'Homologation') {
      this.showHomologationFields = true;
      this.showRequalificationFields = false;
    } else if (protocol.protocolType === 'Requalification') {
      this.showHomologationFields = false;
      this.showRequalificationFields = true;
    } else {
      this.showHomologationFields = false;
      this.showRequalificationFields = false;
    }
  }
} 