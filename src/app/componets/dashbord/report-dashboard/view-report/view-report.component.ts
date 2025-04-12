import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SharedModule } from '../../../../shared/common/sharedmodule';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReportService } from '../../../../services/report.service';
import { Report, StandardReportEntry, SpecificReportEntry, StandardReportEntryUpdateRequest, Protocol, User, Department, UserAssignmentDTO } from '../../../../models/report.model';
import { NgSelectModule } from '@ng-select/ng-select';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-view-report',
  standalone: true,
  imports: [
    SharedModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgSelectModule,
    CommonModule
  ],
  providers: [DatePipe],
  templateUrl: './view-report.component.html',
  styleUrls: ['./view-report.component.scss']
})
export class ViewReportComponent implements OnInit {
  reportId!: number;
  report: any = {};
  loading: boolean = false;
  error: string = '';
  activeTab = 1;

  // Helper methods for template typing
  isStandardEntry(entry: StandardReportEntry | SpecificReportEntry): entry is StandardReportEntry {
    return 'standardCriteria' in entry;
  }

  isSpecificEntry(entry: StandardReportEntry | SpecificReportEntry): entry is SpecificReportEntry {
    return 'specificCriteria' in entry;
  }

  getStandardEntries(): StandardReportEntry[] {
    if (!this.report || !this.report.reportEntries) return [];
    return this.report.reportEntries.filter((entry: any) => 
      this.isStandardEntry(entry)) as StandardReportEntry[];
  }

  getSpecificEntries(): SpecificReportEntry[] {
    if (!this.report || !this.report.reportEntries) return [];
    return this.report.reportEntries.filter((entry: any) => 
      this.isSpecificEntry(entry)) as SpecificReportEntry[];
  }

  // Helper method to ensure report.reportUsers is treated as an array to iterate in *ngFor
  getUsersAsArray(): (number | UserAssignmentDTO)[] {
    if (!this.report || !this.report.reportUsers) return [];
    return Array.isArray(this.report.reportUsers) ? this.report.reportUsers : [];
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private reportService: ReportService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.reportId = +params['id'];
      this.loadReport();
    });
  }

  loadReport(): void {
    this.loading = true;
    this.error = '';
    
    const reportId = this.route.snapshot.paramMap.get('id');
    if (reportId) {
      this.reportService.getReportById(Number(reportId)).subscribe(
        (response: any) => {
          this.loading = false;
          if (response && response.body) {
            this.report = response.body;
            console.log('Report loaded:', this.report);
          } else {
            console.log('No report data received, loading mock data');
            this.loadMockReport();
          }
        },
        (error: any) => {
          this.loading = false;
          console.error('Error loading report:', error);
          
          // Handle different error scenarios
          if (error.status === 403) {
            this.error = 'You are not authorized to view this report.';
          } else if (error.status === 401) {
            this.error = 'You need to be authenticated to view this report.';
          } else if (error.status === 404) {
            this.error = 'Report not found.';
          } else {
            this.error = 'Failed to load report. Please try again later.';
          }
          
          // Load mock data for demonstration purposes
          this.loadMockReport();
        }
      );
    } else {
      this.loading = false;
      this.error = 'No report ID provided.';
      this.loadMockReport();
    }
  }

  loadMockReport(): void {
    // Create helper objects
    const maintDept: Department = { id: 1, name: 'Maintenance' };
    const safetyDept: Department = { id: 2, name: 'Safety' };
    
    const adminUser: User = {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'admin@example.com',
      username: 'admin',
      department: maintDept,
      role: 'DEPARTMENT_MANAGER'
    };
    
    const protocol: Protocol = {
      id: 1,
      name: 'Standard Maintenance Protocol',
      protocolType: 'Homologation',
      createdBy: adminUser
    };
    
    // Mock entries as StandardReportEntry objects
    const entries: StandardReportEntry[] = [
      {
        id: 1,
        reportId: this.reportId,
        standardCriteriaId: 1,
        standardCriteria: {
          id: 1,
          description: 'Check motor connections',
          implementationResponsible: maintDept,
          checkResponsible: maintDept
        },
        implemented: true,
        action: '',
        responsableAction: '',
        deadline: '',
        successControl: ''
      },
      {
        id: 2,
        reportId: this.reportId,
        standardCriteriaId: 2,
        standardCriteria: {
          id: 2,
          description: 'Inspect for wear and tear',
          implementationResponsible: maintDept,
          checkResponsible: safetyDept
        },
        implemented: false,
        action: 'Replace worn parts',
        responsableAction: 'Maintenance Team',
        deadline: '2023-05-30',
        successControl: 'Visual inspection and test run'
      }
    ];
    
    // Mock detailed report for UI display
    this.report = {
      id: this.reportId,
      type: 'Maintenance',
      protocol: protocol,
      createdBy: adminUser,
      reportUsers: [2, 3], // Just store user IDs
      reportEntries: entries,
      createdAt: '2023-04-15T10:30:00',
      isCompleted: false,
      serialNumber: 'EQ-12345',
      equipmentDescription: 'Industrial centrifugal pump used for coolant circulation in the main production line. The pump has been showing signs of reduced performance over the last month.',
      designation: 'Centrifugal Pump',
      manufacturer: 'Grundfos',
      immobilization: 'No',
      serviceSeg: 'A1',
      businessUnit: 'Production'
    };
  }

  updateEntryStatus(entry: StandardReportEntry): void {
    // TODO: Implement status update logic
    console.log('Updating entry status:', entry);
    // Set a default status if it doesn't exist
    if (!entry.status) {
      entry.status = entry.implemented ? 'resolved' : 'pending';
    }
  }

  isEntryResolved(entry: StandardReportEntry): boolean {
    return entry.status === 'resolved' || entry.implemented;
  }

  getTypeColor(): string {
    if (!this.report) return 'info';
    
    switch (this.report.type.toLowerCase()) {
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

  getStatusText(): string {
    return this.report?.isCompleted ? 'Completed' : 'In Progress';
  }

  getStatusColor(): string {
    return this.report?.isCompleted ? 'success' : 'primary';
  }
} 