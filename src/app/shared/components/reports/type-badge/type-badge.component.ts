import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProtocolType } from '../../../../../app/models/protocol-type.enum';

@Component({
  selector: 'app-type-badge',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span class="badge bg-{{ getColorClass() }}">
      {{ type || 'Unknown' }}
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
export class TypeBadgeComponent {
  @Input() type: string = '';

  getColorClass(): string {
    if (!this.type) {
      return 'secondary';
    }
    
    switch (this.type.toLowerCase()) {
      case 'maintenance':
        return 'primary';
      case 'inspection':
        return 'success';
      case 'repair':
        return 'warning';
      case 'replacement':
        return 'info';
      case ProtocolType.Homologation.toLowerCase():
        return 'purple';
      case ProtocolType.Requalification.toLowerCase():
        return 'teal';
      default:
        return 'secondary';
    }
  }
} 