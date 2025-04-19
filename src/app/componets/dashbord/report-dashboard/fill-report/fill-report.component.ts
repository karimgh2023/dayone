import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ReportService } from '../../../../services/report.service';
import { AuthService } from '../../../../services/auth.service';
import { Report, StandardReportEntry, SpecificReportEntry } from '../../../../models/report.model';
import { User } from '../../../../models/user.model';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-fill-report',
  templateUrl: './fill-report.component.html',
  styleUrls: ['./fill-report.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    ToastrService
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
  
  // Signature tracking
  stepSignatures: { [key: number]: { name: string, timestamp: string } } = {};
  signatureModalVisible: boolean = false;
  currentSigningStep: number = 0;
  signatureName: string = '';
  
  // Form for filling report entries
  standardEntryForms: { [id: number]: FormGroup } = {};
  specificEntryForms: { [id: number]: FormGroup } = {};
  maintenanceFormGroup: FormGroup | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private reportService: ReportService,
    private authService: AuthService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    // Get current user
    this.currentUser = this.authService.getCurrentUser();
    
    // Initialize signature with current user's name
    this.initializeSignatureName();
    
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        this.reportId = +idParam;
        // Load any saved signatures from localStorage
        this.loadSavedSignatures();
        this.loadReport();
      } else {
        this.error = 'Report ID is missing';
        this.loading = false;
      }
    });
  }

  // Load any previously saved signatures from localStorage
  loadSavedSignatures(): void {
    if (!this.reportId) return;
    
    try {
      const savedSignatures = localStorage.getItem(`report_signatures_${this.reportId}`);
      if (savedSignatures) {
        this.stepSignatures = JSON.parse(savedSignatures);
      }
    } catch (e) {
      console.error('Failed to load saved signatures', e);
    }
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
    const isImplemented = !!formValue.isImplemented;
    
    // Only require action, deadline, and successControl if not implemented
    if (!isImplemented && (!formValue.action || !formValue.deadline || !formValue.successControl)) {
      this.error = 'Please fill in all required fields for non-implemented entries.';
      return;
    }
    
    this.loading = true;
    
    this.reportService.updateStandardEntry(
      this.reportId, 
      entryId, 
      {
        isImplemented: isImplemented,
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
          
          // Show success message
          this.error = null;
          this.toastr.success('Standard entry updated successfully');
        }
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to update entry: ' + (err.error?.message || err.message);
        this.loading = false;
      }
    });
  }
  
  // Submit a specific entry
  submitSpecificEntry(entryId: number): void {
    if (!this.reportId || !this.specificEntryForms[entryId]) return;
    
    const formValue = this.specificEntryForms[entryId].value;
    const isImplemented = !!formValue.isImplemented;
    
    // Only require action, deadline, and successControl if not implemented
    if (!isImplemented && (!formValue.action || !formValue.deadline || !formValue.successControl)) {
      this.error = 'Please fill in all required fields for non-implemented entries.';
      return;
    }
    
    this.loading = true;
    
    this.reportService.updateSpecificEntry(
      this.reportId, 
      entryId, 
      {
        isImplemented: isImplemented,
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
          
          // Show success message
          this.error = null;
          this.toastr.success('Specific entry updated successfully');
        }
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to update entry: ' + (err.error?.message || err.message);
        this.loading = false;
      }
    });
  }
  
  // Submit the maintenance form
  submitMaintenanceForm(): void {
    if (!this.reportId || !this.maintenanceFormGroup) return;
    
    // Check form validity
    if (this.maintenanceFormGroup.invalid) {
      this.error = 'Please fill all required fields in the maintenance form.';
      return;
    }
    
    this.loading = true;
    const formValue = this.maintenanceFormGroup.value;
    
    this.reportService.updateMaintenanceForm(this.reportId, formValue).subscribe({
      next: (updatedForm) => {
        this.maintenanceForm = updatedForm;
        
        // Disable the form
        if (this.maintenanceFormGroup) {
          this.maintenanceFormGroup.disable();
        }
        
        // Show success message
        this.error = null;
        this.toastr.success('Maintenance form updated successfully');
        
        // Add an isUpdated flag to the maintenance form to track completion
        this.maintenanceForm.isUpdated = true;
        
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to update maintenance form: ' + (err.error?.message || err.message);
        this.loading = false;
      }
    });
  }
  
  // Navigate to the next step
  nextStep(): void {
    // Check if current step is signed before proceeding
    if (!this.isStepSigned(this.activeStep)) {
      this.currentSigningStep = this.activeStep;
      this.signatureModalVisible = true;
      return;
    }
    
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
  
  // Check if a step has been signed
  isStepSigned(step: number): boolean {
    return !!this.stepSignatures[step] && !!this.stepSignatures[step].name;
  }
  
  // Get the signature name for a step
  getSignatureName(step: number): string {
    return this.stepSignatures[step]?.name || '';
  }
  
  // Get formatted timestamp for a signature
  getSignatureTimestamp(step: number): string {
    if (!this.stepSignatures[step]?.timestamp) return '';
    
    try {
      const date = new Date(this.stepSignatures[step].timestamp);
      return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
    } catch (e) {
      return '';
    }
  }
  
  // Open signature modal for a specific step
  openSignatureModal(step: number): void {
    this.currentSigningStep = step;
    this.signatureModalVisible = true;
  }
  
  // Close signature modal without signing
  cancelSignature(): void {
    this.signatureModalVisible = false;
    this.signatureName = '';
  }
  
  // Submit signature for current step
  submitSignature(): void {
    if (!this.signatureName.trim()) {
      this.toastr.error('Please enter your full name to sign');
      return;
    }
    
    // Save signature with timestamp
    this.stepSignatures[this.currentSigningStep] = { name: this.signatureName, timestamp: new Date().toISOString() };
    
    // Save to localStorage
    if (this.reportId) {
      try {
        localStorage.setItem(`report_signatures_${this.reportId}`, JSON.stringify(this.stepSignatures));
      } catch (e) {
        console.error('Failed to save signatures to localStorage', e);
      }
    }
    
    // In a real implementation, this would make an API call to save the signature
    // this.reportService.saveStepSignature(this.reportId, this.currentSigningStep, this.signatureName)
    
    this.toastr.success('Step signed successfully');
    this.signatureModalVisible = false;
    this.signatureName = '';
    
    // If this was called from nextStep, proceed to next step
    if (this.currentSigningStep === this.activeStep && this.activeStep < 3) {
      this.activeStep++;
    }
  }
  
  // Initialize signature name with current user if available
  initializeSignatureName(): void {
    if (this.currentUser) {
      this.signatureName = `${this.currentUser.firstName || ''} ${this.currentUser.lastName || ''}`.trim();
    }
  }
  
  // Check if all entries have been updated
  allEntriesUpdated(): boolean {
    const standardUpdated = this.hasStandardEntries ? 
      this.standardEntries.every(entry => entry.isUpdated === true) : true;
    
    const specificUpdated = this.hasSpecificEntries ? 
      this.specificEntries.every(entry => entry.isUpdated === true) : true;
    
    const maintenanceUpdated = this.hasMaintenanceForm ? 
      this.maintenanceForm && this.maintenanceForm.isUpdated === true : true;
    
    // If the user has no entries to fill, consider them updated
    return standardUpdated && specificUpdated && maintenanceUpdated;
  }
  
  // Sign and submit the report
  signAndSubmit(): void {
    if (!this.reportId) return;
    
    // Check if all assigned entries have been updated
    if (!this.allEntriesUpdated()) {
      this.error = 'Please complete all assigned entries before submitting';
      this.toastr.error('Please complete all assigned entries before submitting');
      return;
    }

    // Check if final step is signed
    if (!this.isStepSigned(this.activeStep)) {
      this.openSignatureModal(this.activeStep);
      return;
    }

    // Show confirmation dialog before submission
    if (confirm('Are you sure you want to sign and submit your part of the report? This action cannot be undone.')) {
      this.loading = true;
      
      // In a real implementation, this would make a final API call to mark the user's part as complete
      // We'll include all collected signatures from each step
      // const signatures = this.stepSignatures;
      
      // We'll use a timeout to simulate the API call
      setTimeout(() => {
        this.loading = false;
        this.toastr.success('Your part of the report has been submitted successfully!');
        
        // Check if all parts of the report are completed
        if (this.checkAllPartsCompleted()) {
          // Ask if the user wants to mark the entire report as completed
          if (confirm('All parts of the report appear to be completed. Would you like to mark the entire report as completed?')) {
            this.markReportAsCompleted();
            return; // The navigation will happen in the markReportAsCompleted() callback
          }
        }
        
        // Navigate back to view report
        this.router.navigate(['/dashboard/report-dashboard/view-report', this.reportId]);
      }, 1000);
    }
  }

  // Check if all parts of the report have been completed
  checkAllPartsCompleted(): boolean {
    // In a real implementation, this would check if all users have completed their assigned tasks
    // For now, we'll use our local standardEntries and specificEntries to determine this
    
    const standardCompleted = this.standardEntries.length === 0 || 
                             this.standardEntries.every(entry => entry.isImplemented === true);
    
    const specificCompleted = this.specificEntries.length === 0 || 
                             this.specificEntries.every(entry => entry.isImplemented === true);
    
    return standardCompleted && specificCompleted;
  }

  // Mark the report as completed
  markReportAsCompleted(): void {
    if (!this.reportId) return;
    
    this.reportService.markReportAsCompleted(this.reportId).subscribe({
      next: () => {
        // Show success message and navigate back to view report
        this.toastr.success('Report has been successfully marked as completed!');
        this.router.navigate(['/dashboard/report-dashboard/view-report', this.reportId]);
      },
      error: (err) => {
        this.error = 'Failed to mark report as completed: ' + (err.error?.message || err.message);
        this.toastr.error('Failed to mark report as completed. Please try again.');
        this.loading = false;
      }
    });
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

  // Get current date and time as a formatted string
  getCurrentDateTime(): string {
    const now = new Date();
    return now.toLocaleDateString() + ' ' + now.toLocaleTimeString();
  }
} 