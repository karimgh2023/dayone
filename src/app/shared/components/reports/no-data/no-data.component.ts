import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-no-data',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="no-data-container">
      <div class="empty-state">
        <div class="empty-state-icon">
          <i class="fe fe-{{icon}} text-primary"></i>
        </div>
        <h4 class="mt-3">{{ title }}</h4>
        <p class="text-muted">{{ message }}</p>
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styles: [`
    .no-data-container {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 2rem;
      background-color: #f8f9fa;
      border-radius: 0.25rem;
      min-height: 200px;
    }
    
    .empty-state {
      text-align: center;
      max-width: 500px;
    }
    
    .empty-state-icon {
      font-size: 3rem;
      color: #dee2e6;
      margin-bottom: 1rem;
    }
  `]
})
export class NoDataComponent {
  @Input() title: string = 'No Data Available';
  @Input() message: string = 'There are no items to display at this time.';
  @Input() icon: string = 'inbox';
} 