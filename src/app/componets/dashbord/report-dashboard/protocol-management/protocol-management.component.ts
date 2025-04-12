/**
 * Protocol Management Component
 * 
 * This component provides a complete interface for managing protocols in the system.
 * Features include:
 * - Viewing all protocols in a list
 * - Creating new protocols
 * - Editing existing protocols
 * - Deleting protocols
 * - Adding criteria to protocols
 */

import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../../../../shared/common/sharedmodule';
import { NgSelectModule } from '@ng-select/ng-select';
import { MaterialModuleModule } from '../../../../material-module/material-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { Protocol, SpecificControlCriteria } from '../../../../models/report.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReportService } from '../../../../services/report.service';
import { finalize, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-protocol-management',
  standalone: true,
  imports: [
    SharedModule,
    NgSelectModule,
    MaterialModuleModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    CommonModule
  ],
  template: `
    <div class="page-header">
      <div>
        <h2 class="page-title">Protocol Management</h2>
        <ol class="breadcrumb mb-0">
          <li class="breadcrumb-item">
            <a [routerLink]="['../../dashboard']">Dashboard</a>
          </li>
          <li class="breadcrumb-item">
            <a [routerLink]="['../report-list']">Report List</a>
          </li>
          <li class="breadcrumb-item active" aria-current="page">Protocol Management</li>
        </ol>
      </div>
      <div class="ms-auto pageheader-btn">
        <button class="btn btn-primary btn-icon text-white me-2" (click)="openProtocolModal()">
          <span>
            <i class="fe fe-plus"></i>
          </span> Create New Protocol
        </button>
      </div>
    </div>

    <!-- Alert for errors -->
    <div *ngIf="error" class="alert alert-danger alert-dismissible fade show" role="alert">
      {{ error }}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" (click)="clearError()"></button>
    </div>

    <!-- Success message -->
    <div *ngIf="successMessage" class="alert alert-success alert-dismissible fade show" role="alert">
      {{ successMessage }}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" (click)="clearSuccessMessage()"></button>
    </div>

    <!-- Loading state -->
    <div *ngIf="loading" class="text-center my-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <p class="mt-2">Loading protocols...</p>
    </div>

    <div class="card custom-card" *ngIf="!loading">
      <div class="card-header border-bottom">
        <h3 class="card-title">Protocols List</h3>
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col-md-12 col-xl-12">
            <div class="row mb-3">
              <div class="col-md-6">
                <div class="form-group">
                  <input type="text" class="form-control" id="search" placeholder="Search Protocols..."
                    (keyup)="applyFilter($event)">
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <select class="form-control" (change)="filterByType($event)">
                    <option value="all">All Protocol Types</option>
                    <option value="Homologation">Homologation</option>
                    <option value="Requalification">Requalification</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="table-responsive">
              <table class="table border table-bordered text-nowrap mb-0" mat-table [dataSource]="dataSource"
                matSort>

                <!-- ID Column -->
                <ng-container matColumnDef="id">
                  <th mat-header-cell *matHeaderCellDef mat-sort-header> ID </th>
                  <td mat-cell *matCellDef="let protocol"> {{protocol.id}} </td>
                </ng-container>

                <!-- Name Column -->
                <ng-container matColumnDef="name">
                  <th mat-header-cell *matHeaderCellDef mat-sort-header> Name </th>
                  <td mat-cell *matCellDef="let protocol"> {{protocol.name}} </td>
                </ng-container>

                <!-- Type Column -->
                <ng-container matColumnDef="type">
                  <th mat-header-cell *matHeaderCellDef mat-sort-header> Type </th>
                  <td mat-cell *matCellDef="let protocol">
                    <span class="badge bg-{{getTypeColor(protocol.protocolType)}} me-1 mb-1 mt-1">
                      {{protocol.protocolType}}
                    </span>
                  </td>
                </ng-container>

                <!-- Created By Column -->
                <ng-container matColumnDef="createdBy">
                  <th mat-header-cell *matHeaderCellDef mat-sort-header> Created By </th>
                  <td mat-cell *matCellDef="let protocol">
                    <div class="d-flex">
                      <span class="avatar avatar-md brround me-3"
                        style="background-image: url(./assets/images/users/1.jpg)"></span>
                      <div class="ms-2">
                        <h6 class="mb-0 text-dark">{{protocol.createdBy?.firstName}} {{protocol.createdBy?.lastName}}</h6>
                        <p class="text-muted mb-0">{{protocol.createdBy?.department?.name}}</p>
                      </div>
                    </div>
                  </td>
                </ng-container>

                <!-- Actions Column -->
                <ng-container matColumnDef="actions">
                  <th mat-header-cell *matHeaderCellDef> Actions </th>
                  <td mat-cell *matCellDef="let protocol">
                    <div class="d-flex">
                      <button class="btn btn-primary btn-sm me-2" (click)="editProtocol(protocol)" [disabled]="actionInProgress">
                        <i class="fe fe-edit"></i> Edit
                      </button>
                      <button class="btn btn-info btn-sm me-2" (click)="viewProtocol(protocol)" [disabled]="actionInProgress">
                        <i class="fe fe-eye"></i> View
                      </button>
                      <button class="btn btn-danger btn-sm" (click)="confirmDeleteProtocol(protocol)" [disabled]="actionInProgress">
                        <i class="fe fe-trash"></i> Delete
                      </button>
                    </div>
                  </td>
                </ng-container>

                <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
                <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>

                <!-- Row shown when there is no matching data. -->
                <tr class="mat-row" *matNoDataRow>
                  <td class="mat-cell text-center" colspan="5">No protocols found matching the filter</td>
                </tr>
              </table>
              <mat-paginator [pageSizeOptions]="[5, 10, 25, 100]" aria-label="Select page of protocols"></mat-paginator>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Protocol Modal -->
    <ng-template #protocolModal let-modal>
      <div class="modal-header">
        <h5 class="modal-title">{{ isEditing ? 'Edit Protocol' : 'Create New Protocol' }}</h5>
        <button type="button" class="btn-close" aria-label="Close" (click)="modal.dismiss('Cross click')"></button>
      </div>
      <div class="modal-body">
        <form [formGroup]="protocolForm">
          <div class="mb-3">
            <label for="protocolName" class="form-label">Protocol Name</label>
            <input type="text" class="form-control" id="protocolName" formControlName="name">
            <div *ngIf="protocolForm.get('name')?.invalid && protocolForm.get('name')?.touched" class="text-danger">
              Protocol name is required
            </div>
          </div>
          
          <div class="mb-3">
            <label for="protocolType" class="form-label">Protocol Type</label>
            <select class="form-control" id="protocolType" formControlName="protocolType">
              <option value="Homologation">Homologation</option>
              <option value="Requalification">Requalification</option>
            </select>
            <div *ngIf="protocolForm.get('protocolType')?.invalid && protocolForm.get('protocolType')?.touched" class="text-danger">
              Protocol type is required
            </div>
          </div>

          <div class="mb-3" *ngIf="isEditing">
            <div class="card">
              <div class="card-header d-flex justify-content-between align-items-center">
                <h5 class="card-title mb-0">Control Criteria</h5>
                <button type="button" class="btn btn-sm btn-primary" (click)="addCriteria()">
                  <i class="fe fe-plus"></i> Add Criteria
                </button>
              </div>
              <div class="card-body p-0">
                <div *ngIf="loadingCriteria" class="text-center py-4">
                  <div class="spinner-border spinner-border-sm text-primary" role="status">
                    <span class="visually-hidden">Loading criteria...</span>
                  </div>
                  <p class="mt-2 mb-0">Loading criteria...</p>
                </div>
                <ul class="list-group list-group-flush" *ngIf="!loadingCriteria">
                  <li class="list-group-item" *ngFor="let criteria of protocolCriteria; let i = index">
                    <div class="d-flex justify-content-between align-items-center">
                      <span>{{ criteria.description }}</span>
                      <button class="btn btn-sm btn-danger" (click)="removeCriteria(i)" [disabled]="savingCriteria">
                        <i class="fe fe-trash"></i>
                      </button>
                    </div>
                  </li>
                  <li class="list-group-item" *ngIf="protocolCriteria.length === 0">
                    <p class="text-muted mb-0">No criteria added yet</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <div *ngIf="formError" class="alert alert-danger w-100 mb-2">{{ formError }}</div>
        <button type="button" class="btn btn-secondary" (click)="modal.dismiss('Close click')" [disabled]="formSubmitting">Close</button>
        <button type="button" class="btn btn-primary" [disabled]="protocolForm.invalid || formSubmitting" (click)="saveProtocol()">
          <span *ngIf="formSubmitting" class="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>
          {{ isEditing ? 'Update' : 'Create' }} Protocol
        </button>
      </div>
    </ng-template>

    <!-- Criteria Modal -->
    <ng-template #criteriaModal let-modal>
      <div class="modal-header">
        <h5 class="modal-title">Add Control Criteria</h5>
        <button type="button" class="btn-close" aria-label="Close" (click)="modal.dismiss('Cross click')"></button>
      </div>
      <div class="modal-body">
        <form [formGroup]="criteriaForm">
          <div class="mb-3">
            <label for="criteriaDescription" class="form-label">Description</label>
            <textarea class="form-control" id="criteriaDescription" formControlName="description" rows="3"></textarea>
            <div *ngIf="criteriaForm.get('description')?.invalid && criteriaForm.get('description')?.touched" class="text-danger">
              Description is required
            </div>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <div *ngIf="criteriaError" class="alert alert-danger w-100 mb-2">{{ criteriaError }}</div>
        <button type="button" class="btn btn-secondary" (click)="modal.dismiss('Close click')" [disabled]="savingCriteria">Close</button>
        <button type="button" class="btn btn-primary" [disabled]="criteriaForm.invalid || savingCriteria" (click)="saveCriteria()">
          <span *ngIf="savingCriteria" class="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>
          Add Criteria
        </button>
      </div>
    </ng-template>

    <!-- Delete Confirmation Modal -->
    <ng-template #deleteConfirmModal let-modal>
      <div class="modal-header">
        <h5 class="modal-title">Confirm Delete</h5>
        <button type="button" class="btn-close" aria-label="Close" (click)="modal.dismiss('Cross click')"></button>
      </div>
      <div class="modal-body">
        <p>Are you sure you want to delete the protocol "{{ protocolToDelete?.name }}"?</p>
        <p class="text-danger">This action cannot be undone.</p>
      </div>
      <div class="modal-footer">
        <div *ngIf="deleteError" class="alert alert-danger w-100 mb-2">{{ deleteError }}</div>
        <button type="button" class="btn btn-secondary" (click)="modal.dismiss('Close click')" [disabled]="deletingProtocol">Cancel</button>
        <button type="button" class="btn btn-danger" [disabled]="deletingProtocol" (click)="deleteProtocol()">
          <span *ngIf="deletingProtocol" class="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>
          Delete Protocol
        </button>
      </div>
    </ng-template>
  `,
  styleUrls: ['./protocol-management.component.scss'],
  providers: [
    DatePipe
  ],
})
export class ProtocolManagementComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['id', 'name', 'type', 'createdBy', 'actions'];
  dataSource: MatTableDataSource<Protocol>;
  protocolForm: FormGroup;
  criteriaForm: FormGroup;
  
  // UI state
  isEditing = false;
  loading = false;
  actionInProgress = false;
  formSubmitting = false;
  loadingCriteria = false;
  savingCriteria = false;
  deletingProtocol = false;
  
  // Error and message handling
  error: string = '';
  formError: string = '';
  criteriaError: string = '';
  deleteError: string = '';
  successMessage: string = '';
  
  // Data
  selectedProtocol: Protocol | null = null;
  protocolToDelete: Protocol | null = null;
  protocolCriteria: SpecificControlCriteria[] = [];
  originalDataSource: Protocol[] = [];

  // Destroy subject for cleanup
  private destroy$ = new Subject<void>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('protocolModal') protocolModal: any;
  @ViewChild('criteriaModal') criteriaModal: any;
  @ViewChild('deleteConfirmModal') deleteConfirmModal: any;

  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private reportService: ReportService
  ) {
    this.dataSource = new MatTableDataSource<Protocol>([]);
    
    this.protocolForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      protocolType: ['Homologation', Validators.required]
    });

    this.criteriaForm = this.formBuilder.group({
      description: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(500)]]
    });
  }

  ngOnInit(): void {
    this.loadProtocols();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadProtocols(): void {
    this.loading = true;
    this.error = '';
    
    this.reportService.getAllProtocols()
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => this.loading = false)
      )
      .subscribe({
        next: (protocols) => {
          this.dataSource.data = protocols;
          this.originalDataSource = [...protocols];
        },
        error: (err) => {
          this.error = `Error loading protocols: ${err.message}`;
          console.error('Error loading protocols', err);
        }
      });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  filterByType(event: Event): void {
    const filterValue = (event.target as HTMLSelectElement).value;
    
    if (filterValue === 'all') {
      this.dataSource.data = this.originalDataSource;
    } else {
      this.dataSource.data = this.originalDataSource.filter(
        protocol => protocol.protocolType === filterValue
      );
    }

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openProtocolModal(): void {
    this.isEditing = false;
    this.selectedProtocol = null;
    this.protocolForm.reset({ protocolType: 'Homologation' });
    this.protocolCriteria = [];
    this.formError = '';
    this.modalService.open(this.protocolModal, { size: 'lg' });
  }

  editProtocol(protocol: Protocol): void {
    this.isEditing = true;
    this.selectedProtocol = protocol;
    this.formError = '';
    
    this.protocolForm.patchValue({
      name: protocol.name,
      protocolType: protocol.protocolType
    });
    
    this.loadProtocolCriteria(protocol.id);
    this.modalService.open(this.protocolModal, { size: 'lg' });
  }

  loadProtocolCriteria(protocolId: number): void {
    this.loadingCriteria = true;
    this.protocolCriteria = [];
    
    this.reportService.getProtocolCriteria(protocolId)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => this.loadingCriteria = false)
      )
      .subscribe({
        next: (criteria) => {
          this.protocolCriteria = criteria;
        },
        error: (err) => {
          this.formError = `Error loading criteria: ${err.message}`;
          console.error('Error loading protocol criteria', err);
        }
      });
  }

  viewProtocol(protocol: Protocol): void {
    this.selectedProtocol = protocol;
    this.isEditing = true;
    this.formError = '';
    
    // Make the form read-only by disabling all controls
    this.protocolForm.patchValue({
      name: protocol.name,
      protocolType: protocol.protocolType
    });
    this.protocolForm.disable();
    
    this.loadProtocolCriteria(protocol.id);
    this.modalService.open(this.protocolModal, { size: 'lg' });
  }

  confirmDeleteProtocol(protocol: Protocol): void {
    this.protocolToDelete = protocol;
    this.deleteError = '';
    this.modalService.open(this.deleteConfirmModal);
  }

  deleteProtocol(): void {
    if (!this.protocolToDelete) return;
    
    this.deletingProtocol = true;
    this.actionInProgress = true;
    
    this.reportService.deleteProtocol(this.protocolToDelete.id)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          this.deletingProtocol = false;
          this.actionInProgress = false;
        })
      )
      .subscribe({
        next: () => {
          this.dataSource.data = this.dataSource.data.filter(
            protocol => protocol.id !== this.protocolToDelete!.id
          );
          this.originalDataSource = this.originalDataSource.filter(
            protocol => protocol.id !== this.protocolToDelete!.id
          );
          this.modalService.dismissAll();
          this.successMessage = `Protocol "${this.protocolToDelete!.name}" deleted successfully.`;
          this.protocolToDelete = null;
        },
        error: (err) => {
          this.deleteError = err.message;
          console.error('Error deleting protocol', err);
        }
      });
  }

  saveProtocol(): void {
    if (this.protocolForm.invalid) {
      this.protocolForm.markAllAsTouched();
      return;
    }

    this.formSubmitting = true;
    this.formError = '';
    this.actionInProgress = true;
    
    const protocolData = this.protocolForm.value;
    
    if (this.isEditing && this.selectedProtocol) {
      // Update existing protocol
      const updatedProtocol = {
        ...this.selectedProtocol,
        name: protocolData.name,
        protocolType: protocolData.protocolType
      };
      
      this.reportService.updateProtocol(updatedProtocol)
        .pipe(
          takeUntil(this.destroy$),
          finalize(() => {
            this.formSubmitting = false;
            this.actionInProgress = false;
          })
        )
        .subscribe({
          next: (updatedProtocol) => {
            const index = this.dataSource.data.findIndex(p => p.id === this.selectedProtocol!.id);
            if (index !== -1) {
              const data = [...this.dataSource.data];
              data[index] = updatedProtocol;
              this.dataSource.data = data;
              this.originalDataSource = [...data];
            }
            this.modalService.dismissAll();
            this.successMessage = `Protocol "${updatedProtocol.name}" updated successfully.`;
          },
          error: (err) => {
            this.formError = err.message;
            console.error('Error updating protocol', err);
          }
        });
    } else {
      // Create new protocol
      this.reportService.createProtocol(protocolData)
        .pipe(
          takeUntil(this.destroy$),
          finalize(() => {
            this.formSubmitting = false;
            this.actionInProgress = false;
          })
        )
        .subscribe({
          next: (newProtocol) => {
            this.dataSource.data = [...this.dataSource.data, newProtocol];
            this.originalDataSource = [...this.dataSource.data];
            this.modalService.dismissAll();
            this.successMessage = `Protocol "${newProtocol.name}" created successfully.`;
          },
          error: (err) => {
            this.formError = err.message;
            console.error('Error creating protocol', err);
          }
        });
    }
  }

  addCriteria(): void {
    if (!this.selectedProtocol) return;
    
    this.criteriaForm.reset();
    this.criteriaError = '';
    this.modalService.open(this.criteriaModal);
  }

  saveCriteria(): void {
    if (this.criteriaForm.invalid || !this.selectedProtocol) {
      this.criteriaForm.markAllAsTouched();
      return;
    }

    this.savingCriteria = true;
    this.criteriaError = '';
    
    const criteriaData = {
      description: this.criteriaForm.get('description')?.value
    };

    this.reportService.addCriteriaToProtocol(this.selectedProtocol.id, criteriaData)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => this.savingCriteria = false)
      )
      .subscribe({
        next: (newCriteria) => {
          this.protocolCriteria = [...this.protocolCriteria, newCriteria];
          this.modalService.dismissAll();
        },
        error: (err) => {
          this.criteriaError = err.message;
          console.error('Error adding criteria', err);
        }
      });
  }

  removeCriteria(index: number): void {
    if (!this.selectedProtocol) return;
    
    const criteriaToRemove = this.protocolCriteria[index];
    
    this.savingCriteria = true;
    
    this.reportService.deleteCriteria(this.selectedProtocol.id, criteriaToRemove.id)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => this.savingCriteria = false)
      )
      .subscribe({
        next: () => {
          this.protocolCriteria.splice(index, 1);
          this.protocolCriteria = [...this.protocolCriteria];
        },
        error: (err) => {
          this.formError = `Error removing criteria: ${err.message}`;
          console.error('Error removing criteria', err);
        }
      });
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
  
  clearSuccessMessage(): void {
    this.successMessage = '';
  }
} 