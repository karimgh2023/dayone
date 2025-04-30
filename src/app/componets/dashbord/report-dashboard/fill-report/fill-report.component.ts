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


@Component({
  selector: 'app-fill-report',
  templateUrl: './fill-report.component.html',
  styleUrls: ['./fill-report.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
})
export class FillReportComponent implements OnInit {

  reportId!: number;
  standardChecklist: StandardChecklistItemDTO[] = [];
  specificChecklist: SpecificChecklistItemDTO[] = [];
  validationChecklist: ValidationChecklistItem[] = [];
  reportMetadata!: ReportMetadataDTO ;
  maintenanceForm!: MaintenanceFormDTO;



  editableKeys: (keyof MaintenanceForm)[] = [
    'powerCircuit', 'controlCircuit', 'fuseValue', 'frequency',
    'phaseBalanceTest380v', 'phaseBalanceTest210v',
    'insulationResistanceMotor', 'insulationResistanceCable',
    'machineSizeHeight', 'machineSizeLength', 'machineSizeWidth'
  ];

  constructor(
    private reportEntryService: ReportEntryService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id'); // ✅ Not 'reportId'
      if (id) {
        this.reportId = +id;
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

  canEditMaintenancePart(): boolean {
    return this.maintenanceForm?.canEditMaintenance === true;
  }

  canEditShePart(): boolean {
    return this.maintenanceForm?.canEditShe === true;
  }

  
  loadData() {
    this.reportEntryService.getStandardChecklist(this.reportId).subscribe({
      next: (data) => {
        console.log('[STANDARD] Loaded:', data);
        this.standardChecklist = data.map(item => ({
          ...item,
          isFilled: false // ✅ initialize isFilled
        }));
      },
      error: (err) => {
        console.error('[STANDARD] Failed to load:', err);
      }
    });

    this.reportEntryService.getSpecificChecklist(this.reportId).subscribe({
      next: (data) => {
        console.log('[SPECIFIC] Loaded:', data);
        this.specificChecklist = data;
      },
      error: (err) => {
        console.error('[SPECIFIC] Failed to load:', err);
      }
    });

    this.reportEntryService.getMaintenanceForm(this.reportId).subscribe({
      next: data => {
        console.log("[MAINTENANCE FORM]", data);
        this.maintenanceForm = data;
      },
      error: err => {
        console.error("[MAINTENANCE] Failed to load:", err);
      }
    });
  }
  submitSpecificChecklist() {
    const filledEntries = this.specificChecklist
      .filter(e => e.isFilled)
      .map(e => ({
        id: e.entryId,
        homologation: e.homologation,
        action: e.action?.trim() || '-',
        responsableAction: e.responsableAction?.trim() || '-',
        deadline: e.deadline?.trim() || '-',
        successControl: e.successControl?.trim() || '-',
        isUpdated: true
      }));

    if (filledEntries.length === 0) {
      alert('Aucun champ spécifique rempli à enregistrer.');
      return;
    }

    this.reportEntryService.updateMultipleSpecificEntries(filledEntries).subscribe({
      next: (res) => {
        this.specificChecklist.forEach(e => e.isFilled = false);
        alert(`✅ ${res.message}`);
      },
      error: (err) => {
        console.error('[SPECIFIC] Batch update failed:', err);
        alert('❌ Échec de l\'enregistrement de la checklist spécifique. Veuillez réessayer.');
      }
    });
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
    return this.standardChecklist.some(item => item.isFilled === true);
  }

  hasFilledSpecificEntries(): boolean {
    return this.specificChecklist.some(item => item.isFilled === true);
  }

  submitStandardChecklist() {
    const filledEntries = this.standardChecklist
      .filter(e => e.isFilled)
      .map(e => ({
        id: e.entryId,
        implemented: e.implemented,
        action: e.action?.trim() || '-', // Default to '-' if null or empty
        responsableAction: e.responsableAction?.trim() || '-',
        deadline: e.deadline?.trim() || '-',
        successControl: e.successControl?.trim() || '-',
        isUpdated: true
      }));

    if (filledEntries.length === 0) {
      alert('Aucun champ rempli à enregistrer.');
      return;
    }

    this.reportEntryService.updateMultipleStandardEntries(filledEntries).subscribe({
      next: (res) => {
        this.standardChecklist.forEach(e => e.isFilled = false);
        alert(`✅ ${res.message}`);
      },
      error: (err) => {
        console.error('[STANDARD] Batch update failed:', err);
        alert('❌ Échec de l\'enregistrement de la checklist. Veuillez réessayer.');
      }
    });
  }

  /**
   * Toggle implementation status and mark as filled
   */
  toggleImplementation(item: StandardChecklistItemDTO): void {
    if (item.editable) {
      item.implemented = !item.implemented;
      item.isFilled = true;
    }
  }

  /**
   * Toggle homologation status and mark as filled
   */
  toggleHomologation(item: SpecificChecklistItemDTO): void {
    if (item.editable) {
      item.homologation = !item.homologation;
      item.isFilled = true;
    }
  }

  /**
   * Calculate the overall progress of the report
   */
  getOverallProgress(): number {
    const standard = this.getStandardProgress();
    const specific = this.getSpecificProgress();
    const maintenance = this.getMaintenanceProgress();
    
    // Calculate average of the three sections, giving more weight to the checklists
    return Math.round((standard * 0.4) + (specific * 0.4) + (maintenance * 0.2));
  }

  /**
   * Calculate the progress of the standard checklist
   */
  getStandardProgress(): number {
    if (!this.standardChecklist || this.standardChecklist.length === 0) {
      return 0;
    }
    
    const totalItems = this.standardChecklist.length;
    const completedItems = this.standardChecklist.filter(item => 
      item.implemented === true || 
      (item.implemented === false && item.action && item.responsableAction && item.deadline)
    ).length;
    
    return Math.round((completedItems / totalItems) * 100);
  }

  /**
   * Calculate the progress of the specific checklist
   */
  getSpecificProgress(): number {
    if (!this.specificChecklist || this.specificChecklist.length === 0) {
      return 0;
    }
    
    const totalItems = this.specificChecklist.length;
    const completedItems = this.specificChecklist.filter(item => 
      item.homologation === true || 
      (item.homologation === false && item.action && item.responsableAction && item.deadline)
    ).length;
    
    return Math.round((completedItems / totalItems) * 100);
  }

  /**
   * Calculate the progress of the maintenance form
   */
  getMaintenanceProgress(): number {
    if (!this.maintenanceForm || !this.maintenanceForm.form) {
      return 0;
    }
    
    const form = this.maintenanceForm.form;
    const totalFields = this.editableKeys.length;
    
    // Count fields that have values
    let filledFields = 0;
    this.editableKeys.forEach(key => {
      if (form[key] && form[key].toString().trim() !== '') {
        filledFields++;
      }
    });
    
    return Math.round((filledFields / totalFields) * 100);
  }

}
