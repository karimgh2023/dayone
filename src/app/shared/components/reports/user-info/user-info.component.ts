import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../../../../models/user.model';

@Component({
  selector: 'app-user-info',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="d-flex align-items-center" *ngIf="user">
      <ng-container *ngIf="showAvatar">
        <div class="avatar me-2">
          <img 
            *ngIf="user.profilePhoto" 
            [src]="user.profilePhoto" 
            alt="User avatar" 
            class="avatar-img rounded-circle"
          >
          <div 
            *ngIf="!user.profilePhoto" 
            class="avatar-initials rounded-circle bg-primary text-white"
          >
            {{ getInitials() }}
          </div>
        </div>
      </ng-container>
      <div>
        <h6 class="mb-0 text-dark">{{ user.firstName }} {{ user.lastName }}</h6>
        <div *ngIf="showDetails" class="text-muted small">
          <div *ngIf="user.department">{{ getDepartmentName() }}</div>
          <div *ngIf="user.email">{{ user.email }}</div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .avatar {
      width: 40px;
      height: 40px;
      position: relative;
    }
    
    .avatar-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    
    .avatar-initials {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 500;
    }
  `]
})
export class UserInfoComponent {
  @Input() user!: User;
  @Input() showAvatar: boolean = true;
  @Input() showDetails: boolean = true;

  getInitials(): string {
    if (!this.user) {
      return '';
    }
    
    const firstInitial = this.user.firstName ? this.user.firstName.charAt(0) : '';
    const lastInitial = this.user.lastName ? this.user.lastName.charAt(0) : '';
    
    return (firstInitial + lastInitial).toUpperCase();
  }

  getDepartmentName(): string {
    if (!this.user.department) {
      return '';
    }
    
    if (typeof this.user.department === 'string') {
      return this.user.department;
    }
    
    return this.user.department.name || '';
  }
} 