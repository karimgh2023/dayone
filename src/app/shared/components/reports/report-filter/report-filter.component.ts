import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';

export interface ReportFilters {
  type?: string;
  status?: string;
  dateFrom?: Date | null;
  dateTo?: Date | null;
  searchTerm?: string;
}

@Component({
  selector: 'app-report-filter',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbDatepickerModule
  ],
  template: `
    <div class="card custom-card mb-4">
      <div class="card-header border-bottom">
        <h3 class="card-title">Filter Reports</h3>
        <div class="card-options">
          <button class="btn btn-sm btn-outline-primary" (click)="toggleFilters()">
            <i class="fe" [ngClass]="{'fe-chevron-up': showFilters, 'fe-chevron-down': !showFilters}"></i> 
            {{ showFilters ? 'Hide' : 'Show' }} Filters
          </button>
        </div>
      </div>
      <div class="card-body" *ngIf="showFilters">
        <form [formGroup]="filterForm" (ngSubmit)="applyFilters()">
          <div class="row">
            <div class="col-md-3 mb-3">
              <label class="form-label">Report Type</label>
              <select class="form-select" formControlName="type">
                <option value="">All Types</option>
                <option value="maintenance">Maintenance</option>
                <option value="inspection">Inspection</option>
                <option value="repair">Repair</option>
                <option value="replacement">Replacement</option>
                <option value="homologation">Homologation</option>
                <option value="requalification">Requalification</option>
              </select>
            </div>
            <div class="col-md-3 mb-3">
              <label class="form-label">Status</label>
              <select class="form-select" formControlName="status">
                <option value="">All Statuses</option>
                <option value="completed">Completed</option>
                <option value="pending">In Progress</option>
              </select>
            </div>
            <div class="col-md-3 mb-3">
              <label class="form-label">From Date</label>
              <div class="input-group">
                <input
                  type="date"
                  class="form-control"
                  formControlName="dateFrom"
                  placeholder="From Date"
                />
              </div>
            </div>
            <div class="col-md-3 mb-3">
              <label class="form-label">To Date</label>
              <div class="input-group">
                <input
                  type="date"
                  class="form-control"
                  formControlName="dateTo"
                  placeholder="To Date"
                />
              </div>
            </div>
            <div class="col-md-12 mb-3">
              <label class="form-label">Search</label>
              <input
                type="text"
                class="form-control"
                formControlName="searchTerm"
                placeholder="Search by equipment designation, ID, etc."
              />
            </div>
          </div>
          <div class="d-flex justify-content-end">
            <button type="button" class="btn btn-outline-secondary me-2" (click)="resetFilters()">
              Reset Filters
            </button>
            <button type="submit" class="btn btn-primary">
              Apply Filters
            </button>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .card-options {
      float: right;
    }
  `]
})
export class ReportFilterComponent implements OnInit {
  @Input() initialFilters: ReportFilters = {};
  @Output() filtersChanged = new EventEmitter<ReportFilters>();
  
  filterForm!: FormGroup;
  showFilters: boolean = false;
  
  constructor(private fb: FormBuilder) {}
  
  ngOnInit(): void {
    this.initForm();
  }
  
  private initForm(): void {
    this.filterForm = this.fb.group({
      type: [this.initialFilters.type || ''],
      status: [this.initialFilters.status || ''],
      dateFrom: [this.initialFilters.dateFrom || null],
      dateTo: [this.initialFilters.dateTo || null],
      searchTerm: [this.initialFilters.searchTerm || '']
    });
  }
  
  toggleFilters(): void {
    this.showFilters = !this.showFilters;
  }
  
  applyFilters(): void {
    if (this.filterForm.valid) {
      this.filtersChanged.emit(this.filterForm.value);
    }
  }
  
  resetFilters(): void {
    this.filterForm.reset({
      type: '',
      status: '',
      dateFrom: null,
      dateTo: null,
      searchTerm: ''
    });
    this.filtersChanged.emit(this.filterForm.value);
  }
} 