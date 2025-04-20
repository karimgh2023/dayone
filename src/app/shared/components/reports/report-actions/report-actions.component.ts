import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

export interface ReportAction {
  name: string;
  icon: string;
  color: string;
  action: 'view' | 'edit' | 'delete' | 'complete' | 'fill' | 'download' | 'custom';
  enabled: boolean;
  tooltip?: string;
  customAction?: string;
}

@Component({
  selector: 'app-report-actions',
  standalone: true,
  imports: [CommonModule, RouterModule, NgbTooltipModule],
  template: `
    <div class="btn-group" role="group">
      <ng-container *ngFor="let action of actions">
        <!-- For navigation actions (view, edit, fill) -->
        <a 
          *ngIf="isNavigationAction(action.action) && action.enabled"
          [routerLink]="getRouterLink(action.action)"
          class="btn btn-sm btn-{{action.color}}"
          [ngbTooltip]="action.tooltip || action.name"
        >
          <i class="fe fe-{{action.icon}}"></i>
          <span *ngIf="showLabels" class="ms-1">{{action.name}}</span>
        </a>
        
        <!-- For callback actions (delete, complete, download, custom) -->
        <button 
          *ngIf="!isNavigationAction(action.action) && action.enabled"
          type="button" 
          class="btn btn-sm btn-{{action.color}}"
          [ngbTooltip]="action.tooltip || action.name"
          (click)="onActionClick(action.action, action.customAction)"
        >
          <i class="fe fe-{{action.icon}}"></i>
          <span *ngIf="showLabels" class="ms-1">{{action.name}}</span>
        </button>
      </ng-container>
    </div>
  `,
  styles: [`
    .btn-group .btn:not(:last-child) {
      margin-right: 0.25rem;
    }
  `]
})
export class ReportActionsComponent {
  @Input() reportId!: number;
  @Input() showLabels: boolean = true;
  @Input() actions: ReportAction[] = [
    { name: 'View', icon: 'eye', color: 'primary', action: 'view', enabled: true },
    { name: 'Edit', icon: 'edit', color: 'info', action: 'edit', enabled: true },
    { name: 'Delete', icon: 'trash-2', color: 'danger', action: 'delete', enabled: true }
  ];
  
  @Output() actionTriggered = new EventEmitter<{action: string, customAction?: string}>();
  
  isNavigationAction(action: string): boolean {
    return ['view', 'edit', 'fill'].includes(action);
  }
  
  getRouterLink(action: string): string[] {
    switch (action) {
      case 'view':
        return ['../view-report', this.reportId.toString()];
      case 'edit':
        return ['../edit-report', this.reportId.toString()];
      case 'fill':
        return ['../fill-report', this.reportId.toString()];
      default:
        return [];
    }
  }
  
  onActionClick(action: string, customAction?: string): void {
    this.actionTriggered.emit({ action, customAction });
  }
} 