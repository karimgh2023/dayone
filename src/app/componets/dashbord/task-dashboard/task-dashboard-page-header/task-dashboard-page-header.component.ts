import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-dashboard-page-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page-header">
      <div class="row align-items-center">
        <div class="col">
          <h3 class="page-title">{{ title }}</h3>
          <p class="text-muted mb-0">{{ subtitle }}</p>
        </div>
        <div class="col-auto" *ngIf="title2 || title3">
          <div class="d-flex align-items-center">
            <div class="me-3" *ngIf="title2">
              <h4 class="mb-0">{{ title2 }}</h4>
              <p class="text-muted mb-0">{{ subtitle2 }}</p>
            </div>
            <div *ngIf="title3">
              <h4 class="mb-0">{{ title3 }}</h4>
              <p class="text-muted mb-0">{{ subtitle3 }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .page-header {
      margin-bottom: 2rem;
      padding: 1rem 0;
      
      .page-title {
        font-size: 1.5rem;
        font-weight: 600;
        margin-bottom: 0.25rem;
      }
      
      h4 {
        font-size: 1.25rem;
        font-weight: 600;
      }
      
      .text-muted {
        font-size: 0.875rem;
      }
    }
  `]
})
export class TaskDashboardPageHeaderComponent {
  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() title2: string = '';
  @Input() subtitle2: string = '';
  @Input() title3: string = '';
  @Input() subtitle3: string = '';
} 