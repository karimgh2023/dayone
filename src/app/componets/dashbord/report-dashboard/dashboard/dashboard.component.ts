import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../../../shared/common/sharedmodule';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { NgApexchartsModule } from 'ng-apexcharts';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { ReportService } from '../../../../services/report.service';
import { Report } from '../../../../models/report.model';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    SharedModule,
    NgbModule,
    RouterModule,
    NgApexchartsModule,
    NgCircleProgressModule,
    CommonModule
  ],
  providers: [DatePipe],
  template: `
    <div class="page-header">
      <div>
        <h2 class="page-title">Reports Dashboard</h2>
        <ol class="breadcrumb mb-0">
          <li class="breadcrumb-item">
            <a [routerLink]="['/dashboard']">Dashboard</a>
          </li>
          <li class="breadcrumb-item active" aria-current="page">Reports Dashboard</li>
        </ol>
      </div>
      <div class="ms-auto pageheader-btn">
        <a [routerLink]="['../new-report']" class="btn btn-primary btn-icon text-white me-2">
          <span>
            <i class="fe fe-plus"></i>
          </span> Create New Report
        </a>
        <a [routerLink]="['../report-list']" class="btn btn-secondary btn-icon text-white">
          <span>
            <i class="fe fe-list"></i>
          </span> Reports List
        </a>
      </div>
    </div>

    <div *ngIf="error" class="alert alert-danger mb-4">
      {{ error }}
    </div>

    <div *ngIf="loading" class="text-center my-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <p class="mt-2">Loading reports data...</p>
    </div>

    <div *ngIf="!loading && !error">
      <div class="row">
        <div class="col-md-3">
          <app-statistic-card 
            title="Total Reports" 
            [value]="statistics.total" 
            icon="file-text" 
            color="primary">
          </app-statistic-card>
        </div>
        <div class="col-md-3">
          <app-statistic-card 
            title="Completed Reports" 
            [value]="statistics.completed" 
            icon="check-circle" 
            color="success">
          </app-statistic-card>
        </div>
        <div class="col-md-3">
          <app-statistic-card 
            title="Pending Reports" 
            [value]="statistics.pending" 
            icon="clock" 
            color="warning">
          </app-statistic-card>
        </div>
        <div class="col-md-3">
          <app-statistic-card 
            title="Reports This Month" 
            [value]="statistics.reportsThisMonth" 
            icon="calendar" 
            color="info">
          </app-statistic-card>
        </div>
      </div>

      <div class="row">
        <!-- Recent Reports -->
        <div class="col-xl-8 col-lg-12 col-md-12">
          <div class="card custom-card">
            <div class="card-header border-bottom">
              <h3 class="card-title">Recent Reports</h3>
            </div>
            <div class="card-body">
              <div class="table-responsive">
                <table class="table border text-nowrap mb-0">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Equipment</th>
                      <th>Type</th>
                      <th>Created</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr *ngFor="let report of recentReports">
                      <td>#{{report.id}}</td>
                      <td>{{report.designation}}</td>
                      <td>
                        <span class="badge bg-{{getTypeColor(report.type || '')}}">{{report.type || 'Unknown'}}</span>
                      </td>
                      <td>{{report.createdAt | date:'dd-MM-yyyy'}}</td>
                      <td>
                        <span class="badge bg-{{report.isCompleted ? 'success' : 'primary'}}">
                          {{report.isCompleted ? 'Completed' : 'In Progress'}}
                        </span>
                      </td>
                      <td>
                        <a [routerLink]="['../view-report', report.id]" class="btn btn-sm btn-primary">
                          <i class="fe fe-eye"></i> View
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div class="card-footer">
              <a [routerLink]="['../report-list']" class="btn btn-primary btn-sm">View All Reports</a>
            </div>
          </div>
        </div>

        <!-- Reports by Type -->
        <div class="col-xl-4 col-lg-12 col-md-12">
          <div class="card custom-card">
            <div class="card-header border-bottom">
              <h3 class="card-title">Reports by Type</h3>
            </div>
            <div class="card-body">
              <div class="mb-4">
                <div class="d-flex align-items-center mb-2">
                  <div class="w-100">
                    <span class="d-block fw-semibold">Maintenance</span>
                  </div>
                  <div class="ms-auto">
                    <span class="text-primary">{{statistics.byType.maintenance}}</span>
                  </div>
                </div>
                <div class="progress h-2">
                  <div class="progress-bar bg-primary" [style.width.%]="getPercentageForType('maintenance')"></div>
                </div>
              </div>
              <div class="mb-4">
                <div class="d-flex align-items-center mb-2">
                  <div class="w-100">
                    <span class="d-block fw-semibold">Inspection</span>
                  </div>
                  <div class="ms-auto">
                    <span class="text-success">{{statistics.byType.inspection}}</span>
                  </div>
                </div>
                <div class="progress h-2">
                  <div class="progress-bar bg-success" [style.width.%]="getPercentageForType('inspection')"></div>
                </div>
              </div>
              <div class="mb-4">
                <div class="d-flex align-items-center mb-2">
                  <div class="w-100">
                    <span class="d-block fw-semibold">Repair</span>
                  </div>
                  <div class="ms-auto">
                    <span class="text-warning">{{statistics.byType.repair}}</span>
                  </div>
                </div>
                <div class="progress h-2">
                  <div class="progress-bar bg-warning" [style.width.%]="getPercentageForType('repair')"></div>
                </div>
              </div>
              <div>
                <div class="d-flex align-items-center mb-2">
                  <div class="w-100">
                    <span class="d-block fw-semibold">Replacement</span>
                  </div>
                  <div class="ms-auto">
                    <span class="text-danger">{{statistics.byType.replacement}}</span>
                  </div>
                </div>
                <div class="progress h-2">
                  <div class="progress-bar bg-danger" [style.width.%]="getPercentageForType('replacement')"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  // Statistics
  statistics = {
    total: 0,
    completed: 0,
    pending: 0,
    reportsThisMonth: 0,
    byType: {
      maintenance: 0,
      inspection: 0,
      repair: 0,
      replacement: 0
    }
  };

  // Recent reports
  recentReports: Partial<Report>[] = [];

  // Add properties to track loading and error states
  loading: boolean = false;
  error: string = '';

  constructor(private reportService: ReportService) { }

  ngOnInit(): void {
    this.loadReports();
  }

  loadReports() {
    this.loading = true;
    this.error = '';
    
    console.log('Dashboard: Loading reports...');
    
    this.reportService.getAllReports().subscribe({
      next: (reports) => {
        console.log(`Dashboard: Successfully loaded ${reports.length} reports`, reports);
        this.processReportStatistics(reports);
        this.recentReports = reports
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
          .slice(0, 5);
        this.loading = false;
      },
      error: (error) => {
        console.error('Dashboard: Error loading reports', error);
        this.error = `Error loading reports: ${error.status === 403 ? 'Not authorized' : 
                     error.status === 401 ? 'Not authenticated' : 'An error occurred'}`;
        this.initializeMockData();
        this.loading = false;
      }
    });
  }

  processReportData(reports: any[]): void {
    // Process real data instead of mock
    this.recentReports = reports.slice(0, 5).map(report => {
      return {
        id: report.id,
        title: report.title || 'Untitled Report',
        type: report.type || 'General',
        date: report.createdAt || new Date(),
        status: report.status || 'Pending'
      };
    });

    // Calculate statistics from actual data
    this.processReportStatistics(reports);
  }

  initializeMockData(): void {
    this.statistics = {
      total: 45,
      completed: 32,
      pending: 13,
      reportsThisMonth: 8,
      byType: {
        maintenance: 15,
        inspection: 10,
        repair: 12,
        replacement: 8
      }
    };

    this.recentReports = [
      {
        id: 1,
        type: 'Maintenance',
        designation: 'Centrifugal Pump',
        createdAt: '2023-04-15T10:30:00',
        isCompleted: false
      },
      {
        id: 2,
        type: 'Inspection',
        designation: 'AC Motor',
        createdAt: '2023-04-18T14:15:00',
        isCompleted: true
      },
      {
        id: 3,
        type: 'Repair',
        designation: 'Conveyor Belt',
        createdAt: '2023-04-20T09:45:00',
        isCompleted: false
      },
      {
        id: 4,
        type: 'Maintenance',
        designation: 'Control Panel',
        createdAt: '2023-04-22T11:30:00',
        isCompleted: true
      },
      {
        id: 5,
        type: 'Replacement',
        designation: 'Water Pump',
        createdAt: '2023-04-25T16:20:00',
        isCompleted: true
      }
    ];
    
    this.loading = false;
  }

  private processReportStatistics(reports: Report[]) {
    console.log('Dashboard: Processing report statistics');
    this.statistics.total = reports.length;
    this.statistics.completed = reports.filter(report => report.isCompleted).length;
    this.statistics.pending = reports.filter(report => !report.isCompleted).length;
    
    // Calculate reports for the current month
    const currentDate = new Date();
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    this.statistics.reportsThisMonth = reports.filter(report => 
      new Date(report.createdAt) >= firstDayOfMonth
    ).length;

    this.statistics.byType = {
      maintenance: 0,
      inspection: 0,
      repair: 0,
      replacement: 0
    };

    reports.forEach(report => {
      const type = report.type?.toLowerCase();
      if (type === 'maintenance') this.statistics.byType.maintenance++;
      else if (type === 'inspection') this.statistics.byType.inspection++;
      else if (type === 'repair') this.statistics.byType.repair++;
      else if (type === 'replacement') this.statistics.byType.replacement++;
    });
    
    console.log('Dashboard: Statistics processed', this.statistics);
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

  getPercentageForType(type: string): number {
    const total = this.statistics.total;
    if (!total) return 0;
    
    const value = this.statistics.byType[type as keyof typeof this.statistics.byType] || 0;
    return Math.round((value / total) * 100);
  }
} 