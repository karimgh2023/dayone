import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { ReportDTO } from '../../../../models/reportDTO.model';
import { ReportService } from '../../../../services/report.service';

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
  userRole: string = '';
  createdReportsTypeFilter: string = '';
  assignedReportsTypeFilter: string = '';
  userEmail: string = '';

  constructor(private reportService: ReportService) {}

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
    }
  }

  fetchCreatedReports(): void {
    this.reportService.getReportsCreatedByMe().subscribe({
      next: (reports: ReportDTO[]) => {
        this.createdReports = reports;
        this.filteredCreatedReports = [...this.createdReports];
      },
      error: (err) => {
        console.error('Error fetching created reports:', err);
      }
    });
  }

  fetchAssignedReports(): void {
    this.reportService.getReportsAssignedToMe().subscribe({
      next: (reports: ReportDTO[]) => {
        this.assignedReports = reports;
        this.filteredAssignedReports = [...this.assignedReports];
        
        // Debug: check if createdByEmail exists in reports
        console.log('Assigned Reports:', this.assignedReports);
        this.assignedReports.forEach(report => {
          if (!report.createdByEmail) {
            console.warn(`Report #${report.id} missing createdByEmail:`, report);
          }
        });
      },
      error: (err) => {
        console.error('Error fetching assigned reports:', err);
      }
    });
  }

  /**
   * Apply type filter to created reports
   */
  applyCreatedReportsFilter(): void {
    if (!this.createdReportsTypeFilter) {
      this.filteredCreatedReports = [...this.createdReports];
    } else {
      this.filteredCreatedReports = this.createdReports.filter(
        report => report.type === this.createdReportsTypeFilter
      );
    }
  }

  /**
   * Apply type filter to assigned reports
   */
  applyAssignedReportsFilter(): void {
    if (!this.assignedReportsTypeFilter) {
      this.filteredAssignedReports = [...this.assignedReports];
    } else {
      this.filteredAssignedReports = this.assignedReports.filter(
        report => report.type === this.assignedReportsTypeFilter
      );
    }
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
   * Get creator email with fallbacks
   */
  getCreatorEmail(report: ReportDTO): string {
    if (report.createdByEmail) {
      return report.createdByEmail;
    }
    
    // Try to access potential alternative structures
    const reportAny = report as any;
    if (reportAny.createdBy && typeof reportAny.createdBy === 'object') {
      const createdBy = reportAny.createdBy;
      if (createdBy.email) return createdBy.email;
      if (createdBy.mail) return createdBy.mail;
    }
    
    // If we have a user with creator role, try to get their email
    const creator = report.assignedUsers?.find(user => {
      const userAny = user as any;
      return userAny.role === 'CREATOR' || userAny.role === 'DEPARTMENT_MANAGER';
    });
    
    if (creator) {
      return creator.email;
    }
    
    return 'Non spécifié';
  }

  /**
   * Get the total number of reports (created + assigned)
   */
  getTotalReports(): number {
    // Create a set of unique report IDs to avoid counting duplicates
    const reportIds = new Set<number>();
    
    this.createdReports.forEach(report => reportIds.add(report.id));
    this.assignedReports.forEach(report => reportIds.add(report.id));
    
    return reportIds.size;
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
}
