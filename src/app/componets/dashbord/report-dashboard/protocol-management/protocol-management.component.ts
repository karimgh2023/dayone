import { Component, OnInit, ViewChild } from '@angular/core';
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
import { Protocol } from '../../../../models/report.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReportService } from '../../../../services/report.service';

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

    <div class="card custom-card">
      <div class="card-header border-bottom">
        <h3 class="card-title">Protocols List</h3>
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col-md-12 col-xl-12">
            <div class="row">
              <div class="col-md-12">
                <div class="form-group">
                  <input type="text" class="form-control" id="search" placeholder="Search Protocols..."
                    (keyup)="applyFilter($event)">
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
                      <button class="btn btn-primary btn-sm me-2" (click)="editProtocol(protocol)">
                        <i class="fe fe-edit"></i> Edit
                      </button>
                      <button class="btn btn-info btn-sm me-2" (click)="viewProtocol(protocol)">
                        <i class="fe fe-eye"></i> View
                      </button>
                      <button class="btn btn-danger btn-sm" (click)="deleteProtocol(protocol.id)">
                        <i class="fe fe-trash"></i> Delete
                      </button>
                    </div>
                  </td>
                </ng-container>

                <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
                <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>

                <!-- Row shown when there is no matching data. -->
                <tr class="mat-row" *matNoDataRow>
                  <td class="mat-cell text-center" colspan="5">No data matching the filter</td>
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
              <div class="card-header">
                <h5 class="card-title mb-0">Control Criteria</h5>
                <button type="button" class="btn btn-sm btn-primary float-end" (click)="addCriteria()">
                  <i class="fe fe-plus"></i> Add Criteria
                </button>
              </div>
              <div class="card-body p-0">
                <ul class="list-group list-group-flush">
                  <li class="list-group-item" *ngFor="let criteria of protocolCriteria; let i = index">
                    <div class="d-flex justify-content-between align-items-center">
                      <span>{{ criteria.description }}</span>
                      <button class="btn btn-sm btn-danger" (click)="removeCriteria(i)">
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
        <button type="button" class="btn btn-secondary" (click)="modal.dismiss('Close click')">Close</button>
        <button type="button" class="btn btn-primary" [disabled]="protocolForm.invalid" (click)="saveProtocol()">
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
        <button type="button" class="btn btn-secondary" (click)="modal.dismiss('Close click')">Close</button>
        <button type="button" class="btn btn-primary" [disabled]="criteriaForm.invalid" (click)="saveCriteria()">
          Add Criteria
        </button>
      </div>
    </ng-template>
  `,
  styleUrls: ['./protocol-management.component.scss'],
  providers: [
    DatePipe
  ],
})
export class ProtocolManagementComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'type', 'createdBy', 'actions'];
  dataSource: MatTableDataSource<Protocol>;
  protocolForm: FormGroup;
  criteriaForm: FormGroup;
  isEditing = false;
  selectedProtocol: Protocol | null = null;
  protocolCriteria: any[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('protocolModal') protocolModal: any;
  @ViewChild('criteriaModal') criteriaModal: any;

  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private reportService: ReportService
  ) {
    this.dataSource = new MatTableDataSource<Protocol>([]);
    
    this.protocolForm = this.formBuilder.group({
      name: ['', Validators.required],
      protocolType: ['Homologation', Validators.required]
    });

    this.criteriaForm = this.formBuilder.group({
      description: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadProtocols();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadProtocols(): void {
    this.reportService.getAllProtocols().subscribe({
      next: (protocols) => {
        this.dataSource.data = protocols;
      },
      error: (error) => {
        console.error('Error loading protocols', error);
        // Load mock data if API fails
        this.loadMockData();
      }
    });
  }

  loadMockData(): void {
    const mockProtocols: Protocol[] = [
      {
        id: 1,
        name: 'Machine Installation Protocol',
        protocolType: 'Homologation',
        createdBy: {
          id: 1,
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@example.com',
          role: 'ADMIN',
          department: { id: 1, name: 'Engineering' }
        }
      },
      {
        id: 2,
        name: 'Machine Maintenance Protocol',
        protocolType: 'Requalification',
        createdBy: {
          id: 2,
          firstName: 'Jane',
          lastName: 'Smith',
          email: 'jane.smith@example.com',
          role: 'USER',
          department: { id: 2, name: 'Maintenance' }
        }
      },
      {
        id: 3,
        name: 'Safety Inspection Protocol',
        protocolType: 'Homologation',
        createdBy: {
          id: 3,
          firstName: 'Robert',
          lastName: 'Johnson',
          email: 'robert.johnson@example.com',
          role: 'MANAGER',
          department: { id: 3, name: 'Safety' }
        }
      }
    ];

    this.dataSource.data = mockProtocols;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openProtocolModal(): void {
    this.isEditing = false;
    this.selectedProtocol = null;
    this.protocolForm.reset({ protocolType: 'Homologation' });
    this.protocolCriteria = [];
    this.modalService.open(this.protocolModal, { size: 'lg' });
  }

  editProtocol(protocol: Protocol): void {
    this.isEditing = true;
    this.selectedProtocol = protocol;
    this.protocolForm.patchValue({
      name: protocol.name,
      protocolType: protocol.protocolType
    });
    
    // In a real app, you would load criteria from backend
    this.protocolCriteria = [];
    this.modalService.open(this.protocolModal, { size: 'lg' });
  }

  viewProtocol(protocol: Protocol): void {
    // View protocol details - could show this in a modal or navigate to details page
    console.log('Viewing protocol:', protocol);
  }

  deleteProtocol(id: number): void {
    if (confirm('Are you sure you want to delete this protocol?')) {
      this.reportService.deleteProtocol(id).subscribe({
        next: () => {
          this.dataSource.data = this.dataSource.data.filter(protocol => protocol.id !== id);
        },
        error: (error) => {
          console.error('Error deleting protocol', error);
          // For demo, just remove it from the array
          this.dataSource.data = this.dataSource.data.filter(protocol => protocol.id !== id);
        }
      });
    }
  }

  saveProtocol(): void {
    if (this.protocolForm.invalid) {
      return;
    }

    const protocolData = this.protocolForm.value;
    
    if (this.isEditing && this.selectedProtocol) {
      // Update existing protocol
      this.reportService.updateProtocol({
        ...this.selectedProtocol,
        ...protocolData
      }).subscribe({
        next: (updatedProtocol) => {
          const index = this.dataSource.data.findIndex(p => p.id === this.selectedProtocol!.id);
          if (index !== -1) {
            const data = [...this.dataSource.data];
            data[index] = updatedProtocol;
            this.dataSource.data = data;
          }
          this.modalService.dismissAll();
        },
        error: (error) => {
          console.error('Error updating protocol', error);
          // For demo, update locally
          const index = this.dataSource.data.findIndex(p => p.id === this.selectedProtocol!.id);
          if (index !== -1) {
            const data = [...this.dataSource.data];
            data[index] = {
              ...this.selectedProtocol!,
              ...protocolData
            };
            this.dataSource.data = data;
          }
          this.modalService.dismissAll();
        }
      });
    } else {
      // Create new protocol
      this.reportService.createProtocol(protocolData).subscribe({
        next: (newProtocol) => {
          this.dataSource.data = [...this.dataSource.data, newProtocol];
          this.modalService.dismissAll();
        },
        error: (error) => {
          console.error('Error creating protocol', error);
          // For demo, just add it to the array with a mock ID
          const newProtocol: Protocol = {
            id: Math.max(...this.dataSource.data.map(p => p.id), 0) + 1,
            name: protocolData.name,
            protocolType: protocolData.protocolType,
            createdBy: {
              id: 1,
              firstName: 'Current',
              lastName: 'User',
              email: 'current.user@example.com',
              role: 'ADMIN',
              department: { id: 1, name: 'IT' }
            }
          };
          this.dataSource.data = [...this.dataSource.data, newProtocol];
          this.modalService.dismissAll();
        }
      });
    }
  }

  addCriteria(): void {
    this.criteriaForm.reset();
    this.modalService.open(this.criteriaModal);
  }

  saveCriteria(): void {
    if (this.criteriaForm.invalid) {
      return;
    }

    const criteriaData = this.criteriaForm.value;
    this.protocolCriteria.push({
      id: this.protocolCriteria.length + 1,
      description: criteriaData.description
    });

    this.modalService.dismissAll();
  }

  removeCriteria(index: number): void {
    this.protocolCriteria.splice(index, 1);
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
} 