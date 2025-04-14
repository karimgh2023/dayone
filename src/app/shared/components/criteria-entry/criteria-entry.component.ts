import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

// Define the ReportEntryDisplay interface locally if it's not exported from report.model.ts
export interface CriteriaEntryData {
  id: number;
  standardCriteria?: {
    description: string;
    implementationResponsible?: { name: string; id?: number };
    checkResponsible?: { name: string; id?: number };
  } | boolean;
  specificCriteria?: {
    description: string;
    protocol?: { id: number; name: string; protocolType: string };
  } | boolean;
  implemented?: boolean;
  homologation?: boolean;
  status?: string;
  action?: string;
  responsableAction?: string;
  deadline?: string;
  successControl?: string;
}

@Component({
  selector: 'app-criteria-entry',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './criteria-entry.component.html',
  styleUrls: ['./criteria-entry.component.scss']
})
export class CriteriaEntryComponent {
  @Input() entry!: CriteriaEntryData;
  @Input() entryType: 'standard' | 'specific' = 'standard';
  @Input() readOnly: boolean = false;
  
  @Output() markImplemented = new EventEmitter<CriteriaEntryData>();
  @Output() markHomologated = new EventEmitter<CriteriaEntryData>();
  @Output() viewDetails = new EventEmitter<CriteriaEntryData>();

  get isStandardEntry(): boolean {
    return this.entryType === 'standard';
  }

  get isSpecificEntry(): boolean {
    return this.entryType === 'specific';
  }

  get isImplemented(): boolean {
    return this.isStandardEntry ? !!this.entry.implemented : !!this.entry.homologation;
  }

  get description(): string {
    if (this.isStandardEntry && this.entry.standardCriteria && typeof this.entry.standardCriteria === 'object') {
      return this.entry.standardCriteria.description || 'No description';
    } else if (this.isSpecificEntry && this.entry.specificCriteria && typeof this.entry.specificCriteria === 'object') {
      return this.entry.specificCriteria.description || 'No description';
    }
    return 'No description';
  }

  get implementationResponsible(): string {
    if (this.isStandardEntry && 
        this.entry.standardCriteria && 
        typeof this.entry.standardCriteria === 'object' && 
        this.entry.standardCriteria.implementationResponsible) {
      return this.entry.standardCriteria.implementationResponsible.name || 'N/A';
    }
    return 'N/A';
  }

  get checkResponsible(): string {
    if (this.isStandardEntry && 
        this.entry.standardCriteria && 
        typeof this.entry.standardCriteria === 'object' && 
        this.entry.standardCriteria.checkResponsible) {
      return this.entry.standardCriteria.checkResponsible.name || 'N/A';
    }
    return 'N/A';
  }

  onMarkImplemented() {
    this.markImplemented.emit(this.entry);
  }

  onMarkHomologated() {
    this.markHomologated.emit(this.entry);
  }

  onViewDetails() {
    this.viewDetails.emit(this.entry);
  }
}
