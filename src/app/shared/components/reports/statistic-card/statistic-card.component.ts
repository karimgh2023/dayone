import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-statistic-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card custom-card">
      <div class="card-body">
        <div class="d-flex align-items-center">
          <div class="avatar me-3 bg-{{color}}-transparent">
            <i class="fe fe-{{icon}} text-{{color}}"></i>
          </div>
          <div>
            <h6 class="mb-1">{{title}}</h6>
            <p class="text-muted mb-0">{{subtitle}}</p>
          </div>
          <div class="ms-auto text-end">
            <h2 class="mb-0 text-{{color}}">{{value | number}}</h2>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .avatar {
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
    }
    
    .bg-primary-transparent {
      background-color: rgba(85, 110, 230, 0.2);
    }
    
    .bg-success-transparent {
      background-color: rgba(0, 177, 157, 0.2);
    }
    
    .bg-warning-transparent {
      background-color: rgba(255, 193, 7, 0.2);
    }
    
    .bg-info-transparent {
      background-color: rgba(23, 162, 184, 0.2);
    }
  `]
})
export class StatisticCardComponent {
  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() value: number = 0;
  @Input() icon: string = 'box';
  @Input() color: 'primary' | 'success' | 'warning' | 'info' | 'danger' = 'primary';
} 