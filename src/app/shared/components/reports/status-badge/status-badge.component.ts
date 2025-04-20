import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-status-badge',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span class="badge bg-{{ getColorClass(status) }}">
      {{ getDisplayText(status) }}
    </span>
  `,
  styles: [`
    .badge {
      font-size: 0.85rem;
      font-weight: 500;
      padding: 0.35em 0.65em;
    }
  `]
})
export class StatusBadgeComponent {
  @Input() status: string | boolean = '';
  @Input() customText: string = '';

  getColorClass(status: string | boolean): string {
    if (typeof status === 'boolean') {
      return status ? 'success' : 'primary';
    }
    
    switch (status.toLowerCase()) {
      case 'completed':
      case 'true':
      case 'success':
        return 'success';
      case 'in progress':
      case 'pending':
      case 'false':
        return 'primary';
      case 'failed':
      case 'error':
        return 'danger';
      case 'warning':
        return 'warning';
      case 'info':
        return 'info';
      default:
        return 'secondary';
    }
  }

  getDisplayText(status: string | boolean): string {
    if (this.customText) {
      return this.customText;
    }
    
    if (typeof status === 'boolean') {
      return status ? 'Completed' : 'In Progress';
    }
    
    return status ? status.toString() : '';
  }
} 