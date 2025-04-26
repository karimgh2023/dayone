import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ReportDTO } from '../../../../models/reportDTO.model';
import { ReportService } from '../../../../services/report.service';

@Component({
  standalone: true,
  selector: 'app-view-reports',
  imports: [CommonModule, RouterModule, FormsModule],
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
}
