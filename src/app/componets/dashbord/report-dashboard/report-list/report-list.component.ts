import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgbDateStruct, NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../../../../shared/common/sharedmodule';
import { NgSelectModule } from '@ng-select/ng-select';
import { MaterialModuleModule } from '../../../../material-module/material-module.module';
import flatpickr from 'flatpickr';
import { FlatpickrDefaults, FlatpickrModule } from 'angularx-flatpickr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Report } from '../../../../models/report.model';
import { ReportService } from '../../../../services/report.service';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-report-list',
  standalone: true,
  imports: [
    SharedModule,
    NgSelectModule,
    MaterialModuleModule,
    NgbModule,
    FlatpickrModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    CommonModule
  ],
  template: `
    <div class="page-header">
      <div>
        <h2 class="page-title">Report List</h2>
        <ol class="breadcrumb mb-0">
          <li class="breadcrumb-item">
            <a [routerLink]="['../../dashboard']">Dashboard</a>
          </li>
          <li class="breadcrumb-item active" aria-current="page">Report List</li>
        </ol>
      </div>
      <div class="ms-auto pageheader-btn">
        <a [routerLink]="['../protocols']" class="btn btn-info btn-icon text-white me-2">
          <span>
            <i class="fe fe-list"></i>
          </span> Manage Protocols
        </a>
        <a [routerLink]="['../new-report']" class="btn btn-primary btn-icon text-white me-2">
          <span>
            <i class="fe fe-plus"></i>
          </span> Create New Report
        </a>
      </div>
    </div>

    <div class="card custom-card">
      <div class="card-header border-bottom">
        <h3 class="card-title">Reports List</h3>
      </div>
      <div class="card-body">
        <div class="row mb-4">
          <div class="col-md-12 col-xl-12">
            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <input type="text" class="form-control" id="search" placeholder="Search Reports..."
                    (keyup)="applyFilter($event)">
                </div>
              </div>
              <div class="col-md-3">
                <div class="form-group">
                  <select class="form-control" (change)="filterByType($event)">
                    <option value="">All Types</option>
                    <option value="Maintenance">Maintenance</option>
                    <option value="Inspection">Inspection</option>
                    <option value="Repair">Repair</option>
                    <option value="Replacement">Replacement</option>
                  </select>
                </div>
              </div>
              <div class="col-md-3">
                <div class="form-group">
                  <select class="form-control" (change)="filterByProtocol($event)">
                    <option value="">All Protocols</option>
                    <option *ngFor="let protocol of protocols" [value]="protocol.id">
                      {{protocol.name}}
                    </option>
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
                  <td mat-cell *matCellDef="let report"> {{report.id}} </td>
                </ng-container>

                <!-- Type Column -->
                <ng-container matColumnDef="type">
                  <th mat-header-cell *matHeaderCellDef mat-sort-header> Type </th>
                  <td mat-cell *matCellDef="let report">
                    <span class="badge bg-{{getTypeColor(report.type || '')}} me-1 mb-1 mt-1">{{report.type || 'Unknown'}}</span>
                  </td>
                </ng-container>

                <!-- Protocol Column -->
                <ng-container matColumnDef="protocol">
                  <th mat-header-cell *matHeaderCellDef mat-sort-header> Protocol </th>
                  <td mat-cell *matCellDef="let report"> {{report.protocol.name}} </td>
                </ng-container>

                <!-- Created By Column -->
                <ng-container matColumnDef="createdBy">
                  <th mat-header-cell *matHeaderCellDef mat-sort-header> Created By </th>
                  <td mat-cell *matCellDef="let report">
                    <div class="d-flex">
                      <span class="avatar avatar-md brround me-3"
                        style="background-image: url(./assets/images/users/1.jpg)"></span>
                      <div class="ms-2">
                        <h6 class="mb-0 text-dark">{{report.createdBy.firstName}} {{report.createdBy.lastName}}</h6>
                        <p class="text-muted mb-0">{{report.createdBy.department.name}}</p>
                      </div>
                    </div>
                  </td>
                </ng-container>

                <!-- Equipment Column -->
                <ng-container matColumnDef="equipment">
                  <th mat-header-cell *matHeaderCellDef mat-sort-header> Equipment </th>
                  <td mat-cell *matCellDef="let report">
                    <div>
                      <h6 class="mb-0 text-dark">{{report.designation}}</h6>
                      <p class="text-muted mb-0">S/N: {{report.serialNumber}}</p>
                    </div>
                  </td>
                </ng-container>

                <!-- Created Date Column -->
                <ng-container matColumnDef="createdAt">
                  <th mat-header-cell *matHeaderCellDef mat-sort-header> Created At </th>
                  <td mat-cell *matCellDef="let report"> {{report.createdAt | date:'dd-MM-yyyy'}} </td>
                </ng-container>

                <!-- Status Column -->
                <ng-container matColumnDef="status">
                  <th mat-header-cell *matHeaderCellDef mat-sort-header> Status </th>
                  <td mat-cell *matCellDef="let report">
                    <span class="badge bg-{{report.isCompleted ? 'success' : 'primary'}} me-1 mb-1 mt-1">
                      {{report.isCompleted ? 'Completed' : 'In Progress'}}
                    </span>
                  </td>
                </ng-container>

                <!-- Actions Column -->
                <ng-container matColumnDef="actions">
                  <th mat-header-cell *matHeaderCellDef> Actions </th>
                  <td mat-cell *matCellDef="let report">
                    <div class="d-flex">
                      <a [routerLink]="['../view-report', report.id]" class="btn btn-primary btn-sm me-2">
                        <i class="fe fe-eye"></i> View
                      </a>
                      <button class="btn btn-danger btn-sm" (click)="removeData(report.id)">
                        <i class="fe fe-trash"></i> Delete
                      </button>
                    </div>
                  </td>
                </ng-container>

                <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
                <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>

                <!-- Row shown when there is no matching data. -->
                <tr class="mat-row" *matNoDataRow>
                  <td class="mat-cell text-center" colspan="8">No data matching the filter</td>
                </tr>
              </table>
              <mat-paginator [pageSizeOptions]="[5, 10, 25, 100]" aria-label="Select page of reports"></mat-paginator>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./report-list.component.scss'],
  providers: [
    FlatpickrDefaults,
    DatePipe
  ],
})
export class ReportListComponent implements OnInit {
  model!: NgbDateStruct;
  displayedColumns: string[] = ['id', 'type', 'protocol', 'createdBy', 'equipment', 'createdAt', 'status', 'actions'];
  dataSource: MatTableDataSource<Report>;
  protocols: any[] = [];
  originalData: Report[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  loading: boolean = false;
  error: string = '';

  constructor(
    private modalService: NgbModal,
    private reportService: ReportService
  ) {
    // Initialize with empty data
    this.dataSource = new MatTableDataSource<Report>([]);
  }

  ngOnInit(): void {
    this.loadReports();
    this.loadProtocols();
  }

  loadReports(): void {
    this.loading = true;
    this.error = '';
    
    this.reportService.getAllReports().subscribe({
      next: (reports) => {
        if (reports && reports.length > 0) {
          // Process the reports if they are returned
          this.originalData = [...reports];
          this.dataSource.data = reports;
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        } else {
          this.error = 'No reports found';
          this.loadMockData();
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching reports:', error);
        this.error = 'Failed to load reports';
        this.loadMockData();
        this.loading = false;
      }
    });
  }

  loadProtocols(): void {
    this.reportService.getAllProtocols().subscribe({
      next: (protocols) => {
        this.protocols = protocols;
      },
      error: (error) => {
        console.error('Error loading protocols', error);
      }
    });
  }

  loadMockData(): void {
    // Create admin user and departments
    const maintDept = { id: 1, name: 'Maintenance' };
    const safetyDept = { id: 2, name: 'Safety' };
    
    const admin = {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'admin@example.com',
      username: 'admin',
      department: maintDept,
      role: 'DEPARTMENT_MANAGER'
    };
    
    const manager = {
      id: 2,
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'manager@example.com',
      username: 'manager',
      department: safetyDept,
      role: 'DEPARTMENT_MANAGER'
    };
    
    // Create protocol objects
    const maintenanceProtocol = {
      id: 1,
      name: 'Standard Maintenance Protocol',
      protocolType: 'Homologation' as 'Homologation',
      createdBy: admin
    };
    
    const safetyProtocol = {
      id: 2,
      name: 'Safety Inspection Protocol',
      protocolType: 'Requalification' as 'Requalification',
      createdBy: manager
    };
    
    // Mock data for demonstration
    const mockReports = [
      {
        id: 1,
        type: 'Maintenance',
        protocol: maintenanceProtocol,
        createdBy: admin,
        reportUsers: [],
        reportEntries: [],
        createdAt: '2023-04-15T10:30:00',
        isCompleted: false,
        serialNumber: 'EQ-12345',
        equipmentDescription: 'Industrial Pump',
        designation: 'Centrifugal Pump',
        manufacturer: 'Grundfos',
        immobilization: 'No',
        serviceSeg: 'A1',
        businessUnit: 'Production'
      },
      {
        id: 2,
        type: 'Inspection',
        protocol: safetyProtocol,
        createdBy: manager,
        reportUsers: [],
        reportEntries: [],
        createdAt: '2023-04-18T14:15:00',
        isCompleted: true,
        serialNumber: 'EQ-67890',
        equipmentDescription: 'Electric Motor',
        designation: 'AC Motor',
        manufacturer: 'Siemens',
        immobilization: 'Yes',
        serviceSeg: 'B2',
        businessUnit: 'Facilities'
      }
    ];

    this.dataSource.data = mockReports;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  removeData(id: number) {
    if (confirm('Are you sure you want to delete this report?')) {
      this.reportService.deleteReport(id).subscribe({
        next: () => {
          // Remove the deleted report from the data source
          this.dataSource.data = this.dataSource.data.filter(report => report.id !== id);
          // Show success message
          alert('Report deleted successfully');
        },
        error: (error) => {
          console.error('Error deleting report', error);
          alert('Failed to delete report. Please try again.');
        }
      });
    }
  }

  getTypeColor(type: string): string {
    switch (type.toLowerCase()) {
      case 'maintenance':
        return 'primary';
      case 'inspection':
        return 'success';
      case 'repair':
        return 'warning';
      case 'replacement':
        return 'danger';
      default:
        return 'info';
    }
  }

  filterByType(event: Event): void {
    const filterValue = (event.target as HTMLSelectElement).value;
    
    if (!filterValue) {
      // Reset to original data if no filter
      this.dataSource.data = [...this.originalData];
    } else {
      // Filter by type
      this.dataSource.data = this.originalData.filter(
        report => report.type === filterValue
      );
    }

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  filterByProtocol(event: Event): void {
    const filterValue = (event.target as HTMLSelectElement).value;
    
    if (!filterValue) {
      // Reset to original data if no filter
      this.dataSource.data = [...this.originalData];
    } else {
      // Filter by protocol ID
      const protocolId = parseInt(filterValue, 10);
      this.dataSource.data = this.originalData.filter(
        report => report.protocol.id === protocolId
      );
    }

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
} 