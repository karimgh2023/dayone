import { Injectable } from '@angular/core';
import { StandardChecklistItemDTO } from '@/app/models/StandardChecklistItemDTO.model';
import { SpecificChecklistItemDTO } from '@/app/models/SpecificChecklistItemDTO.model';
import { MaintenanceForm } from '@/app/models/maintenance-form.model';

@Injectable({
  providedIn: 'root'
})
export class ProgressService {
  constructor() {}

  /**
   * Calculate the overall progress of a report
   * @param standardProgress Progress of standard checklist (0-100)
   * @param specificProgress Progress of specific checklist (0-100)
   * @param maintenanceProgress Progress of maintenance form (0-100)
   * @returns Overall progress percentage (0-100)
   */
  calculateOverallProgress(
    standardProgress: number,
    specificProgress: number,
    maintenanceProgress: number
  ): number {
    // Weighted average: 40% standard, 40% specific, 20% maintenance
    return Math.round((standardProgress * 0.4) + (specificProgress * 0.4) + (maintenanceProgress * 0.2));
  }

  /**
   * Calculate the progress of a standard checklist
   * @param checklist Array of standard checklist items
   * @returns Progress percentage (0-100)
   */
  calculateStandardProgress(checklist: StandardChecklistItemDTO[]): number {
    if (!checklist || checklist.length === 0) {
      return 0;
    }
    
    const totalItems = checklist.length;
    const completedItems = checklist.filter(item => 
      item.implemented === true || 
      (item.implemented === false && item.action && item.responsableAction && item.deadline)
    ).length;
    
    return Math.round((completedItems / totalItems) * 100);
  }

  /**
   * Calculate the progress of a specific checklist
   * @param checklist Array of specific checklist items
   * @returns Progress percentage (0-100)
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
   * Calculate the progress of a maintenance form
   * @param form Maintenance form data
   * @param editableKeys Array of editable field keys
   * @returns Progress percentage (0-100)
   */
  calculateMaintenanceProgress(form: MaintenanceForm, editableKeys: (keyof MaintenanceForm)[]): number {
    if (!form || !editableKeys || editableKeys.length === 0) {
      return 0;
    }
    
    const totalFields = editableKeys.length;
    let filledFields = 0;
    
    editableKeys.forEach(key => {
      if (form[key] && form[key].toString().trim() !== '') {
        filledFields++;
      }
    });
    
    return Math.round((filledFields / totalFields) * 100);
  }
      /**
     * Get the status label of the report based on overall progress
     * @param overallProgress Overall progress percentage (0-100)
     * @returns Status label in French
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