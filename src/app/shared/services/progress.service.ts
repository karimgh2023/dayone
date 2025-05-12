import { Injectable } from '@angular/core';
import { StandardChecklistItemDTO } from '@/app/models/StandardChecklistItemDTO.model';
import { SpecificChecklistItemDTO } from '@/app/models/SpecificChecklistItemDTO.model';
import { ValidationChecklistItem } from '@/app/models/ValidationChecklistItem.model';
import { MaintenanceForm } from '@/app/models/maintenance-form.model';

@Injectable({
  providedIn: 'root'
})
export class ProgressService {
  constructor() {}

  /**
   * Calculate overall progress matching Java backend logic exactly
   */
  calculateOverallProgress(
    standardEntries: StandardChecklistItemDTO[],
    specificEntries: SpecificChecklistItemDTO[],
    validationEntries: ValidationChecklistItem[],
    maintenanceForm: MaintenanceForm
): number {
    let progress = 0;

    // Reuse existing calculation methods and scale them
    progress += (this.calculateStandardProgress(standardEntries) / 100) * 25;
    progress += (this.calculateSpecificProgress(specificEntries) / 100) * 25;
    progress += (this.calculateValidationProgress(validationEntries) / 100) * 25;
    progress += this.calculateMaintenanceProgress(maintenanceForm); // already returns 0, 15, or 25 by your own rules

    return Math.round(progress);
}


  /**
   * Calculate standard checklist progress for UI display (0-100%)
   */
  calculateStandardProgress(checklist: StandardChecklistItemDTO[]): number {
    if (!checklist || checklist.length === 0) return 0;
    const updated = checklist.filter(e => e.updated === true).length;
    return Math.round((updated / checklist.length) * 100);
  }

  /**
   * Calculate specific checklist progress for UI display (0-100%)
   */
 
  calculateSpecificProgress(checklist: SpecificChecklistItemDTO[]): number {
    if (!checklist || checklist.length === 0) {
      return 0;
    }
    
    const totalItems = checklist.length;
    const completedItems = checklist.filter(item => 
      item.homologation === true || 
      (item.homologation === false && item.action && item.responsableAction && item.deadline)
    ).length;
    
    return Math.round((completedItems / totalItems) * 100);
  }


  /**
   * Calculate validation checklist progress for UI display (0-100%)
   */
  calculateValidationProgress(checklist: ValidationChecklistItem[]): number {
    if (!checklist || checklist.length === 0) return 0;
    const updated = checklist.filter(e => e.updated === true).length;
    return Math.round((updated / checklist.length) * 100);
  }

  /**
   * Check if system part of maintenance form is filled (any field filled => 15%)
   */
  isMaintenanceSystemPartFilled(form: MaintenanceForm): boolean {
    if (!form) return false;

    const systemFields = [
      'powerCircuit',
      'controlCircuit',
      'fuseValue',
      'frequency',
      'phaseBalanceTest380v',
      'phaseBalanceTest210v',
      'insulationResistanceMotor',
      'insulationResistanceCable',
      'machineSizeHeight',
      'machineSizeLength',
      'machineSizeWidth'
    ];

    return systemFields.some(field => {
      const value = form[field as keyof MaintenanceForm];
      return value !== null && value !== undefined && value.toString().trim() !== '';
    });
  }

  /**
   * Check if SHE part is filled (isInOrder filled => 10%)
   */
  isShePartFilled(form: MaintenanceForm): boolean {
    if (!form) return false;
    return form.isInOrder !== null && form.isInOrder !== undefined;
  }

  /**
   * For UI only: Calculate maintenance progress percentage (0, 15, 25) based on backend rules
   */
  calculateMaintenanceProgress(form: MaintenanceForm): number {
    let progress = 0;
    if (this.isMaintenanceSystemPartFilled(form)) {
      progress += 15;
    }
    if (this.isShePartFilled(form)) {
      progress += 10;
    }
    return progress;
  }

  /**
   * Get status label based on progress
   */
  getStatusLabel(overallProgress: number): string {
    if (overallProgress === 0) {
      return 'Non commencé';
    } else if (overallProgress === 100) {
      return 'Complété';
    } else {
      return 'En cours';
    }
  }
}
