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
import { Protocol, SpecificControlCriteria, StandardControlCriteria, Department } from '../../../../models/report.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReportService } from '../../../../services/report.service';
import { finalize, Subject, takeUntil } from 'rxjs';
import { ProtocolService } from '../../../../services/protocol.service';
import { JoinNamesPipe } from '../../../../shared/pipes/join-names.pipe';

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
    CommonModule,
    JoinNamesPipe
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

                <!-- Standard Criteria Count Column -->
                <ng-container matColumnDef="standardCriteriaCount">
                  <th mat-header-cell *matHeaderCellDef mat-sort-header> Standard Criteria Count </th>
                  <td mat-cell *matCellDef="let protocol"> {{protocol.standardCriteriaCount}} </td>
                </ng-container>

                <!-- Specific Criteria Count Column -->
                <ng-container matColumnDef="specificCriteriaCount">
                  <th mat-header-cell *matHeaderCellDef mat-sort-header> Specific Criteria Count </th>
                  <td mat-cell *matCellDef="let protocol"> {{protocol.specificCriteriaCount}} </td>
                </ng-container>

                <!-- Actions Column -->
                <ng-container matColumnDef="actions">
                  <th mat-header-cell *matHeaderCellDef> Actions </th>
                  <td mat-cell *matCellDef="let protocol">
                    <div class="d-flex flex-wrap">
                      <button class="btn btn-primary btn-sm me-2 mb-1" (click)="editProtocol(protocol)" [disabled]="actionInProgress">
                        <i class="fe fe-edit"></i> Edit
                      </button>
                      <button class="btn btn-info btn-sm me-2 mb-1" (click)="viewProtocol(protocol)" [disabled]="actionInProgress">
                        <i class="fe fe-eye"></i> View
                      </button>
                      <button class="btn btn-success btn-sm me-2 mb-1" (click)="openStandardCriteriaDialog(protocol)" [disabled]="actionInProgress">
                        <i class="fe fe-list"></i> Add Standard Criteria
                      </button>
                      <button class="btn btn-warning btn-sm me-2 mb-1" (click)="openSpecificCriteriaDialog(protocol)" [disabled]="actionInProgress">
                        <i class="fe fe-list-check"></i> Add Specific Criteria
                      </button>
                      <button class="btn btn-secondary btn-sm me-2 mb-1" (click)="viewAllCriteria(protocol)" [disabled]="actionInProgress">
                        <i class="fe fe-eye"></i> View All Criteria
                      </button>
                      <button class="btn btn-danger btn-sm mb-1" (click)="confirmDeleteProtocol(protocol)" [disabled]="actionInProgress">
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

    <!-- Standard Criteria Modal -->
    <ng-template #standardCriteriaModal let-modal>
      <div class="modal-header">
        <h5 class="modal-title">Add Standard Criteria</h5>
        <button type="button" class="btn-close" aria-label="Close" (click)="modal.dismiss('Cross click')"></button>
      </div>
      <div class="modal-body">
        <form [formGroup]="standardCriteriaForm">
          <div class="mb-3">
            <label for="description" class="form-label">Description</label>
            <textarea class="form-control" id="description" formControlName="description" rows="3"></textarea>
            <div *ngIf="standardCriteriaForm.get('description')?.invalid && standardCriteriaForm.get('description')?.touched" class="text-danger">
              Description is required
            </div>
          </div>
          
          <div class="mb-3">
            <label for="implementationDepartmentId" class="form-label">Implementation Department</label>
            <select class="form-control" id="implementationDepartmentId" formControlName="implementationDepartmentId">
              <option value="">Select Department</option>
              <option *ngFor="let dept of departments" [value]="dept.id">{{dept.name}}</option>
            </select>
            <div *ngIf="standardCriteriaForm.get('implementationDepartmentId')?.invalid && standardCriteriaForm.get('implementationDepartmentId')?.touched" class="text-danger">
              Implementation department is required
            </div>
          </div>

          <div class="mb-3">
            <label for="checkDepartmentId" class="form-label">Check Department</label>
            <select class="form-control" id="checkDepartmentId" formControlName="checkDepartmentId">
              <option value="">Select Department</option>
              <option *ngFor="let dept of departments" [value]="dept.id">{{dept.name}}</option>
            </select>
            <div *ngIf="standardCriteriaForm.get('checkDepartmentId')?.invalid && standardCriteriaForm.get('checkDepartmentId')?.touched" class="text-danger">
              Check department is required
            </div>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <div *ngIf="standardCriteriaError" class="alert alert-danger w-100 mb-2">{{ standardCriteriaError }}</div>
        <button type="button" class="btn btn-secondary" (click)="modal.dismiss('Close click')" [disabled]="addingStandardCriteria">Cancel</button>
        <button type="button" class="btn btn-primary" [disabled]="standardCriteriaForm.invalid || addingStandardCriteria" (click)="saveStandardCriteria()">
          <span *ngIf="addingStandardCriteria" class="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>
          Add Standard Criteria
        </button>
      </div>
    </ng-template>

    <!-- Specific Criteria Modal -->
    <ng-template #specificCriteriaModal let-modal>
      <div class="modal-header">
        <h5 class="modal-title">Add Specific Criteria</h5>
        <button type="button" class="btn-close" aria-label="Close" (click)="modal.dismiss('Cross click')"></button>
      </div>
      <div class="modal-body">
        <form [formGroup]="specificCriteriaForm">
          <div class="mb-3">
            <label for="specificDescription" class="form-label">Description</label>
            <textarea class="form-control" id="specificDescription" formControlName="description" rows="3"></textarea>
            <div *ngIf="specificCriteriaForm.get('description')?.invalid && specificCriteriaForm.get('description')?.touched" class="text-danger">
              Description is required
            </div>
          </div>
          
          <div class="mb-3">
            <label class="form-label">Implementation Departments</label>
            <ng-select 
              [items]="departments"
              bindLabel="name"
              bindValue="id"
              [multiple]="true"
              placeholder="Select departments"
              formControlName="implementationDepartmentIds">
            </ng-select>
            <div *ngIf="specificCriteriaForm.get('implementationDepartmentIds')?.invalid && specificCriteriaForm.get('implementationDepartmentIds')?.touched" class="text-danger">
              At least one implementation department is required
            </div>
          </div>

          <div class="mb-3">
            <label class="form-label">Check Departments</label>
            <ng-select 
              [items]="departments"
              bindLabel="name"
              bindValue="id"
              [multiple]="true"
              placeholder="Select departments"
              formControlName="checkDepartmentIds">
            </ng-select>
            <div *ngIf="specificCriteriaForm.get('checkDepartmentIds')?.invalid && specificCriteriaForm.get('checkDepartmentIds')?.touched" class="text-danger">
              At least one check department is required
            </div>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <div *ngIf="specificCriteriaError" class="alert alert-danger w-100 mb-2">{{ specificCriteriaError }}</div>
        <button type="button" class="btn btn-secondary" (click)="modal.dismiss('Close click')" [disabled]="addingSpecificCriteria">Cancel</button>
        <button type="button" class="btn btn-primary" [disabled]="specificCriteriaForm.invalid || addingSpecificCriteria" (click)="saveSpecificCriteria()">
          <span *ngIf="addingSpecificCriteria" class="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>
          Add Specific Criteria
        </button>
      </div>
    </ng-template>

    <!-- Display Criteria Modal -->
    <ng-template #displayCriteriaModal let-modal>
      <div class="modal-header">
        <h5 class="modal-title">Criteria for {{ selectedProtocol?.name }}</h5>
        <button type="button" class="btn-close" aria-label="Close" (click)="modal.dismiss('Cross click')"></button>
      </div>
      <div class="modal-body">
        <div *ngIf="loadingAllCriteria" class="text-center py-4">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading criteria...</span>
          </div>
          <p class="mt-2">Loading criteria...</p>
        </div>

        <div *ngIf="!loadingAllCriteria">
          <!-- Standard Criteria Section -->
          <div class="mb-4">
            <h5 class="border-bottom pb-2">Standard Criteria</h5>
            <div *ngIf="standardCriteria.length === 0" class="text-muted">No standard criteria found</div>
            <ul class="list-group" *ngIf="standardCriteria.length > 0">
              <li *ngFor="let criteria of standardCriteria; let i = index" class="list-group-item">
                <p class="mb-1"><strong>{{ criteria.description }}</strong></p>
                <p class="mb-1 small">Implementation: <span class="badge bg-info">{{ getDepartmentName(criteria.implementationResponsible.id) }}</span></p>
                <p class="mb-0 small">Check: <span class="badge bg-success">{{ getDepartmentName(criteria.checkResponsible.id) }}</span></p>
                <div class="mt-2">
                  <button class="btn btn-primary btn-sm me-2" (click)="editStandardCriteria(criteria)">
                    <i class="fe fe-edit"></i> Edit
                  </button>
                  <button class="btn btn-danger btn-sm" (click)="deleteStandardCriteria(criteria.id)">
                    <i class="fe fe-trash"></i> Delete
                  </button>
                </div>
              </li>
            </ul>
          </div>

          <!-- Specific Criteria Section -->
          <div>
            <h5 class="border-bottom pb-2">Specific Criteria</h5>
            <div *ngIf="specificCriteria.length === 0" class="text-muted">No specific criteria found</div>
            <ul class="list-group" *ngIf="specificCriteria.length > 0">
              <li *ngFor="let criteria of specificCriteria; let i = index" class="list-group-item">
                <p class="mb-1"><strong>{{ criteria.description }}</strong></p>
                <p class="mb-1 small">Implementation: 
                  <span class="badge bg-info me-1">
                    {{ criteria.implementationResponsible | joinNames:'name' }}
                  </span>
                </p>
                <p class="mb-0 small">Check: 
                  <span class="badge bg-success me-1">
                    {{ criteria.checkResponsible | joinNames:'name' }}
                  </span>
                </p>
                <div class="mt-2">
                  <button class="btn btn-primary btn-sm me-2" (click)="editSpecificCriteria(criteria)">
                    <i class="fe fe-edit"></i> Edit
                  </button>
                  <button class="btn btn-danger btn-sm" (click)="deleteSpecificCriteria(criteria.id)">
                    <i class="fe fe-trash"></i> Delete
                  </button>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" (click)="modal.dismiss('Close click')">Close</button>
      </div>
    </ng-template>

    <!-- Standard Criteria Edit Modal -->
    <ng-template #standardCriteriaEditModal let-modal>
      <div class="modal-header">
        <h5 class="modal-title">Edit Standard Criteria</h5>
        <button type="button" class="btn-close" aria-label="Close" (click)="modal.dismiss('Cross click')"></button>
      </div>
      <div class="modal-body">
        <form [formGroup]="standardCriteriaEditForm">
          <div class="mb-3">
            <label for="editDescription" class="form-label">Description</label>
            <textarea class="form-control" id="editDescription" formControlName="description" rows="3"></textarea>
            <div *ngIf="standardCriteriaEditForm.get('description')?.invalid && standardCriteriaEditForm.get('description')?.touched" class="text-danger">
              Description is required
            </div>
          </div>
          
          <div class="mb-3">
            <label for="editImplementationDepartmentId" class="form-label">Implementation Department</label>
            <select class="form-control" id="editImplementationDepartmentId" formControlName="implementationDepartmentId">
              <option value="">Select Department</option>
              <option *ngFor="let dept of departments" [value]="dept.id">{{dept.name}}</option>
            </select>
            <div *ngIf="standardCriteriaEditForm.get('implementationDepartmentId')?.invalid && standardCriteriaEditForm.get('implementationDepartmentId')?.touched" class="text-danger">
              Implementation department is required
            </div>
          </div>

          <div class="mb-3">
            <label for="editCheckDepartmentId" class="form-label">Check Department</label>
            <select class="form-control" id="editCheckDepartmentId" formControlName="checkDepartmentId">
              <option value="">Select Department</option>
              <option *ngFor="let dept of departments" [value]="dept.id">{{dept.name}}</option>
            </select>
            <div *ngIf="standardCriteriaEditForm.get('checkDepartmentId')?.invalid && standardCriteriaEditForm.get('checkDepartmentId')?.touched" class="text-danger">
              Check department is required
            </div>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <div *ngIf="standardCriteriaEditError" class="alert alert-danger w-100 mb-2">{{ standardCriteriaEditError }}</div>
        <button type="button" class="btn btn-secondary" (click)="modal.dismiss('Close click')" [disabled]="updatingStandardCriteria">Cancel</button>
        <button type="button" class="btn btn-primary" [disabled]="standardCriteriaEditForm.invalid || updatingStandardCriteria" (click)="updateStandardCriteria()">
          <span *ngIf="updatingStandardCriteria" class="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>
          Update Standard Criteria
        </button>
      </div>
    </ng-template>

    <!-- Specific Criteria Edit Modal -->
    <ng-template #specificCriteriaEditModal let-modal>
      <div class="modal-header">
        <h5 class="modal-title">Edit Specific Criteria</h5>
        <button type="button" class="btn-close" aria-label="Close" (click)="modal.dismiss('Cross click')"></button>
      </div>
      <div class="modal-body">
        <form [formGroup]="specificCriteriaEditForm">
          <div class="mb-3">
            <label for="editSpecificDescription" class="form-label">Description</label>
            <textarea class="form-control" id="editSpecificDescription" formControlName="description" rows="3"></textarea>
            <div *ngIf="specificCriteriaEditForm.get('description')?.invalid && specificCriteriaEditForm.get('description')?.touched" class="text-danger">
              Description is required
            </div>
          </div>
          
          <div class="mb-3">
            <label class="form-label">Implementation Departments</label>
            <ng-select 
              [items]="departments"
              bindLabel="name"
              bindValue="id"
              [multiple]="true"
              placeholder="Select departments"
              formControlName="implementationDepartmentIds">
            </ng-select>
            <div *ngIf="specificCriteriaEditForm.get('implementationDepartmentIds')?.invalid && specificCriteriaEditForm.get('implementationDepartmentIds')?.touched" class="text-danger">
              At least one implementation department is required
            </div>
          </div>

          <div class="mb-3">
            <label class="form-label">Check Departments</label>
            <ng-select 
              [items]="departments"
              bindLabel="name"
              bindValue="id"
              [multiple]="true"
              placeholder="Select departments"
              formControlName="checkDepartmentIds">
            </ng-select>
            <div *ngIf="specificCriteriaEditForm.get('checkDepartmentIds')?.invalid && specificCriteriaEditForm.get('checkDepartmentIds')?.touched" class="text-danger">
              At least one check department is required
            </div>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <div *ngIf="specificCriteriaEditError" class="alert alert-danger w-100 mb-2">{{ specificCriteriaEditError }}</div>
        <button type="button" class="btn btn-secondary" (click)="modal.dismiss('Close click')" [disabled]="updatingSpecificCriteria">Cancel</button>
        <button type="button" class="btn btn-primary" [disabled]="specificCriteriaEditForm.invalid || updatingSpecificCriteria" (click)="updateSpecificCriteria()">
          <span *ngIf="updatingSpecificCriteria" class="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>
          Update Specific Criteria
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
  displayedColumns: string[] = ['id', 'name', 'type', 'createdBy', 'standardCriteriaCount', 'specificCriteriaCount', 'actions'];
  dataSource: MatTableDataSource<Protocol>;
  protocolForm: FormGroup;
  criteriaForm: FormGroup;
  standardCriteriaForm: FormGroup;
  specificCriteriaForm: FormGroup;
  
  // UI state
  isEditing = false;
  loading = false;
  actionInProgress = false;
  formSubmitting = false;
  loadingCriteria = false;
  savingCriteria = false;
  deletingProtocol = false;
  addingStandardCriteria = false;
  addingSpecificCriteria = false;
  loadingAllCriteria = false;
  
  // Error and message handling
  error: string = '';
  formError: string = '';
  criteriaError: string = '';
  deleteError: string = '';
  successMessage: string = '';
  standardCriteriaError: string = '';
  specificCriteriaError: string = '';
  
  // Data
  selectedProtocol: Protocol | null = null;
  selectedProtocolId!: number;
  protocolToDelete: Protocol | null = null;
  protocolCriteria: SpecificControlCriteria[] = [];
  originalDataSource: Protocol[] = [];
  protocols: Protocol[] = [];
  departments: Department[] = [];
  standardCriteria: StandardControlCriteria[] = [];
  specificCriteria: SpecificControlCriteria[] = [];

  // Form states for editing criteria
  editingStandardCriteria: boolean = false;
  editingSpecificCriteria: boolean = false;
  selectedStandardCriteria: any = null;
  selectedSpecificCriteria: any = null;
  
  // Forms for editing criteria
  standardCriteriaEditForm: FormGroup;
  specificCriteriaEditForm: FormGroup;
  
  // Error states for editing criteria
  standardCriteriaEditError: string = '';
  specificCriteriaEditError: string = '';
  
  // Progress indicators for editing criteria
  updatingStandardCriteria: boolean = false;
  updatingSpecificCriteria: boolean = false;

  // Destroy subject for cleanup
  private destroy$ = new Subject<void>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('protocolModal') protocolModal: any;
  @ViewChild('criteriaModal') criteriaModal: any;
  @ViewChild('deleteConfirmModal') deleteConfirmModal: any;
  @ViewChild('standardCriteriaModal') standardCriteriaModal: any;
  @ViewChild('specificCriteriaModal') specificCriteriaModal: any;
  @ViewChild('displayCriteriaModal') displayCriteriaModal: any;
  @ViewChild('standardCriteriaEditModal') standardCriteriaEditModal: any;
  @ViewChild('specificCriteriaEditModal') specificCriteriaEditModal: any;

  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private reportService: ReportService,
    private protocolService: ProtocolService
  ) {
    this.dataSource = new MatTableDataSource<Protocol>([]);
    
    this.protocolForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      protocolType: ['Homologation', Validators.required]
    });

    this.criteriaForm = this.formBuilder.group({
      description: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(500)]]
    });

    this.standardCriteriaForm = this.formBuilder.group({
      description: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(500)]],
      implementationDepartmentId: ['', Validators.required],
      checkDepartmentId: ['', Validators.required]
    });

    this.specificCriteriaForm = this.formBuilder.group({
      description: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(500)]],
      implementationDepartmentIds: [[], Validators.required],
      checkDepartmentIds: [[], Validators.required]
    });

    this.standardCriteriaEditForm = this.formBuilder.group({
      description: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(500)]],
      implementationDepartmentId: ['', Validators.required],
      checkDepartmentId: ['', Validators.required]
    });

    this.specificCriteriaEditForm = this.formBuilder.group({
      description: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(500)]],
      implementationDepartmentIds: [[], Validators.required],
      checkDepartmentIds: [[], Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadProtocols();
    this.loadDepartments();
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
    
    this.protocolService.getAllProtocols()
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => this.loading = false)
      )
      .subscribe({
        next: (protocols) => {
          // Ensure count properties are set
          this.protocols = protocols.map(protocol => ({
            ...protocol,
            standardCriteriaCount: protocol.standardCriteriaCount || 0,
            specificCriteriaCount: protocol.specificCriteriaCount || 0
          }));
          
          this.dataSource.data = this.protocols;
          this.originalDataSource = [...this.protocols];
        },
        error: (err) => {
          this.error = `Error loading protocols: ${err.message}`;
          console.error('Error loading protocols', err);
        }
      });
  }

  loadDepartments(): void {
    this.reportService.getAllDepartments()
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (departments) => {
          this.departments = departments;
        },
        error: (err) => {
          console.error('Error loading departments', err);
          // Use mock departments as fallback
          this.departments = [
            { id: 1, name: 'Maintenance' },
            { id: 2, name: 'Quality Control' },
            { id: 3, name: 'Production' },
            { id: 4, name: 'Engineering' },
            { id: 5, name: 'Safety' }
          ];
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

  openStandardCriteriaDialog(protocol: Protocol): void {
    this.selectedProtocol = protocol;
    this.standardCriteriaForm.reset();
    this.standardCriteriaError = '';
    this.modalService.open(this.standardCriteriaModal);
  }

  openSpecificCriteriaDialog(protocol: Protocol): void {
    this.selectedProtocol = protocol;
    this.specificCriteriaForm.reset();
    this.specificCriteriaError = '';
    this.modalService.open(this.specificCriteriaModal);
  }

  saveStandardCriteria(): void {
    if (this.standardCriteriaForm.invalid || !this.selectedProtocol) {
      this.standardCriteriaForm.markAllAsTouched();
      return;
    }

    this.addingStandardCriteria = true;
    this.standardCriteriaError = '';
    
    const criteriaData = {
      description: this.standardCriteriaForm.get('description')?.value,
      implementationDepartmentId: this.standardCriteriaForm.get('implementationDepartmentId')?.value,
      checkDepartmentId: this.standardCriteriaForm.get('checkDepartmentId')?.value
    };

    this.reportService.addStandardCriteria(this.selectedProtocol.id, criteriaData)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => this.addingStandardCriteria = false)
      )
      .subscribe({
        next: (newCriteria) => {
          this.standardCriteriaForm.reset();
          this.modalService.dismissAll();
          this.successMessage = 'Standard criteria added successfully';
          // Refresh protocol list to update counts
          this.loadProtocols();
        },
        error: (err) => {
          this.standardCriteriaError = err.message;
          console.error('Error adding standard criteria', err);
        }
      });
  }

  saveSpecificCriteria(): void {
    if (this.specificCriteriaForm.invalid || !this.selectedProtocol) {
      this.specificCriteriaForm.markAllAsTouched();
      return;
    }

    this.addingSpecificCriteria = true;
    this.specificCriteriaError = '';
    
    const criteriaData = {
      description: this.specificCriteriaForm.get('description')?.value,
      implementationDepartmentIds: this.specificCriteriaForm.get('implementationDepartmentIds')?.value,
      checkDepartmentIds: this.specificCriteriaForm.get('checkDepartmentIds')?.value
    };

    this.reportService.addSpecificCriteria(this.selectedProtocol.id, criteriaData)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => this.addingSpecificCriteria = false)
      )
      .subscribe({
        next: (newCriteria) => {
          this.specificCriteriaForm.reset();
          this.modalService.dismissAll();
          this.successMessage = 'Specific criteria added successfully';
          // Refresh protocol list to update counts
          this.loadProtocols();
        },
        error: (err) => {
          this.specificCriteriaError = err.message;
          console.error('Error adding specific criteria', err);
        }
      });
  }

  deleteStandardCriteria(criteriaId: number): void {
    if (!this.selectedProtocol) return;
    
    this.actionInProgress = true;
    
    this.reportService.deleteStandardCriteria(this.selectedProtocol.id, criteriaId)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => this.actionInProgress = false)
      )
      .subscribe({
        next: () => {
          this.standardCriteria = this.standardCriteria.filter(c => c.id !== criteriaId);
          this.successMessage = 'Standard criteria deleted successfully';
          // Refresh protocol list to update counts
          this.loadProtocols();
        },
        error: (err) => {
          this.formError = err.message;
          console.error('Error deleting standard criteria', err);
        }
      });
  }

  deleteSpecificCriteria(criteriaId: number): void {
    if (!this.selectedProtocol) return;
    
    this.actionInProgress = true;
    
    this.reportService.deleteSpecificCriteria(this.selectedProtocol.id, criteriaId)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => this.actionInProgress = false)
      )
      .subscribe({
        next: () => {
          this.specificCriteria = this.specificCriteria.filter(c => c.id !== criteriaId);
          this.successMessage = 'Specific criteria deleted successfully';
          // Refresh protocol list to update counts
          this.loadProtocols();
        },
        error: (err) => {
          this.formError = err.message;
          console.error('Error deleting specific criteria', err);
        }
      });
  }

  getDepartmentName(departmentId: number | undefined): string {
    if (!departmentId) return 'Not specified';
    const department = this.departments.find(d => d.id === departmentId);
    return department ? department.name : 'Unknown Department';
  }

  loadCriteria(protocolId: number): void {
    this.selectedProtocolId = protocolId;
    this.loadingAllCriteria = true;
    
    this.protocolService.getCriteriaByProtocolId(protocolId)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => this.loadingAllCriteria = false)
      )
      .subscribe({
        next: (res) => {
          this.standardCriteria = res.standardCriteria;
          this.specificCriteria = res.specificCriteria;
        },
        error: (err) => console.error('Error loading criteria:', err)
      });
  }

  viewAllCriteria(protocol: Protocol): void {
    this.selectedProtocol = protocol;
    this.loadingAllCriteria = true;
    this.selectedProtocolId = protocol.id;
    
    this.loadCriteria(protocol.id);
    
    this.modalService.open(this.displayCriteriaModal, { size: 'lg' });
  }

  // Edit a standard criteria
  editStandardCriteria(criteria: any): void {
    this.selectedStandardCriteria = criteria;
    this.editingStandardCriteria = true;
    this.standardCriteriaEditError = '';
    
    this.standardCriteriaEditForm.patchValue({
      description: criteria.description,
      implementationDepartmentId: criteria.implementationResponsible?.id,
      checkDepartmentId: criteria.checkResponsible?.id
    });
    
    this.modalService.open(this.standardCriteriaEditModal, { size: 'lg' });
  }

  // Update standard criteria
  updateStandardCriteria(): void {
    if (this.standardCriteriaEditForm.invalid || !this.selectedProtocolId || !this.selectedStandardCriteria) {
      this.standardCriteriaEditForm.markAllAsTouched();
      return;
    }

    this.updatingStandardCriteria = true;
    this.standardCriteriaEditError = '';
    
    const criteriaData = {
      description: this.standardCriteriaEditForm.get('description')?.value,
      implementationDepartmentId: this.standardCriteriaEditForm.get('implementationDepartmentId')?.value,
      checkDepartmentId: this.standardCriteriaEditForm.get('checkDepartmentId')?.value
    };

    this.protocolService.updateStandardCriteria(this.selectedProtocolId, this.selectedStandardCriteria.id, criteriaData)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => this.updatingStandardCriteria = false)
      )
      .subscribe({
        next: (updatedCriteria) => {
          // Update the criteria in the list
          const index = this.standardCriteria.findIndex(c => c.id === this.selectedStandardCriteria!.id);
          if (index !== -1) {
            this.standardCriteria[index] = updatedCriteria;
            this.standardCriteria = [...this.standardCriteria];
          }
          
          this.modalService.dismissAll();
          this.successMessage = 'Standard criteria updated successfully';
        },
        error: (err) => {
          this.standardCriteriaEditError = err.message;
          console.error('Error updating standard criteria', err);
        }
      });
  }

  // Edit a specific criteria
  editSpecificCriteria(criteria: any): void {
    this.selectedSpecificCriteria = criteria;
    this.editingSpecificCriteria = true;
    this.specificCriteriaEditError = '';
    
    const implementationDepartmentIds = criteria.implementationResponsible?.map((dept: any) => dept.id) || [];
    const checkDepartmentIds = criteria.checkResponsible?.map((dept: any) => dept.id) || [];
    
    this.specificCriteriaEditForm.patchValue({
      description: criteria.description,
      implementationDepartmentIds: implementationDepartmentIds,
      checkDepartmentIds: checkDepartmentIds
    });
    
    this.modalService.open(this.specificCriteriaEditModal, { size: 'lg' });
  }

  // Update specific criteria
  updateSpecificCriteria(): void {
    if (this.specificCriteriaEditForm.invalid || !this.selectedProtocolId || !this.selectedSpecificCriteria) {
      this.specificCriteriaEditForm.markAllAsTouched();
      return;
    }

    this.updatingSpecificCriteria = true;
    this.specificCriteriaEditError = '';
    
    const criteriaData = {
      description: this.specificCriteriaEditForm.get('description')?.value,
      implementationDepartmentIds: this.specificCriteriaEditForm.get('implementationDepartmentIds')?.value,
      checkDepartmentIds: this.specificCriteriaEditForm.get('checkDepartmentIds')?.value
    };

    this.protocolService.updateSpecificCriteria(this.selectedProtocolId, this.selectedSpecificCriteria.id, criteriaData)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => this.updatingSpecificCriteria = false)
      )
      .subscribe({
        next: (updatedCriteria) => {
          // Update the criteria in the list
          const index = this.specificCriteria.findIndex(c => c.id === this.selectedSpecificCriteria!.id);
          if (index !== -1) {
            this.specificCriteria[index] = updatedCriteria;
            this.specificCriteria = [...this.specificCriteria];
          }
          
          this.modalService.dismissAll();
          this.successMessage = 'Specific criteria updated successfully';
        },
        error: (err) => {
          this.specificCriteriaEditError = err.message;
          console.error('Error updating specific criteria', err);
        }
      });
  }
} 