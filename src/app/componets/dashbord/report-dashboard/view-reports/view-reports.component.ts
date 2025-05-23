import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { ReportDTO } from '../../../../models/reportDTO.model';
import { ReportService } from '../../../../shared/services/report.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { PdfService } from '../../../../shared/services/pdf.service';
import { forkJoin, of } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import { ReportEntryService } from '../../../../shared/services/report-entry.service';


@Component({
  standalone: true,
  selector: 'app-view-reports',
  imports: [CommonModule, RouterModule, FormsModule, NgbTooltipModule, ToastrModule],
  templateUrl: './view-reports.component.html',
  styleUrls: ['./view-reports.component.scss'],
  providers: [
    { provide: ToastrService, useClass: ToastrService }
  ]
})
export class ViewReportsComponent implements OnInit {
  createdReports: ReportDTO[] = [];
  assignedReports: ReportDTO[] = [];
  filteredCreatedReports: ReportDTO[] = [];
  filteredAssignedReports: ReportDTO[] = [];
  filteredAllReports: ReportDTO[] = [];

  userRole: string = '';
  createdReportsTypeFilter: string = '';
  assignedReportsTypeFilter: string = '';
  userEmail: string = '';
  currentView: string = 'list';
  activeTab: string = 'all';
  searchTerm: string = '';
  globalTypeFilter: string = '';
  isLoading: boolean = false;

  constructor(
    private reportService: ReportService,
    private reportEntryService: ReportEntryService,
    private pdfService: PdfService,
    private toastr: ToastrService,
    private router: Router
  ) {
    // Initialize empty collections
    this.filteredAllReports = [];
    this.filteredCreatedReports = [];
    this.filteredAssignedReports = [];
  }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    

    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      this.userRole = payload.role;
      this.userEmail = payload.sub || '';

      // ✅ Fetch only created reports if user is a DEPARTMENT_MANAGER
      if (this.userRole === 'DEPARTMENT_MANAGER') {
        this.fetchCreatedReports();
      }

      // ✅ Always fetch assigned reports
      this.fetchAssignedReports();
      
      // Default active tab is 'all'
      this.activeTab = 'all';
    }
  }

  /**
   * Set the current view mode (list or board)
   */
  setView(view: string): void {
    this.currentView = view;
  }

  /**
   * Set the active tab (all, created, assigned)
   */
  setActiveTab(tab: string): void {
    this.activeTab = tab;
    
    // Update the filtered reports based on the active tab
    if (tab === 'all') {
      this.applyGlobalFilter();
    } else if (tab === 'created') {
      this.applyCreatedReportsFilter();
    } else if (tab === 'assigned') {
      this.applyAssignedReportsFilter();
    }
  }

  /**
   * Get all reports (both created and assigned)
   */
  getAllReports(): ReportDTO[] {
    // Create a Map to handle potential duplicates
    const reportsMap = new Map<number, ReportDTO>();
    
    // Add all created reports
    this.createdReports.forEach(report => {
      reportsMap.set(report.id, report);
    });
    
    // Add all assigned reports (only if not already in the map)
    this.assignedReports.forEach(report => {
      if (!reportsMap.has(report.id)) {
        reportsMap.set(report.id, report);
      }
    });
    
    return Array.from(reportsMap.values());
  }

  /**
   * Apply global filter for all reports
   */
  applyGlobalFilter(): void {
    const allReports = this.getAllReports();
    this.filteredAllReports = allReports.filter(report => {
      // Type filter
      if (this.globalTypeFilter && report.type !== this.globalTypeFilter) {
        return false;
      }
      
      // Search term filter
      if (this.searchTerm) {
        const term = this.searchTerm.toLowerCase();
        return (
          report.id.toString().includes(term) ||
          report.serialNumber.toLowerCase().includes(term) ||
          (report.designation && report.designation.toLowerCase().includes(term)) ||
          (report.manufacturer && report.manufacturer.toLowerCase().includes(term))
        );
      }
      
      return true;
    });
    
    // Also update the other filtered collections with the same filters
    this.applyCreatedReportsFilter();
    this.applyAssignedReportsFilter();
  }

  /**
   * Get reports filtered by status
   */
  getAllReportsByStatus(status: string): ReportDTO[] {
    return this.getAllReports().filter(report => this.getStatusLabel(report) === status);
  }

  fetchCreatedReports(): void {
    this.reportService.getReportsCreatedByMe().subscribe({
      next: (reports: ReportDTO[]) => {
        this.createdReports = reports;
        this.filteredCreatedReports = [...this.createdReports];
        
        // Update the combined reports list
        this.filteredAllReports = this.getAllReports();
        this.applyGlobalFilter();
      },
      error: (err) => {
        console.error('Error fetching created reports:', err);
        this.toastr.error('Erreur lors du chargement des rapports créés', 'Erreur');
      }
    });
  }

  fetchAssignedReports(): void {
    this.reportService.getReportsAssignedToMe().subscribe({
      next: (reports: ReportDTO[]) => {
        // Fix missing createdByEmail in reports
        this.assignedReports = reports.map(report => {
          // If createdByEmail is missing, try to set it from other available sources
          if (!report.createdByEmail) {
            const createdBy = this.extractCreatedByFromReport(report);
            if (createdBy) {
              report.createdByEmail = createdBy;
            }
          }
          return report;
        });
        
        this.filteredAssignedReports = [...this.assignedReports];
        
        // Update the combined reports list to show proper total
        this.filteredAllReports = this.getAllReports();
        // Apply filters to ensure consistency
        this.applyGlobalFilter();
      },
      error: (err) => {
        console.error('Error fetching assigned reports:', err);
        this.toastr.error('Erreur lors du chargement des rapports assignés', 'Erreur');
      }
    });
  }

  /**
   * Extract creator email from various report structures
   */
  private extractCreatedByFromReport(report: any): string | null {
    // Try to access potential alternative structures
    if (report.createdBy && typeof report.createdBy === 'object') {
      if (report.createdBy.email) return report.createdBy.email;
      if (report.createdBy.mail) return report.createdBy.mail;
    }
    
    // Check for a creator in assignedUsers
    if (report.assignedUsers && Array.isArray(report.assignedUsers)) {
      const creator = report.assignedUsers.find((user: any) => 
        user.role === 'CREATOR' || user.role === 'DEPARTMENT_MANAGER'
      );
      
      if (creator && creator.email) {
        return creator.email;
      }
    }
    
    // If we have a creator name but no email, construct a placeholder
    if (report.createdByName) {
      return `${report.createdByName} (No Email)`;
    }
    
    return null;
  }

  /**
   * Get creator email with improved fallbacks
   */
  getCreatorEmail(report: ReportDTO): string {
    if (report.createdByEmail) {
      return report.createdByEmail;
    }
    
    const createdBy = this.extractCreatedByFromReport(report as any);
    if (createdBy) {
      return createdBy;
    }
    
    return 'Non spécifié';
  }

  /**
   * Apply type filter to created reports
   */
  applyCreatedReportsFilter(): void {
    this.filteredCreatedReports = this.createdReports.filter(report => {
      // Type filter
      if (this.globalTypeFilter && report.type !== this.globalTypeFilter) {
        return false;
      }
      
      // Search term filter
      if (this.searchTerm) {
        const term = this.searchTerm.toLowerCase();
        return (
          report.id.toString().includes(term) ||
          report.serialNumber.toLowerCase().includes(term) ||
          (report.designation && report.designation.toLowerCase().includes(term)) ||
          (report.manufacturer && report.manufacturer.toLowerCase().includes(term))
        );
      }
      
      return true;
    });
  }

  /**
   * Apply type filter to assigned reports
   */
  applyAssignedReportsFilter(): void {
    this.filteredAssignedReports = this.assignedReports.filter(report => {
      // Type filter
      if (this.globalTypeFilter && report.type !== this.globalTypeFilter) {
        return false;
      }
      
      // Search term filter
      if (this.searchTerm) {
        const term = this.searchTerm.toLowerCase();
        return (
          report.id.toString().includes(term) ||
          report.serialNumber.toLowerCase().includes(term) ||
          (report.designation && report.designation.toLowerCase().includes(term)) ||
          (report.manufacturer && report.manufacturer.toLowerCase().includes(term))
        );
      }
      
      return true;
    });
  }

  /**
   * Reset created reports filter
   */
  resetCreatedReportsFilter(): void {
    this.createdReportsTypeFilter = '';
    this.filteredCreatedReports = [...this.createdReports];
  }

  /**
   * Reset assigned reports filter
   */
  resetAssignedReportsFilter(): void {
    this.assignedReportsTypeFilter = '';
    this.filteredAssignedReports = [...this.assignedReports];
  }

  /**
   * Get logged in user email to highlight their assignment
   */
  getLoggedInUserEmail(): string {
    return this.userEmail;
  }

  /**
   * Get the total number of reports (created + assigned)
   */
  getTotalReports(): number {
    return this.getAllReports().length;
  }

  /**
   * Calculate the completion rate of all reports
   */
  getCompletionRate(): number {
    const allReports = this.getAllReports();
    if (allReports.length === 0) return 0;
    
    const totalProgress = allReports.reduce((sum, report) => sum + (report.progress || 0), 0);
    return Math.round(totalProgress / allReports.length);
  }

  /**
   * Get status label for a report
   */
  getStatusLabel(report: ReportDTO): string {
    const progress = this.getReportProgress(report);
    if (progress === 0) {
      return 'Non commencé';
    }
    if (progress === 100) {
      return 'Complété';
    }
    return 'En cours';
  }

  /**
   * Get CSS class for status badge
   */
  getStatusBadgeClass(report: ReportDTO): string {
    const progress = this.getReportProgress(report);
    if (progress === 0) {
      return 'bg-info';
    }
    if (progress === 100) {
      return 'bg-success';
    }
    return 'bg-warning';
  }

  /**
   * Get progress percentage for a report
   */
  getReportProgress(report: ReportDTO): number {
    return report.progress;
  }

  /**
   * Download report as PDF
   */
  downloadReport(report: ReportDTO): void {
    this.isLoading = true;

    // Create observables for all API calls
    const metadata$ = this.reportService.getReportMetadata(report.id);
    const standardChecklist$ = this.reportEntryService.getStandardChecklist(report.id);
    const specificChecklist$ = this.reportEntryService.getSpecificChecklist(report.id);
    const maintenanceForm$ = this.reportEntryService.getMaintenanceForm(report.id);
    const validationChecklist$ = this.reportEntryService.getValidationChecklist(report.id);

    // Combine all observables
    forkJoin({
      metadata: metadata$,
      standardChecklist: standardChecklist$,
      specificChecklist: specificChecklist$,
      maintenanceForm: maintenanceForm$,
      validationChecklist: validationChecklist$
    }).pipe(
      tap(({ metadata, standardChecklist, specificChecklist, maintenanceForm, validationChecklist }) => {
        // Generate PDF with all the data
        this.pdfService.generateReportPdf(
          report,
          standardChecklist,
          specificChecklist,
          validationChecklist,
          maintenanceForm.form
        );
      }),
      catchError(error => {
        console.error('[DOWNLOAD] Error fetching report data:', error);
        this.toastr.error('Erreur lors du téléchargement du rapport', 'Erreur');
        return of(null);
      }),
      finalize(() => {
        this.isLoading = false;
      })
    ).subscribe();
  }

  /**
   * Get reports filtered by status from a specific set of reports
   */
  getFilteredReportsByStatus(reports: ReportDTO[], status: string): ReportDTO[] {
    return reports.filter(report => {
      const reportStatus = this.getStatusLabel(report);
      // Map the old status to the new one for backward compatibility
      if (status === 'En attente') {
        return reportStatus === 'Non commencé';
      }
      return reportStatus === status;
    });
  }
}
