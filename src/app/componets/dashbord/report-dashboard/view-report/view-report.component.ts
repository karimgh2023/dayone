import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SharedModule } from '../../../../shared/common/sharedmodule';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReportService } from '../../../../services/report.service';
import { Report, StandardReportEntry, SpecificReportEntry, StandardReportEntryUpdateRequest, SpecificReportEntryUpdateRequest, User, Department } from '../../../../models/report.model';
import { NgSelectModule } from '@ng-select/ng-select';
import { CommonModule, DatePipe } from '@angular/common';
import { finalize } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

// Define local interfaces for report entries with simplified structure
interface ReportEntryDisplay {
  id: number;
  standardCriteria?: boolean | {
    description: string;
    implementationResponsible?: { name: string; id?: number };
    checkResponsible?: { name: string; id?: number };
  };
  specificCriteria?: boolean | {
    description: string;
    protocol?: { id: number; name: string; protocolType: string };
  };
  implemented?: boolean;
  homologation?: boolean;
  status?: string;
  action?: string;
  responsableAction?: string;
  deadline?: string;
  successControl?: string;
}

// Extended Report interface for template usage
interface ExtendedReport extends Report {
  // Homologation-specific fields
  initialVerificationDate?: string;
  equipmentCategory?: string;
  
  // Requalification-specific fields
  lastQualificationDate?: string;
  maintenanceFrequency?: string;
  
  // Aliases to handle naming inconsistencies in the template
  entries?: ReportEntryDisplay[];
  assignedUsers?: User[];
}

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
  report: ExtendedReport | null = null;
  loading: boolean = false;
  error: boolean = false;
  reportName: string = '';
  activeTab = 1;
  entryFilterType = 'all';
  specificEntryFilterType = 'all';
  standardEntries: StandardReportEntry[] = [];
  specificEntries: SpecificReportEntry[] = [];

  getStandardEntries(): ReportEntryDisplay[] {
    if (!this.report || !this.report.reportEntries) return [];
    
    const entries = this.report.reportEntries
      .filter(entry => 'standardCriteria' in entry)
      .map(entry => {
        const standardEntry = entry as StandardReportEntry;
        const result: ReportEntryDisplay = {
          id: entry.id,
          standardCriteria: typeof standardEntry.standardCriteria === 'object' ? {
            description: standardEntry.standardCriteria?.description || '',
            implementationResponsible: standardEntry.standardCriteria?.implementationResponsible ? {
              name: standardEntry.standardCriteria.implementationResponsible.name || '',
              id: standardEntry.standardCriteria.implementationResponsible.id
            } : undefined,
            checkResponsible: standardEntry.standardCriteria?.checkResponsible ? {
              name: standardEntry.standardCriteria.checkResponsible.name || '',
              id: standardEntry.standardCriteria.checkResponsible.id
            } : undefined
          } : false,
          implemented: standardEntry.implemented,
          status: entry.status,
          action: standardEntry.action,
          responsableAction: standardEntry.responsableAction,
          deadline: standardEntry.deadline,
          successControl: standardEntry.successControl
        };
        return result;
      });
      
    // Set the entries property for template compatibility
    if (this.report) {
      this.report.entries = [...entries, ...(this.getSpecificEntries())];
    }
    
    return entries;
  }

  getSpecificEntries(): ReportEntryDisplay[] {
    if (!this.report || !this.report.reportEntries) return [];
    
    const entries = this.report.reportEntries
      .filter(entry => 'specificCriteria' in entry)
      .map(entry => {
        const specificEntry = entry as SpecificReportEntry;
        const result: ReportEntryDisplay = {
          id: entry.id,
          specificCriteria: typeof specificEntry.specificCriteria === 'object' ? {
            description: specificEntry.specificCriteria?.description || '',
            protocol: specificEntry.specificCriteria?.protocol ? {
              id: specificEntry.specificCriteria.protocol.id,
              name: specificEntry.specificCriteria.protocol.name || '',
              protocolType: specificEntry.specificCriteria.protocol.protocolType || ''
            } : undefined
          } : false,
          homologation: specificEntry.homologation,
          status: entry.status,
          action: specificEntry.action,
          responsableAction: specificEntry.responsableAction,
          deadline: specificEntry.deadline,
          successControl: specificEntry.successControl
        };
        return result;
      });
      
    return entries;
  }

  getUsersAsArray(): User[] {
    if (!this.report || !this.report.reportUsers) return [];
    
    // Check if reportUsers is an array of numbers (IDs)
    if (this.report.reportUsers.length > 0 && typeof this.report.reportUsers[0] === 'number') {
      // If it's just IDs, we can't display user details directly
      return [];
    }
    
    // Otherwise, assume it's an array of UserAssignmentDTO that we can convert
    const users = this.report.reportUsers as unknown as User[];
    
    // Set the assignedUsers property for template compatibility
    if (this.report) {
      this.report.assignedUsers = users;
    }
    
    return users;
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private reportService: ReportService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.reportId = +params['id'];
      this.loadReport();
    });
  }

  loadReport(): void {
    this.loading = true;
    this.error = false;
    
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
            this.error = true;
            this.reportName = 'You are not authorized to view this report.';
          } else if (error.status === 401) {
            this.error = true;
            this.reportName = 'You need to be authenticated to view this report.';
          } else if (error.status === 404) {
            this.error = true;
            this.reportName = 'Report not found.';
          } else {
            this.error = true;
            this.reportName = 'Failed to load report. Please try again later.';
          }
          
          // Load mock data for demonstration purposes
          this.loadMockReport();
        }
      );
    } else {
      this.loading = false;
      this.error = true;
      this.reportName = 'No report ID provided.';
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
      protocol: {
        id: 1,
        name: 'Standard Maintenance Protocol',
        protocolType: 'Homologation',
        createdBy: adminUser
      },
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
      businessUnit: 'Production',
      
      // Extended fields for template
      initialVerificationDate: '2023-01-15',
      equipmentCategory: 'Pumping Equipment',
      lastQualificationDate: '2022-10-20',
      maintenanceFrequency: '6',
      
      // Set entries and assignedUsers for template compatibility
      entries: [],
      assignedUsers: []
    };
    
    // Initialize the entries and assignedUsers arrays
    this.standardEntries = this.getStandardEntries() as StandardReportEntry[];
    this.specificEntries = this.getSpecificEntries() as SpecificReportEntry[];
    this.getUsersAsArray();
  }

  updateEntryStatus(entry: ReportEntryDisplay): void {
    if (this.report?.isCompleted) return;
    
    this.loading = true;
    
    const updateData: StandardReportEntryUpdateRequest = {
      value: 'Implemented',
      conformity: true
    };
    
    this.reportService.updateStandardReportEntry(this.reportId, entry.id, updateData)
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: () => {
          this.loadReport(); // Reload the report to get updated data
          this.toastr.success('Entry status updated successfully');
        },
        error: (err) => {
          console.error('Error updating entry status:', err);
          this.toastr.error('Failed to update entry status');
        }
      });
  }

  updateSpecificEntryStatus(entry: ReportEntryDisplay): void {
    if (this.report?.isCompleted) return;
    
    this.loading = true;
    
    const updateData: SpecificReportEntryUpdateRequest = {
      value: 'Homologated',
      conformity: true
    };
    
    this.reportService.updateSpecificReportEntry(this.reportId, entry.id, updateData)
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: () => {
          this.loadReport(); // Reload the report to get updated data
          this.toastr.success('Specific entry status updated successfully');
        },
        error: (err) => {
          console.error('Error updating specific entry status:', err);
          this.toastr.error('Failed to update specific entry status');
        }
      });
  }

  isEntryResolved(entry: StandardReportEntry): boolean {
    return entry.status === 'resolved' || entry.implemented;
  }

  getTypeColor(): string {
    if (!this.report || !this.report.type) return 'secondary';
    switch (this.report.type.toLowerCase()) {
      case 'routine': return 'info';
      case 'preventive': return 'primary';
      case 'critical': return 'danger';
      default: return 'secondary';
    }
  }

  getStatusText(): string {
    if (!this.report) return 'Unknown';
    if (this.report.isCompleted) return 'Completed';
    if (this.getOverallProgress() > 50) return 'In Progress';
    return 'Pending';
  }

  getStatusColor(): string {
    if (!this.report) return 'secondary';
    if (this.report.isCompleted) return 'success';
    if (this.getOverallProgress() > 50) return 'primary';
    return 'warning';
  }

  getEntryStatusColor(entry: StandardReportEntry | SpecificReportEntry): string {
    if (!entry || !entry.status) return 'lightgray';
    
    switch(entry.status) {
      case 'not_started': return 'lightgray';
      case 'in_progress': return 'orange';
      case 'completed': return 'green';
      default: return 'lightgray';
    }
  }

  markReportAsCompleted(): void {
    if (this.report && !this.report.isCompleted) {
      this.loading = true;
      this.reportService.markReportAsCompleted(this.reportId)
        .pipe(finalize(() => this.loading = false))
        .subscribe({
          next: (updatedReport) => {
            this.report = updatedReport;
            this.toastr.success('Report marked as completed successfully');
          },
          error: (err) => {
            console.error('Error marking report as completed:', err);
            this.toastr.error('Failed to mark report as completed');
          }
        });
    }
  }

  getImplementedStandardCount(): number {
    return this.getStandardEntries().filter(entry => entry.implemented).length;
  }

  getNonImplementedStandardCount(): number {
    return this.getStandardEntries().filter(entry => !entry.implemented).length;
  }

  getImplementedSpecificCount(): number {
    return this.getSpecificEntries().filter(entry => entry.homologation).length;
  }

  getNonImplementedSpecificCount(): number {
    return this.getSpecificEntries().filter(entry => !entry.homologation).length;
  }

  getStandardImplementationPercentage(): number {
    const total = this.getStandardEntries().length;
    if (!total) return 0;
    return Math.round((this.getImplementedStandardCount() / total) * 100);
  }

  getSpecificImplementationPercentage(): number {
    const total = this.getSpecificEntries().length;
    if (!total) return 0;
    return Math.round((this.getImplementedSpecificCount() / total) * 100);
  }

  getOverallProgress(): number {
    const standardWeight = 0.6; // 60% weight to standard criteria
    const specificWeight = 0.4; // 40% weight to specific criteria
    
    const standardPercentage = this.getStandardImplementationPercentage();
    const specificPercentage = this.getSpecificImplementationPercentage();
    
    // If either type has no entries, give full weight to the other
    if (this.getStandardEntries().length === 0 && this.getSpecificEntries().length > 0) {
      return specificPercentage;
    }
    
    if (this.getSpecificEntries().length === 0 && this.getStandardEntries().length > 0) {
      return standardPercentage;
    }
    
    if (this.getStandardEntries().length === 0 && this.getSpecificEntries().length === 0) {
      return 0;
    }
    
    return Math.round((standardPercentage * standardWeight) + (specificPercentage * specificWeight));
  }

  getUserId(user: User): string {
    return user.id?.toString() || 'Unknown';
  }

  getUserDepartment(user: User): string {
    return user.department?.name || 'General';
  }

  getUserRole(user: User): string {
    return user.role || 'Assigned';
  }

  filterEntries(type: string): void {
    this.entryFilterType = type;
  }

  filterSpecificEntries(type: string): void {
    this.specificEntryFilterType = type;
  }

  getFilteredStandardEntries(): ReportEntryDisplay[] {
    const entries = this.getStandardEntries().filter(entry => entry != null);
    if (this.entryFilterType === 'all') return entries;
    if (this.entryFilterType === 'implemented') return entries.filter(entry => entry.implemented);
    if (this.entryFilterType === 'not-implemented') return entries.filter(entry => !entry.implemented);
    return entries;
  }

  getFilteredSpecificEntries(): ReportEntryDisplay[] {
    const entries = this.getSpecificEntries().filter(entry => entry != null);
    if (this.specificEntryFilterType === 'all') return entries;
    if (this.specificEntryFilterType === 'homologation') return entries.filter(entry => entry.homologation);
    if (this.specificEntryFilterType === 'non-homologation') return entries.filter(entry => !entry.homologation);
    return entries;
  }

  viewEntryDetails(entry: ReportEntryDisplay): void {
    console.log('View standard entry details:', entry);
  }

  viewSpecificEntryDetails(entry: ReportEntryDisplay): void {
    console.log('View specific entry details:', entry);
  }

  // Helper method to ensure we have valid data in the template
  hasReport(): boolean {
    return !!this.report && !this.loading;
  }

  // Helper method to safely get protocol type
  getProtocolType(): string {
    if (this.hasProtocol() && this.report?.protocol) {
      return this.report.protocol.protocolType || '';
    }
    return '';
  }

  // Helper method to check if protocol exists
  hasProtocol(): boolean {
    return !!this.report?.protocol;
  }

  // Helper method to check if maintenance form exists
  hasMaintenanceForm(): boolean {
    return !!this.report?.maintenanceForm;
  }

  // Helper methods for accessing maintenanceForm properties safely
  getMaintenanceFormControlStandard(): string {
    return this.report?.maintenanceForm?.controlStandard || 'N/A';
  }

  getMaintenanceFormCurrentType(): string {
    return this.report?.maintenanceForm?.currentType || 'N/A';
  }

  getMaintenanceFormPowerCircuit(): string {
    return this.report?.maintenanceForm?.powerCircuit || 'N/A';
  }

  getMaintenanceFormControlCircuit(): string {
    return this.report?.maintenanceForm?.controlCircuit || 'N/A';
  }

  hasMaintenanceFormTransformer(): boolean {
    return !!this.report?.maintenanceForm?.hasTransformer;
  }

  getMaintenanceFormMachineSizeHeight(): string {
    return this.report?.maintenanceForm?.machineSizeHeight || 'N/A';
  }

  getMaintenanceFormMachineSizeWidth(): string {
    return this.report?.maintenanceForm?.machineSizeWidth || 'N/A';
  }

  getMaintenanceFormMachineSizeLength(): string {
    return this.report?.maintenanceForm?.machineSizeLength || 'N/A';
  }

  isMaintenanceFormInOrder(): boolean {
    return !!this.report?.maintenanceForm?.isInOrder;
  }

  // Helper methods for template logic - moving complex logic from template to component
  isValidStandardCriteria(entry: ReportEntryDisplay | null): boolean {
    return !!entry?.standardCriteria && typeof entry.standardCriteria === 'object';
  }

  isValidStandardCriteriaWithImpl(entry: ReportEntryDisplay | null): boolean {
    return this.isValidStandardCriteria(entry) && 
      !!entry?.standardCriteria && 
      typeof entry.standardCriteria === 'object' && 
      !!entry.standardCriteria.implementationResponsible;
  }

  isValidStandardCriteriaWithCheck(entry: ReportEntryDisplay | null): boolean {
    return this.isValidStandardCriteria(entry) && 
      !!entry?.standardCriteria && 
      typeof entry.standardCriteria === 'object' && 
      !!entry.standardCriteria.checkResponsible;
  }

  isValidSpecificCriteria(entry: ReportEntryDisplay | null): boolean {
    return !!entry?.specificCriteria && typeof entry.specificCriteria === 'object';
  }

  getStandardCriteriaDescription(entry: ReportEntryDisplay): string {
    if (this.isValidStandardCriteria(entry) && 
        typeof entry.standardCriteria === 'object') {
      return entry.standardCriteria.description || 'No description';
    }
    return 'No description';
  }

  getImplementationResponsibleName(entry: ReportEntryDisplay): string {
    if (this.isValidStandardCriteriaWithImpl(entry) && 
        typeof entry.standardCriteria === 'object' && 
        entry.standardCriteria.implementationResponsible) {
      return entry.standardCriteria.implementationResponsible.name || 'N/A';
    }
    return 'N/A';
  }

  getCheckResponsibleName(entry: ReportEntryDisplay): string {
    if (this.isValidStandardCriteriaWithCheck(entry) && 
        typeof entry.standardCriteria === 'object' && 
        entry.standardCriteria.checkResponsible) {
      return entry.standardCriteria.checkResponsible.name || 'N/A';
    }
    return 'N/A';
  }

  getSpecificCriteriaDescription(entry: ReportEntryDisplay): string {
    if (this.isValidSpecificCriteria(entry) && 
        typeof entry.specificCriteria === 'object') {
      return entry.specificCriteria.description || 'No description';
    }
    return 'No description';
  }

  canMarkEntryImplemented(entry: ReportEntryDisplay): boolean {
    return !entry.implemented && !!this.report && !this.report.isCompleted;
  }

  canMarkEntryHomologated(entry: ReportEntryDisplay): boolean {
    return !entry.homologation && !!this.report && !this.report.isCompleted;
  }
} 