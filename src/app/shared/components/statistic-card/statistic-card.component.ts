import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-statistic-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card custom-card">
      <div class="card-body">
        <div class="row">
          <div class="col-8">
            <div class="mb-1 text-muted fs-12 fw-semibold">{{ title }}</div>
            <h3 class="mb-0">{{ value }}</h3>
          </div>
          <div class="col-4">
            <div class="chart-wrapper">
              <div class="chartjs-size-monitor">
                <div class="mb-0 d-flex justify-content-center align-items-center">
                  <i class="fa fa-{{ icon }} fa-3x text-{{ color }}"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class StatisticCardComponent {
  @Input() title: string = '';
  @Input() value: number = 0;
  @Input() icon: string = 'chart-bar';
  @Input() color: string = 'primary';
} 