import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-error-alert',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div 
      *ngIf="errorMessage" 
      class="alert alert-danger alert-dismissible fade show" 
      role="alert"
    >
      <strong *ngIf="showTitle">Error!</strong> {{ errorMessage }}
      <button 
        *ngIf="dismissible" 
        type="button" 
        class="btn-close" 
        data-bs-dismiss="alert" 
        aria-label="Close"
        (click)="onDismiss()"
      ></button>
    </div>
  `
})
export class ErrorAlertComponent {
  @Input() errorMessage: string | null = null;
  @Input() showTitle: boolean = true;
  @Input() dismissible: boolean = true;
  @Output() dismissed = new EventEmitter<void>();

  onDismiss(): void {
    this.errorMessage = null;
    this.dismissed.emit();
  }
} 