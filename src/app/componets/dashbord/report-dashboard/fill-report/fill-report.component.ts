import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ReportService } from '../../../../services/report.service';
import { AuthService } from '../../../../services/auth.service';
import { Report, StandardReportEntry, SpecificReportEntry } from '../../../../models/report.model';
import { User } from '../../../../models/user.model';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-fill-report',
  templateUrl: './fill-report.component.html',
  styleUrls: ['./fill-report.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule
  ]
})
export class FillReportComponent implements OnInit {
  reportId: number | null = null;
  report: Report | null = null;
  standardEntries: StandardReportEntry[] = [];
  specificEntries: SpecificReportEntry[] = [];
  loading: boolean = true;
  error: string | null = null;
  activeStep: number = 1; // 1: Standard entries, 2: Maintenance form, 3: Specific entries
  maintenanceForm: any = null;
  hasStandardEntries: boolean = false;
  hasSpecificEntries: boolean = false;
  hasMaintenanceForm: boolean = false;
  currentUser: User | null = null;
  
  // Form for filling report entries
  standardEntryForms: { [id: number]: FormGroup } = {};
  specificEntryForms: { [id: number]: FormGroup } = {};
  maintenanceFormGroup: FormGroup | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private reportService: ReportService,
    private authService: AuthService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    // Get current user
    this.currentUser = this.authService.getCurrentUser();
    
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        this.reportId = +idParam;
        this.loadReport();
      } else {
        this.error = 'Report ID is missing';
        this.loading = false;
      }
    });
  }

  // Get the user's department ID safely
  private getUserDepartmentId(): number | null {
    if (!this.currentUser || !this.currentUser.department) {
      return null;
    }
    
    if (typeof this.currentUser.department === 'string') {
      const deptId = parseInt(this.currentUser.department);
      return isNaN(deptId) ? null : deptId;
    } else if (typeof this.currentUser.department === 'object') {
      return (this.currentUser.department as any).id || null;
    }
    
    return null;
  }
  
  // Get the user's department name safely
  private getUserDepartmentName(): string {
    if (!this.currentUser || !this.currentUser.department) {
      return '';
    }
    
    if (typeof this.currentUser.department === 'string') {
      return this.currentUser.department.toLowerCase();
    } else if (typeof this.currentUser.department === 'object') {
      return ((this.currentUser.department as any).name || '').toLowerCase();
    }
    
    return '';
  }

  loadReport(): void {
    if (!this.reportId) return;
    
    this.loading = true;
    this.error = null;
    
    this.reportService.getReportById(this.reportId).subscribe({
      next: (report) => {
        this.report = report;
        this.loadAssignedEntries();
      },
      error: (err: any) => {
        this.error = 'Failed to load report: ' + (err.error?.message || err.message);
        this.loading = false;
      }
    });
  }

  loadAssignedEntries(): void {
    if (!this.reportId) return;
    
    // In a real implementation, these would be separate API calls to get only entries assigned to current user
    // For now, we'll use the report's entries and filter them client-side
    
    // Load standard entries
    this.reportService.getStandardEntries(this.reportId).subscribe({
      next: (entries: StandardReportEntry[]) => {
        // Filter entries assigned to current user
        this.standardEntries = this.filterAssignedStandardEntries(entries);
        this.hasStandardEntries = this.standardEntries.length > 0;
        
        // Initialize forms for each entry
        this.initializeStandardEntryForms();
        
        // Load specific entries
        this.loadSpecificEntries();
      },
      error: (err: any) => {
        this.error = 'Failed to load standard entries: ' + (err.error?.message || err.message);
        this.loading = false;
      }
    });
  }
  
  loadSpecificEntries(): void {
    if (!this.reportId) return;
    
    this.reportService.getSpecificEntries(this.reportId).subscribe({
      next: (entries: SpecificReportEntry[]) => {
        // Filter entries assigned to current user
        this.specificEntries = this.filterAssignedSpecificEntries(entries);
        this.hasSpecificEntries = this.specificEntries.length > 0;
        
        // Initialize forms for each entry
        this.initializeSpecificEntryForms();
        
        // Load maintenance form if applicable
        this.loadMaintenanceForm();
      },
      error: (err: any) => {
        this.error = 'Failed to load specific entries: ' + (err.error?.message || err.message);
        this.loading = false;
      }
    });
  }
  
  loadMaintenanceForm(): void {
    if (!this.reportId) return;
    
    this.reportService.getMaintenanceForm(this.reportId).subscribe({
      next: (form) => {
        this.maintenanceForm = form;
        this.hasMaintenanceForm = !!form && this.hasAssignedMaintenanceForm();
        
        // Initialize maintenance form
        if (this.hasMaintenanceForm) {
          this.initializeMaintenanceForm();
        }
        
        this.loading = false;
      },
      error: (err) => {
        // Not all reports have maintenance forms, so this isn't necessarily an error
        this.hasMaintenanceForm = false;
        this.loading = false;
      }
    });
  }
  
  // Filter standard entries assigned to the current user
  filterAssignedStandardEntries(entries: StandardReportEntry[]): StandardReportEntry[] {
    const userDeptId = this.getUserDepartmentId();
    if (!userDeptId) return [];
    
    // For now, return all entries since we don't have a proper filter criterion in the model
    // In a real app, you would filter based on the user's department or role
    return entries;
  }
  
  // Filter specific entries assigned to the current user
  filterAssignedSpecificEntries(entries: SpecificReportEntry[]): SpecificReportEntry[] {
    const userDeptId = this.getUserDepartmentId();
    if (!userDeptId) return [];
    
    return entries.filter(entry => {
      // Check if the entry has checkResponsible and if the user's department is in it
      if (entry.criteria && entry.criteria.checkResponsible) {
        if (Array.isArray(entry.criteria.checkResponsible)) {
          return entry.criteria.checkResponsible.some((dept: any) => dept.id === userDeptId);
        } else {
          return entry.criteria.checkResponsible.id === userDeptId;
        }
      }
      return false;
    });
  }
  
  // Check if user is assigned to maintenance form
  hasAssignedMaintenanceForm(): boolean {
    if (!this.maintenanceForm) return false;
    
    // Check if user's department is responsible for any step of the maintenance form
    return this.hasAssignedMaintenanceFormStep(1) || this.hasAssignedMaintenanceFormStep(2);
  }
  
  // Check if user is assigned to a specific maintenance form step
  hasAssignedMaintenanceFormStep(step: number): boolean {
    if (!this.maintenanceForm) return false;
    
    const deptName = this.getUserDepartmentName();
    
    // Check based on department name (this is a simplification - in a real app, you'd use IDs)
    if (step === 1 && deptName === 'maintenance system') {
      return true;
    } else if (step === 2 && deptName === 'she') {
      return true;
    }
    
    return false;
  }
  
  // Initialize forms for standard entries
  initializeStandardEntryForms(): void {
    this.standardEntries.forEach(entry => {
      this.standardEntryForms[entry.id] = this.fb.group({
        isImplemented: [entry.isImplemented],
        action: [entry.action, Validators.maxLength(500)],
        deadline: [entry.deadline],
        successControl: [entry.successControl, Validators.maxLength(500)]
      });
    });
  }
  
  // Initialize forms for specific entries
  initializeSpecificEntryForms(): void {
    this.specificEntries.forEach(entry => {
      this.specificEntryForms[entry.id] = this.fb.group({
        isImplemented: [entry.isImplemented],
        action: [entry.action, Validators.maxLength(500)],
        deadline: [entry.deadline],
        successControl: [entry.successControl, Validators.maxLength(500)]
      });
    });
  }
  
  // Initialize maintenance form
  initializeMaintenanceForm(): void {
    // Create form based on user's department
    const deptName = this.getUserDepartmentName();
    
    if (deptName === 'maintenance system') {
      this.maintenanceFormGroup = this.fb.group({
        controlStandard: [this.maintenanceForm.controlStandard],
        currentType: [this.maintenanceForm.currentType],
        networkForm: [this.maintenanceForm.networkForm],
        powerCircuit: [this.maintenanceForm.powerCircuit],
        controlCircuit: [this.maintenanceForm.controlCircuit],
        fuseValue: [this.maintenanceForm.fuseValue],
        hasTransformer: [this.maintenanceForm.hasTransformer],
        frequency: [this.maintenanceForm.frequency],
        phaseBalanceTest380v: [this.maintenanceForm.phaseBalanceTest380v],
        phaseBalanceTest210v: [this.maintenanceForm.phaseBalanceTest210v],
        insulationResistanceMotor: [this.maintenanceForm.insulationResistanceMotor],
        insulationResistanceCable: [this.maintenanceForm.insulationResistanceCable],
        machineSizeHeight: [this.maintenanceForm.machineSizeHeight],
        machineSizeLength: [this.maintenanceForm.machineSizeLength],
        machineSizeWidth: [this.maintenanceForm.machineSizeWidth]
      });
    } else if (deptName === 'she') {
      this.maintenanceFormGroup = this.fb.group({
        isInOrder: [this.maintenanceForm.isInOrder]
      });
    }
  }
  
  // Submit a standard entry
  submitStandardEntry(entryId: number): void {
    if (!this.reportId || !this.standardEntryForms[entryId]) return;
    
    const formValue = this.standardEntryForms[entryId].value;
    
    this.reportService.updateStandardEntry(
      this.reportId, 
      entryId, 
      {
        isImplemented: formValue.isImplemented,
        action: formValue.action,
        deadline: formValue.deadline,
        successControl: formValue.successControl,
        isUpdated: true
      }
    ).subscribe({
      next: (updatedEntry) => {
        // Update the entry in the list
        const index = this.standardEntries.findIndex(e => e.id === entryId);
        if (index !== -1) {
          this.standardEntries[index] = { ...this.standardEntries[index], ...updatedEntry, isUpdated: true };
          
          // Disable the form
          this.standardEntryForms[entryId].disable();
        }
      },
      error: (err) => {
        this.error = 'Failed to update entry: ' + (err.error?.message || err.message);
      }
    });
  }
  
  // Submit a specific entry
  submitSpecificEntry(entryId: number): void {
    if (!this.reportId || !this.specificEntryForms[entryId]) return;
    
    const formValue = this.specificEntryForms[entryId].value;
    
    this.reportService.updateSpecificEntry(
      this.reportId, 
      entryId, 
      {
        isImplemented: formValue.isImplemented,
        action: formValue.action,
        deadline: formValue.deadline,
        successControl: formValue.successControl,
        isUpdated: true
      }
    ).subscribe({
      next: (updatedEntry) => {
        // Update the entry in the list
        const index = this.specificEntries.findIndex(e => e.id === entryId);
        if (index !== -1) {
          this.specificEntries[index] = { ...this.specificEntries[index], ...updatedEntry, isUpdated: true };
          
          // Disable the form
          this.specificEntryForms[entryId].disable();
        }
      },
      error: (err) => {
        this.error = 'Failed to update entry: ' + (err.error?.message || err.message);
      }
    });
  }
  
  // Submit the maintenance form
  submitMaintenanceForm(): void {
    if (!this.reportId || !this.maintenanceFormGroup) return;
    
    const formValue = this.maintenanceFormGroup.value;
    
    this.reportService.updateMaintenanceForm(this.reportId, formValue).subscribe({
      next: (updatedForm) => {
        this.maintenanceForm = updatedForm;
        
        // Disable the form
        if (this.maintenanceFormGroup) {
          this.maintenanceFormGroup.disable();
        }
      },
      error: (err) => {
        this.error = 'Failed to update maintenance form: ' + (err.error?.message || err.message);
      }
    });
  }
  
  // Navigate to the next step
  nextStep(): void {
    if (this.activeStep < 3) {
      this.activeStep++;
    }
  }
  
  // Navigate to the previous step
  previousStep(): void {
    if (this.activeStep > 1) {
      this.activeStep--;
    }
  }
  
  // Check if all entries have been updated
  allEntriesUpdated(): boolean {
    const standardUpdated = this.hasStandardEntries ? 
      this.standardEntries.every(entry => entry.isUpdated === true) : true;
    
    const specificUpdated = this.hasSpecificEntries ? 
      this.specificEntries.every(entry => entry.isUpdated === true) : true;
    
    const maintenanceUpdated = this.hasMaintenanceForm ? 
      this.maintenanceFormGroup !== null && this.maintenanceFormGroup.disabled : true;
    
    // If the user has no entries to fill, consider them updated
    return standardUpdated && specificUpdated && maintenanceUpdated;
  }
  
  // Sign and submit the report
  signAndSubmit(): void {
    if (!this.reportId) return;
    
    // In a real implementation, this would make a final API call to mark the user's part as complete
    this.router.navigate(['/dashboard/report-dashboard/view-report', this.reportId]);
  }

  onEntryUpdated(entry: StandardReportEntry | SpecificReportEntry, isStandard: boolean): void {
    entry.isUpdated = !entry.isUpdated;
    
    if (isStandard) {
      this.reportService.updateStandardEntry(
        this.report!.id,
        entry.id,
        {
          id: entry.id,
          reportId: this.report!.id,
          checked: entry.isUpdated
        }
      ).subscribe(() => {
        console.log('Standard entry updated successfully');
      });
    } else {
      this.reportService.updateSpecificEntry(
        this.report!.id,
        entry.id,
        {
          id: entry.id,
          reportId: this.report!.id,
          checked: entry.isUpdated
        }
      ).subscribe(() => {
        console.log('Specific entry updated successfully');
      });
    }
  }
} 