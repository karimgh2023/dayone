import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { ReportDTO } from '../../../../models/reportDTO.model';
import { ReportService } from '../../../../shared/services/report.service';


@Component({
  standalone: true,
  selector: 'app-view-reports',
  imports: [CommonModule, RouterModule, FormsModule, NgbTooltipModule],
  templateUrl: './view-reports.component.html',
  styleUrls: ['./view-reports.component.scss']
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

  constructor(private reportService: ReportService) {
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
    // This is a simplified calculation - in a real app, you'd need report completion data
    // For now, use a placeholder calculation based on the number of reports
    const totalReportCount = this.getTotalReports();
    if (totalReportCount === 0) return 0;
    
    // Just for demo purposes - simulate a completion rate
    // In a real application, you'd use actual completion data from the reports
    const completedCount = Math.floor(Math.random() * totalReportCount);
    
    return Math.round((completedCount / totalReportCount) * 100);
  }

  /**
   * Get status label for a report
   */
  getStatusLabel(report: ReportDTO): string {
    // Simplified status logic - in a real app you would use actual status data
    // Type assertion to handle potential property
    const anyReport = report as any;
    if (anyReport.status) {
      return anyReport.status;
    }
    
    // Placeholder logic - in a real application you'd use actual data from the report
    const randomStatus = Math.floor(Math.random() * 3);
    return ['En cours', 'Complété', 'En attente'][randomStatus];
  }

  /**
   * Get CSS class for status badge
   */
  getStatusBadgeClass(report: ReportDTO): string {
    const status = this.getStatusLabel(report);
    
    switch (status) {
      case 'Complété':
        return 'bg-success-transparent';
      case 'En cours':
        return 'bg-info-transparent';
      case 'En attente':
        return 'bg-warning-transparent';
      default:
        return 'bg-secondary-transparent';
    }
  }

  /**
   * Get progress percentage for a report
   */
  getReportProgress(report: ReportDTO): number {
    // Placeholder - in a real app, you would use actual completion data
    // For now, generate a random percentage between 0 and 100
    return Math.floor(Math.random() * 101);
  }

  /**
   * Download report as PDF
   */
  downloadReport(report: ReportDTO): void {
    // Placeholder - in a real app, you would implement the actual PDF download
    console.log(`Downloading report ${report.id} as PDF`);
    // Show a toast notification
    alert(`Téléchargement du rapport ${report.id} en cours...`);
  }

  /**
   * Get reports filtered by status from a specific set of reports
   */
  getFilteredReportsByStatus(reports: ReportDTO[], status: string): ReportDTO[] {
    return reports.filter(report => this.getStatusLabel(report) === status);
  }
}
