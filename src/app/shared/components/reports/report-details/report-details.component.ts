import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Report } from '../../../../models/report.model';
import { TypeBadgeComponent } from '../type-badge/type-badge.component';
import { StatusBadgeComponent } from '../status-badge/status-badge.component';
import { UserInfoComponent } from '../user-info/user-info.component';

@Component({
  selector: 'app-report-details',
  standalone: true,
  imports: [
    CommonModule,
    TypeBadgeComponent,
    StatusBadgeComponent,
    UserInfoComponent
  ],
  template: `
    <div class="card custom-card">
      <div class="card-header border-bottom">
        <h3 class="card-title">Report Details</h3>
      </div>
      <div class="card-body">
        <div class="row mb-3">
          <div class="col-md-6">
            <div class="mb-3">
              <label class="form-label fw-bold">Report ID:</label>
              <p>#{{ report.id }}</p>
            </div>
            <div class="mb-3" *ngIf="report.designation">
              <label class="form-label fw-bold">Equipment Designation:</label>
              <p>{{ report.designation }}</p>
            </div>
            <div class="mb-3" *ngIf="report.serialNumber">
              <label class="form-label fw-bold">Equipment Serial:</label>
              <p>{{ report.serialNumber }}</p>
            </div>
            <div class="mb-3">
              <label class="form-label fw-bold">Type:</label>
              <div>
                <app-type-badge [type]="report.type || ''"></app-type-badge>
              </div>
            </div>
            <div class="mb-3" *ngIf="report.manufacturer">
              <label class="form-label fw-bold">Manufacturer:</label>
              <p>{{ report.manufacturer }}</p>
            </div>
          </div>
          <div class="col-md-6">
            <div class="mb-3">
              <label class="form-label fw-bold">Status:</label>
              <div>
                <app-status-badge [status]="report.isCompleted !== undefined ? report.isCompleted : false"></app-status-badge>
              </div>
            </div>
            <div class="mb-3">
              <label class="form-label fw-bold">Created Date:</label>
              <p>{{ report.createdAt | date:'dd-MM-yyyy' }}</p>
            </div>
            <div class="mb-3" *ngIf="report.businessUnit">
              <label class="form-label fw-bold">Business Unit:</label>
              <p>{{ report.businessUnit }}</p>
            </div>
            <div class="mb-3" *ngIf="report.serviceSeg">
              <label class="form-label fw-bold">Service Seg:</label>
              <p>{{ report.serviceSeg }}</p>
            </div>
          </div>
        </div>
        
        <div class="row" *ngIf="report.createdBy">
          <div class="col-md-12">
            <label class="form-label fw-bold">Created By:</label>
            <div>
              <app-user-info [user]="report.createdBy"></app-user-info>
            </div>
          </div>
        </div>
        
        <div class="row mt-3" *ngIf="report.reportUsers && report.reportUsers.length > 0">
          <div class="col-md-12">
            <label class="form-label fw-bold">Assigned Users:</label>
            <div *ngFor="let userAssignment of getAssignedUsers()">
              <app-user-info [user]="userAssignment"></app-user-info>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class ReportDetailsComponent {
  @Input() report!: Report;
  
  getAssignedUsers() {
    // This is a simplified approach - in a real app, you'd need to resolve the user assignments
    // from the reportUsers property, which could be either UserAssignmentDTO[] or number[]
    return [];
  }
} 