import { Component, OnInit, OnDestroy, ViewChild, TemplateRef, AfterViewInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../../../shared/common/sharedmodule';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgApexchartsModule } from 'ng-apexcharts';
import { NgCircleProgressModule } from 'ng-circle-progress';

import { Report } from '../../../../models/report.model';
import { ReportService } from '../../../../services/report.service.refactored';
import { ReportStateService } from '../../../../services/report-state.service';

// Import our reusable components - only the ones we actually use
import { TypeBadgeComponent } from '../../../../shared/components/reports/type-badge/type-badge.component';
import { StatusBadgeComponent } from '../../../../shared/components/reports/status-badge/status-badge.component';
import { LoadingIndicatorComponent } from '../../../../shared/components/reports/loading-indicator/loading-indicator.component';
import { ErrorAlertComponent } from '../../../../shared/components/reports/error-alert/error-alert.component';
import { StatisticCardComponent } from '../../../../shared/components/reports/statistic-card/statistic-card.component';
import { ReportFilterComponent } from '../../../../shared/components/reports/report-filter/report-filter.component';
import { DataTableComponent } from '../../../../shared/components/reports/data-table/data-table.component';
import { ReportActionsComponent } from '../../../../shared/components/reports/report-actions/report-actions.component';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

interface ReportStatistics {
  total: number;
  completed: number;
  pending: number;
  reportsThisMonth: number;
  byType: {
    maintenance: number;
    inspection: number;
    repair: number;
    replacement: number;
  };
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    NgbModule,
    RouterModule,
    NgApexchartsModule,
    NgCircleProgressModule,
    TypeBadgeComponent,
    StatusBadgeComponent,
    LoadingIndicatorComponent,
    ErrorAlertComponent,
    StatisticCardComponent,
    ReportFilterComponent,
    DataTableComponent,
    ReportActionsComponent
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
        <a [routerLink]="['../protocols']" class="btn btn-info btn-icon text-white me-2">
          <span>
            <i class="fe fe-list"></i>
          </span> Protocol Management
        </a>
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

    <app-error-alert [errorMessage]="error"></app-error-alert>
    <app-loading-indicator *ngIf="loading" message="Loading reports data..."></app-loading-indicator>

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
          <app-report-filter 
            [initialFilters]="{}" 
            (filtersChanged)="onFiltersChanged($event)"
          ></app-report-filter>
          
          <div class="card custom-card">
            <div class="card-header border-bottom">
              <h3 class="card-title">Recent Reports</h3>
            </div>
            <div class="card-body">
              <app-data-table
                [data]="recentReports"
                [columns]="reportsColumns"
                [loading]="loading"
              >
                <ng-template #typeCellTemplate let-report>
                  <app-type-badge [type]="report.type || ''"></app-type-badge>
                </ng-template>
                
                <ng-template #statusCellTemplate let-report>
                  <app-status-badge [status]="report.isCompleted !== undefined ? report.isCompleted : false"></app-status-badge>
                </ng-template>
                
                <ng-template #actionsCellTemplate let-report>
                  <app-report-actions 
                    [reportId]="report.id"
                    [actions]="[
                      { name: 'View', icon: 'eye', color: 'primary', action: 'view', enabled: true }
                    ]"
                    (actionTriggered)="onReportAction($event, report)"
                  ></app-report-actions>
                </ng-template>
                
                <div table-empty>
                  <button class="btn btn-primary" [routerLink]="['../new-report']">
                    <i class="fe fe-plus"></i> Create New Report
                  </button>
              </div>
              </app-data-table>
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
                    <span class="text-info">{{statistics.byType.replacement}}</span>
                  </div>
                </div>
                <div class="progress h-2">
                  <div class="progress-bar bg-info" [style.width.%]="getPercentageForType('replacement')"></div>
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
export class DashboardComponent implements OnInit, OnDestroy, AfterViewInit {
  statistics: ReportStatistics = {
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

  recentReports: Partial<Report>[] = [];
  loading: boolean = false;
  error: string = '';

  reportsColumns = [
    { 
      label: 'ID', 
      property: 'id' as keyof Report, 
      sortable: true,
      width: '80px'
    },
    { 
      label: 'Equipment', 
      property: 'designation' as keyof Report,
      sortable: true 
    },
    { 
      label: 'Type', 
      property: 'type' as keyof Report,
      sortable: true,
      cellTemplate: undefined as any // Will be set in ngOnInit
    },
    { 
      label: 'Created', 
      property: 'createdAt' as keyof Report,
      sortable: true 
    },
    { 
      label: 'Status', 
      property: 'isCompleted' as keyof Report,
      sortable: true,
      cellTemplate: undefined as any // Will be set in ngOnInit
    }
  ];
  
  private destroy$ = new Subject<void>();
  
  @ViewChild('typeCellTemplate') typeCellTemplate!: TemplateRef<any>;
  @ViewChild('statusCellTemplate') statusCellTemplate!: TemplateRef<any>;
  @ViewChild('actionsCellTemplate') actionsCellTemplate!: TemplateRef<any>;
  
  constructor(
    private reportService: ReportService,
    private reportStateService: ReportStateService
  ) { }

  ngOnInit(): void {
    this.loadReports();
    
    // Subscribe to loading and error states
    this.reportStateService.loading$
      .pipe(takeUntil(this.destroy$))
      .subscribe(loading => this.loading = loading);
      
    this.reportStateService.error$
      .pipe(takeUntil(this.destroy$))
      .subscribe(error => this.error = error || '');
  }
  
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  
  ngAfterViewInit(): void {
    // Connect cell templates after view init
    setTimeout(() => {
      const typeColumnIndex = this.reportsColumns.findIndex(col => col.property === 'type');
      const statusColumnIndex = this.reportsColumns.findIndex(col => col.property === 'isCompleted');
      
      if (typeColumnIndex >= 0 && this.typeCellTemplate) {
        this.reportsColumns[typeColumnIndex].cellTemplate = this.typeCellTemplate;
      }
      
      if (statusColumnIndex >= 0 && this.statusCellTemplate) {
        this.reportsColumns[statusColumnIndex].cellTemplate = this.statusCellTemplate;
      }
    });
  }

  loadReports(): void {
    this.reportStateService.setLoading(true);
    
    this.reportService.getAllReports()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (reports) => {
          this.processReportData(reports);
          this.reportStateService.setLoading(false);
        },
        error: (err) => {
          const errorMessage = err.message || 'Failed to load reports';
          this.reportStateService.setError(errorMessage);
          this.reportStateService.setLoading(false);
        }
      });
  }
  
  processReportData(reports: Report[]): void {
    // Get the 5 most recent reports
    this.recentReports = reports
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 5);
    
    // Process statistics
    this.processReportStatistics(reports);
  }

  processReportStatistics(reports: Report[]): void {
    // Calculate basic statistics
    this.statistics.total = reports.length;
    this.statistics.completed = reports.filter(r => r.isCompleted).length;
    this.statistics.pending = this.statistics.total - this.statistics.completed;
    
    // Calculate reports from this month
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    this.statistics.reportsThisMonth = reports.filter(r => {
      const reportDate = new Date(r.createdAt);
      return reportDate.getMonth() === currentMonth && reportDate.getFullYear() === currentYear;
    }).length;
    
    // Count reports by type
    this.statistics.byType = {
      maintenance: 0,
      inspection: 0,
      repair: 0,
      replacement: 0
    };

    reports.forEach(report => {
      const type = report.type?.toLowerCase() || '';
      
      if (type === 'maintenance') {
        this.statistics.byType.maintenance++;
      } else if (type === 'inspection') {
        this.statistics.byType.inspection++;
      } else if (type === 'repair') {
        this.statistics.byType.repair++;
      } else if (type === 'replacement') {
        this.statistics.byType.replacement++;
      }
    });
  }
  
  getPercentageForType(type: string): number {
    if (this.statistics.total === 0) {
      return 0;
    }
    
    const count = this.statistics.byType[type as keyof typeof this.statistics.byType] || 0;
    return Math.round((count / this.statistics.total) * 100);
  }
  
  onFiltersChanged(filters: any): void {
    console.log('Filters changed:', filters);
    // Here you would implement filter logic
    // For now, we'll just reload reports
    this.loadReports();
  }
  
  onReportAction(action: {action: string, customAction?: string}, report: Partial<Report>): void {
    console.log('Report action:', action, 'for report:', report);
    
    switch (action.action) {
      case 'delete':
        // Handle delete action
        if (report.id) {
          // Implement delete logic
          console.log('Deleting report:', report.id);
        }
        break;
      case 'complete':
        // Handle complete action
        if (report.id) {
          // Implement complete logic
          console.log('Completing report:', report.id);
        }
        break;
      // Add more cases as needed
    }
  }
} 