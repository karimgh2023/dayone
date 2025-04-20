import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading-indicator',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="loading-container" [class.overlay]="overlay">
      <div class="spinner-container">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        <p *ngIf="message" class="loading-message">{{ message }}</p>
      </div>
    </div>
  `,
  styles: [`
    .loading-container {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 2rem;
      width: 100%;
    }
    
    .loading-container.overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(255, 255, 255, 0.8);
      z-index: 1000;
    }
    
    .spinner-container {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    
    .loading-message {
      margin-top: 1rem;
      color: #495057;
      font-size: 0.875rem;
    }
  `]
})
export class LoadingIndicatorComponent {
  @Input() message?: string;
  @Input() overlay: boolean = false;
} 