import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ReportService } from '../../../../services/report.service';
import { AuthService } from '../../../../services/auth.service';
import { Report, StandardReportEntry, SpecificReportEntry } from '../../../../models/report.model';
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
        this.standardEntries = this.filterAssignedEntries(entries);
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
        this.specificEntries = this.filterAssignedEntries(entries);
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
        this.hasMaintenanceForm = !!form;
        
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
  
  // Filter entries that are assigned to the current user
  filterAssignedEntries<T>(entries: T[]): T[] {
    // For demonstration purposes, we'll just return all entries
    // In a real implementation, filter based on the current user's department/role
    return entries;
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
    const currentUser = this.authService.getCurrentUser();
    let departmentName = '';
    
    if (currentUser && currentUser.department) {
      if (typeof currentUser.department === 'object' && currentUser.department !== null) {
        departmentName = (currentUser.department as any).name?.toLowerCase() || '';
      } else if (typeof currentUser.department === 'string') {
        departmentName = (currentUser.department as string).toLowerCase();
      }
    }
    
    if (departmentName === 'maintenance system') {
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
    } else if (departmentName === 'she') {
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