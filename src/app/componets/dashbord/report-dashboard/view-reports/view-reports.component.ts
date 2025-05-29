import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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
  providers: [{ provide: ToastrService, useClass: ToastrService }]
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
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');

    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      this.userRole = payload.role;
      this.userEmail = payload.sub || '';

      if (this.userRole === 'DEPARTMENT_MANAGER' || this.userRole === 'ADMIN') {
        this.fetchCreatedReports();
      }

      this.fetchAssignedReports();
      this.activeTab = 'all';
    }
  }

  fetchCreatedReports(): void {
    this.reportService.getReportsCreatedByMe().subscribe({
      next: (reports: ReportDTO[]) => {
        this.createdReports = reports;
        this.filteredCreatedReports = [...this.createdReports];
        this.filteredAllReports = this.getAllReports();
        this.applyGlobalFilter();
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.toastr.error('Erreur lors du chargement des rapports créés', 'Erreur');
        console.error(err);
      }
    });
  }

  fetchAssignedReports(): void {
    this.reportService.getReportsAssignedToMe().subscribe({
      next: (reports: ReportDTO[]) => {
        this.assignedReports = reports.map(report => {
          if (!report.createdByEmail) {
            const createdBy = this.extractCreatedByFromReport(report);
            if (createdBy) {
              report.createdByEmail = createdBy;
            }
          }
          return report;
        });

        this.filteredAssignedReports = [...this.assignedReports];
        this.filteredAllReports = this.getAllReports();
        this.applyGlobalFilter();
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.toastr.error('Erreur lors du chargement des rapports assignés', 'Erreur');
        console.error(err);
      }
    });
  }

  refreshReports(): void {
    this.fetchAssignedReports();
    if (this.userRole === 'DEPARTMENT_MANAGER') {
      this.fetchCreatedReports();
    }
  }

  setView(view: string): void {
    this.currentView = view;
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
    if (tab === 'all') this.applyGlobalFilter();
    else if (tab === 'created') this.applyCreatedReportsFilter();
    else if (tab === 'assigned') this.applyAssignedReportsFilter();
  }

  getAllReports(): ReportDTO[] {
    const reportsMap = new Map<number, ReportDTO>();
    this.createdReports.forEach(report => reportsMap.set(report.id, report));
    this.assignedReports.forEach(report => {
      if (!reportsMap.has(report.id)) reportsMap.set(report.id, report);
    });
    return Array.from(reportsMap.values());
  }

  applyGlobalFilter(): void {
    const allReports = this.getAllReports();
    this.filteredAllReports = allReports.filter(report => {
      if (this.globalTypeFilter && report.type !== this.globalTypeFilter) return false;
      if (this.searchTerm) {
        const term = this.searchTerm.toLowerCase();
        return report.id.toString().includes(term) ||
          report.serialNumber?.toLowerCase().includes(term) ||
          report.designation?.toLowerCase().includes(term) ||
          report.manufacturer?.toLowerCase().includes(term);
      }
      return true;
    });
    this.applyCreatedReportsFilter();
    this.applyAssignedReportsFilter();
  }

  applyCreatedReportsFilter(): void {
    this.filteredCreatedReports = this.createdReports.filter(report => {
      if (this.globalTypeFilter && report.type !== this.globalTypeFilter) return false;
      if (this.searchTerm) {
        const term = this.searchTerm.toLowerCase();
        return report.id.toString().includes(term) ||
          report.serialNumber?.toLowerCase().includes(term) ||
          report.designation?.toLowerCase().includes(term) ||
          report.manufacturer?.toLowerCase().includes(term);
      }
      return true;
    });
  }

  applyAssignedReportsFilter(): void {
    this.filteredAssignedReports = this.assignedReports.filter(report => {
      if (this.globalTypeFilter && report.type !== this.globalTypeFilter) return false;
      if (this.searchTerm) {
        const term = this.searchTerm.toLowerCase();
        return report.id.toString().includes(term) ||
          report.serialNumber?.toLowerCase().includes(term) ||
          report.designation?.toLowerCase().includes(term) ||
          report.manufacturer?.toLowerCase().includes(term);
      }
      return true;
    });
  }

  getStatusLabel(report: ReportDTO): string {
    const progress = this.getReportProgress(report);
    return progress === 0 ? 'Non commencé' : progress === 100 ? 'Complété' : 'En cours';
  }

  getStatusBadgeClass(report: ReportDTO): string {
    const progress = this.getReportProgress(report);
    return progress === 0 ? 'bg-info' : progress === 100 ? 'bg-success' : 'bg-warning';
  }

  getReportProgress(report: ReportDTO): number {
    return report.progress;
  }

  getCompletionRate(): number {
    const allReports = this.getAllReports();
    if (!allReports.length) return 0;
    const total = allReports.reduce((sum, r) => sum + (r.progress || 0), 0);
    return Math.round(total / allReports.length);
  }

  getCreatorEmail(report: ReportDTO): string {
    return report.createdByEmail || this.extractCreatedByFromReport(report) || 'Non spécifié';
  }

  extractCreatedByFromReport(report: any): string | null {
    if (report.createdBy?.email) return report.createdBy.email;
    if (report.createdBy?.mail) return report.createdBy.mail;
    const creator = report.assignedUsers?.find((u: any) =>
      u.role === 'CREATOR' || u.role === 'DEPARTMENT_MANAGER'
    );
    if (creator?.email) return creator.email;
    if (report.createdByName) return `${report.createdByName} (No Email)`;
    return null;
  }

  getFilteredReportsByStatus(reports: ReportDTO[], status: string): ReportDTO[] {
    return reports.filter(report => {
      const stat = this.getStatusLabel(report);
      return status === 'En attente' ? stat === 'Non commencé' : stat === status;
    });
  }

  downloadReport(report: ReportDTO): void {
    this.isLoading = true;
    forkJoin({
      metadata: this.reportService.getReportMetadata(report.id),
      standardChecklist: this.reportEntryService.getStandardChecklist(report.id),
      specificChecklist: this.reportEntryService.getSpecificChecklist(report.id),
      maintenanceForm: this.reportEntryService.getMaintenanceForm(report.id),
      validationChecklist: this.reportEntryService.getValidationChecklist(report.id)
    }).pipe(
      tap(({ standardChecklist, specificChecklist, maintenanceForm, validationChecklist }) => {
        this.pdfService.generateReportPdf(report, standardChecklist, specificChecklist, validationChecklist, maintenanceForm.form);
      }),
      catchError(error => {
        this.toastr.error('Erreur lors du téléchargement du rapport', 'Erreur');
        return of(null);
      }),
      finalize(() => this.isLoading = false)
    ).subscribe();
  }

  deleteReport(reportId: number): void {
    if (confirm('Are you sure you want to delete this report?')) {
      this.reportService.deleteReport(reportId).subscribe({
        next: () => {
          this.toastr.success('Report deleted successfully');
          this.refreshReports();
        },
        error: err => {
          this.toastr.error('Failed to delete the report.');
          console.error(err);
        }
      });
    }
  }
}
