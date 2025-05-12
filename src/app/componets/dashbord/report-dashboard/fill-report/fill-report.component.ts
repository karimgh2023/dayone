import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaintenanceFormDTO } from '../../../../models/maintenance-form-dto.model';
import { ReportEntryService } from '../../../../shared/services/report-entry.service';
import { MaintenanceForm } from '../../../../models/maintenance-form.model';
import { SpecificChecklistItemDTO } from '../../../../models/SpecificChecklistItemDTO.model';
import { StandardChecklistItemDTO } from '../../../../models/StandardChecklistItemDTO.model';
import { ReportMetadataDTO } from '@/app/models/ReportMetadataDTO.model';
import { ValidationChecklistItem } from '@/app/models/ValidationChecklistItem.model';
import { ReportService } from '../../../../shared/services/report.service';
import { User } from '@/app/models/user.model';
import { AuthService } from '@/app/shared/services/auth.service';
import { ValidationEntryUpdateDTO } from '@/app/models/ValidationEntryUpdateDTO.model';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { ProgressService } from '@/app/shared/services/progress.service';
import { ReportDTO } from '@/app/models/reportDTO.model';
@Component({
  selector: 'app-fill-report',
  templateUrl: './fill-report.component.html',
  styleUrls: ['./fill-report.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
          ReactiveFormsModule,
          CommonModule,
          FormsModule,
          ReactiveFormsModule,
          ToastrModule
        ],
        providers: [
          { provide: ToastrService, useClass: ToastrService }
        ]
})
export class FillReportComponent implements OnInit {

  reportId!: number;
  reportProgress!:number;
  currentUser!: User;
  today: string = new Date().toISOString().split('T')[0];

  standardChecklist: StandardChecklistItemDTO[] = [];
  specificChecklist: SpecificChecklistItemDTO[] = [];
  validationChecklist: ValidationChecklistItem[] = [];
  reportMetadata!: ReportMetadataDTO ;
  maintenanceForm!: MaintenanceFormDTO;

  assignedUsers: ReportDTO[] = [];
  editableKeys: (keyof MaintenanceForm)[] = [
    'powerCircuit', 'controlCircuit', 'fuseValue', 'frequency',
    'phaseBalanceTest380v', 'phaseBalanceTest210v',
    'insulationResistanceMotor', 'insulationResistanceCable',
    'machineSizeHeight', 'machineSizeLength', 'machineSizeWidth'
  ];

  constructor(
    private reportEntryService: ReportEntryService,
    private route: ActivatedRoute,
    private router: Router,
    private reportService: ReportService,
    private authService: AuthService,
    private toastr: ToastrService,
    private progressService: ProgressService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id'); // ✅ Not 'reportId'
      if (id) {
        this.reportId = +id;
      
        this.currentUser = this.authService.getUserFromToken();
        console.log('[ROUTE] Report ID:', this.reportId);
        this.loadData();
      } else {
        console.error('[ROUTE] No report ID found in route');
      }
    });

  }

  /**
   * Navigate back to the reports list
   */
  goBack(): void {
    this.router.navigate(['/dashboard/report-dashboard/view-reports']);
  }

  formatLabel(key: string): string {
    return key
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase())
      .replace(/_/g, ' ');
  }
  getDepartmentNames(departments?: { name: string }[]): string {
    return departments?.map(dep => dep.name).join(', ') || '';
  }
  loadData() {
    this.reportEntryService.getStandardChecklist(this.reportId).subscribe({
      next: (data) => {
        console.log('[STANDARD] Loaded:', data);
        this.standardChecklist = data.map(item => ({
          ...item,
          isFilled: false
        }));
        this.updateProgress();
      },
      error: (err) => {
        console.error('[STANDARD] Failed to load:', err);
        this.toastr.error('Erreur lors du chargement de la checklist standard', 'Erreur');
      }
    });

    this.reportEntryService.getSpecificChecklist(this.reportId).subscribe({
      next: (data) => {
        console.log('[SPECIFIC] Loaded:', data);
        this.specificChecklist = data;
        this.updateProgress();
      },
      error: (err) => {
        console.error('[SPECIFIC] Failed to load:', err);
        this.toastr.error('Erreur lors du chargement de la checklist spécifique', 'Erreur');
      }
    });

    this.reportEntryService.getMaintenanceForm(this.reportId).subscribe({
      next: data => {
        console.log("[MAINTENANCE FORM]", data);
        this.maintenanceForm = data;
        this.updateProgress();
      },
      error: err => {
        console.error("[MAINTENANCE] Failed to load:", err);
        this.toastr.error('Erreur lors du chargement du formulaire de maintenance', 'Erreur');
      }
    });

    this.reportEntryService.getValidationChecklist(this.reportId).subscribe({
      next: data => {
        this.validationChecklist = data;
        this.updateProgress();
      },
      error: err => {
        console.error('[VALIDATION] Load error:', err);
        this.toastr.error('Erreur lors du chargement de la checklist de validation', 'Erreur');
      }
    });

    this.reportService.getReportMetadata(this.reportId).subscribe({
      next: data => {
        this.reportMetadata = data;
        console.log('[METADATA]', data);
        this.updateProgress();
      },
      error: err => {
        console.error('[METADATA] Load error:', err);
        this.toastr.error('Erreur lors du chargement des métadonnées du rapport', 'Erreur');
      }
    });
    
  }
  submitSpecificChecklist() {
    const filledEntries = this.specificChecklist
      .filter(e => e.isFilled)
      .map(e => ({
        id: e.entryId,
        homologation: e.homologation ?? false,
        action: e.action?.trim() || null,
        responsableAction: e.responsableAction?.trim() || null,
        deadline: e.deadline || null,
        successControl: e.successControl?.trim() || null,
        isUpdated: true
      }));

    if (filledEntries.length === 0) {
      this.toastr.warning('Aucun champ spécifique rempli à enregistrer.', 'Attention');
      return;
    }

    // Validate entries where homologation is false
    const invalidEntries = filledEntries.filter(entry => {
      if (!entry.homologation) {
        return !entry.action || !entry.responsableAction || !entry.deadline || !entry.successControl;
      }
      return false;
    });

    if (invalidEntries.length > 0) {
      this.toastr.error('Pour les critères non homologués, tous les champs doivent être remplis.', 'Erreur de validation');
      return;
    }

    this.reportEntryService.updateMultipleSpecificEntries(filledEntries).subscribe({
      next: res => {
        this.specificChecklist.forEach(e => e.isFilled = false);
        this.toastr.success(res.message, 'Succès');
        this.loadData();
      },
      error: err => {
        console.error('[SPECIFIC] Update failed:', err);
        this.toastr.error('Échec de l\'enregistrement de la checklist spécifique.', 'Erreur');
      }
    });
  }

  canEditMaintenancePart(): boolean {
    return this.maintenanceForm?.canEditMaintenance === true;
  }

  canEditShePart(): boolean {
    return this.maintenanceForm?.canEditShe === true;
  }

  updateImmobilization() {
    const dto = { immobilization: this.reportMetadata.immobilization };

    this.reportService.updateImmobilization(this.reportId, dto).subscribe({
      next: res => {
        console.log('[✅ IMMOBILIZATION UPDATED]', res.message);
        this.toastr.success('Immobilisation mise à jour avec succès.', 'Succès');
      },
      error: err => {
        console.error('[❌ IMMOBILIZATION UPDATE ERROR]', err);
        this.toastr.error('Échec de la mise à jour de l\'immobilisation.', 'Erreur');
      }
    });
  }

  canEditValidation(entry: ValidationChecklistItem): boolean {
    return !entry.updated && this.currentUser?.department?.id === entry.department.id;
  }
  canEditImmobilization(): boolean {
    return this.reportMetadata?.canEditImmobilization === true;
  }


  showDate(entry: ValidationChecklistItem): string {
    if (entry.updated && entry.date) return entry.date;
    return this.canEditValidation(entry) ? this.today : '';
  }


  updateMaintenanceForm() {
    this.reportEntryService.updateMaintenanceForm(this.reportId, this.maintenanceForm.form).subscribe({
      next: (res) => {
        console.log('[MAINTENANCE] Success:', res?.message || res);
      },
      error: (error) => {
        console.error('[MAINTENANCE] Form update failed:', error);
      }
    });
  }

  hasFilledStandardEntries(): boolean {
    // Get all filled entries
    const filledEntries = this.standardChecklist.filter(item => item.isFilled);
    
    // If no entries are filled, disable the button
    if (filledEntries.length === 0) {
      return false;
    }

    // Check if all filled entries are valid
    return filledEntries.every(item => this.isStandardEntryValid(item));
  }

  hasFilledSpecificEntries(): boolean {
    // Get all filled entries
    const filledEntries = this.specificChecklist.filter(item => item.isFilled);
    
    // If no entries are filled, disable the button
    if (filledEntries.length === 0) {
      return false;
    }

    // Check if all filled entries are valid
    return filledEntries.every(item => this.isSpecificEntryValid(item));
  }

  submitStandardChecklist() {
    const filledEntries = this.standardChecklist
      .filter(e => e.isFilled)
      .map(e => ({
        id: e.entryId,
        implemented: e.implemented ?? false,
        action: e.action?.trim() || null,
        responsableAction: e.responsableAction?.trim() || null,
        deadline: e.deadline || null,
        successControl: e.successControl?.trim() || null,
        isUpdated: true
      }));

    if (filledEntries.length === 0) {
      this.toastr.warning('Aucun champ rempli à enregistrer.', 'Attention');
      return;
    }

    // Validate entries where implemented is false
    const invalidEntries = filledEntries.filter(entry => {
      if (!entry.implemented) {
        return !entry.action || !entry.responsableAction || !entry.deadline || !entry.successControl;
      }
      return false;
    });

    if (invalidEntries.length > 0) {
      this.toastr.error('Pour les critères non implémentés, tous les champs doivent être remplis.', 'Erreur de validation');
      return;
    }

    this.reportEntryService.updateMultipleStandardEntries(filledEntries).subscribe({
      next: res => {
        this.standardChecklist.forEach(e => e.isFilled = false);
        this.toastr.success(res.message, 'Succès');
        this.loadData();
      },
      error: err => {
        console.error('[STANDARD] Update failed:', err);
        this.toastr.error('Échec de l\'enregistrement de la checklist standard.', 'Erreur');
      }
    });
  }

 

  /**
   * Toggle implementation status and mark as filled
   */
  toggleImplementation(item: StandardChecklistItemDTO): void {
    if (item.editable) {
      item.implemented = !item.implemented;
      
      // Reset fields when implemented is true
      if (item.implemented) {
        item.action = null;
        item.responsableAction = null;
        item.deadline = null;
        item.successControl = null;
      }

      // Update isFilled based on new state
      item.isFilled = this.isStandardEntryValid(item);
    }
  }

  /**
   * Toggle homologation status and mark as filled
   */
  toggleHomologation(item: SpecificChecklistItemDTO): void {
    if (item.editable) {
      item.homologation = !item.homologation;
      
      // Reset fields when homologation is true
      if (item.homologation) {
        item.action = null;
        item.responsableAction = null;
        item.deadline = null;
        item.successControl = null;
      }

      // Update isFilled based on new state
      item.isFilled = this.isSpecificEntryValid(item);
    }
  }

  getOverallProgress(): number {
  return this.progressService.calculateOverallProgress(
    this.standardChecklist,
    this.specificChecklist,
    this.validationChecklist,
    this.maintenanceForm?.form
    
  );
}

  /**
   * Get the progress from the report DTO
   */
  getReportProgress(report: ReportDTO): number {
    return report.progress || 0;
  }

  /**
   * Get the progress of the standard checklist
   */
  getStandardProgress(): number {
    return this.progressService.calculateStandardProgress(this.standardChecklist);
  }

  /**
   * Get the progress of the specific checklist
   */
  getSpecificProgress(): number {
    if (!this.specificChecklist || this.specificChecklist.length === 0) {
      return 0;
    }
    return this.progressService.calculateSpecificProgress(this.specificChecklist);
  }
  

  /**
   * Get the progress of the validation checklist
   */
  getValidationProgress(): number {
    return this.progressService.calculateValidationProgress(this.validationChecklist);
  }

  /**
   * Get the progress of the maintenance form
   */
  getMaintenanceProgress(): number {
    if (!this.maintenanceForm || !this.maintenanceForm.form) {
      return 0;
    }
    return this.progressService.calculateMaintenanceProgress(this.maintenanceForm.form);
  }
  

  /**
   * Update a validation entry
   */
  updateValidationEntry(entry: ValidationChecklistItem): void {
    if (entry.updated) return;

    const dto: ValidationEntryUpdateDTO = {
      status: entry.status!,
      reason: entry.status === false ? entry.reason || '-' : null,
      date: this.today
    };

    this.reportEntryService.updateValidationEntry(entry.id, dto).subscribe({
      next: () => {
        entry.updated = true;
        entry.date = this.today;
        this.toastr.success('Validation enregistrée avec succès.', 'Succès');
      },
      error: err => {
        console.error('[VALIDATION] Update error:', err);
        this.toastr.error('Échec de la mise à jour de la validation.', 'Erreur');
      }
    });
  }

  // Update the isStandardEntryValid method to be more strict
  isStandardEntryValid(entry: StandardChecklistItemDTO): boolean {
    if (!entry.implemented) {
      // For non-implemented entries, all fields must be filled
      return !!(entry.action?.trim() && 
                entry.responsableAction?.trim() && 
                entry.deadline && 
                entry.successControl?.trim());
    } else {
      // For implemented entries, all fields must be empty
      return !(entry.action?.trim() || 
               entry.responsableAction?.trim() || 
               entry.deadline || 
               entry.successControl?.trim());
    }
  }

  // Update the isSpecificEntryValid method to be more strict
  isSpecificEntryValid(entry: SpecificChecklistItemDTO): boolean {
    if (!entry.homologation) {
      // For non-homologated entries, all fields must be filled
      return !!(entry.action?.trim() && 
                entry.responsableAction?.trim() && 
                entry.deadline && 
                entry.successControl?.trim());
    } else {
      // For homologated entries, all fields must be empty
      return !(entry.action?.trim() || 
               entry.responsableAction?.trim() || 
               entry.deadline || 
               entry.successControl?.trim());
    }
  }

  // Add a method to update progress
  private updateProgress(): void {
    // Force change detection by updating a property
    this.reportMetadata = { ...this.reportMetadata };
  }

  // Add methods to handle field changes
  onStandardFieldChange(item: StandardChecklistItemDTO): void {
    // Update isFilled based on current field values
    item.isFilled = this.isStandardEntryValid(item);
  }

  onSpecificFieldChange(item: SpecificChecklistItemDTO): void {
    // Update isFilled based on current field values
    item.isFilled = this.isSpecificEntryValid(item);
  }

  fillResponsibleFromAssignedUsers(item: StandardChecklistItemDTO): void {
  }
  
  
  
}
