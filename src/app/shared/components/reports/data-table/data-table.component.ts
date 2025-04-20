import { Component, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingIndicatorComponent } from '../loading-indicator/loading-indicator.component';
import { NoDataComponent } from '../no-data/no-data.component';

export interface TableColumn<T> {
  label: string;
  property?: keyof T;
  cellTemplate?: TemplateRef<any>;
  sortable?: boolean;
  width?: string;
}

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [CommonModule, LoadingIndicatorComponent, NoDataComponent],
  template: `
    <div class="table-responsive">
      <app-loading-indicator *ngIf="loading" [message]="loadingMessage"></app-loading-indicator>
      
      <ng-container *ngIf="!loading">
        <app-no-data 
          *ngIf="data.length === 0"
          [title]="noDataTitle"
          [message]="noDataMessage"
          [icon]="noDataIcon"
        >
          <ng-content select="[table-empty]"></ng-content>
        </app-no-data>
        
        <table *ngIf="data.length > 0" class="table border text-nowrap mb-0 {{ tableClass }}">
          <thead>
            <tr>
              <th *ngFor="let column of columns" [style.width]="column.width">
                <div class="d-flex align-items-center">
                  {{ column.label }}
                  <a *ngIf="column.sortable" href="javascript:void(0)" (click)="onSort(column.property)" class="ms-1">
                    <i class="fe" 
                      [ngClass]="{ 
                        'fe-chevron-up': sortProperty === column.property && sortDirection === 'asc',
                        'fe-chevron-down': sortProperty === column.property && sortDirection === 'desc',
                        'fe-chevrons-up-down': sortProperty !== column.property
                      }"
                    ></i>
                  </a>
                </div>
              </th>
              <th *ngIf="showActions" class="text-end">Actions</th>
            </tr>
          </thead>
          
          <tbody>
            <tr *ngFor="let item of data">
              <ng-container *ngFor="let column of columns">
                <td *ngIf="column.cellTemplate">
                  <ng-container 
                    [ngTemplateOutlet]="column.cellTemplate" 
                    [ngTemplateOutletContext]="{ $implicit: item, column: column }"
                  ></ng-container>
                </td>
                <td *ngIf="!column.cellTemplate && column.property">
                  {{ getCellValue(item, column.property) }}
                </td>
              </ng-container>
              
              <td *ngIf="showActions" class="text-end">
                <ng-content select="[actions]" [ngTemplateOutletContext]="{ $implicit: item }"></ng-content>
              </td>
            </tr>
          </tbody>
        </table>
      </ng-container>
    </div>
  `,
  styles: [`
    .table th {
      font-weight: 600;
      padding: 1rem;
    }
    
    .table td {
      padding: 0.75rem 1rem;
      vertical-align: middle;
    }
    
    .table-hover tbody tr:hover {
      background-color: rgba(0, 0, 0, 0.04);
    }
  `]
})
export class DataTableComponent<T> {
  @Input() data: T[] = [];
  @Input() columns: TableColumn<T>[] = [];
  @Input() loading: boolean = false;
  @Input() showActions: boolean = true;
  
  @Input() tableClass: string = 'table-hover';
  @Input() loadingMessage: string = 'Loading data...';
  @Input() noDataTitle: string = 'No Data Available';
  @Input() noDataMessage: string = 'There are no items to display at this time.';
  @Input() noDataIcon: string = 'inbox';
  
  @Input() sortProperty?: keyof T;
  @Input() sortDirection: 'asc' | 'desc' = 'asc';
  
  @Output() sort = new EventEmitter<{property: keyof T, direction: 'asc' | 'desc'}>();
  
  getCellValue(item: T, property: keyof T): any {
    // Handle nested properties (e.g., 'user.name')
    if (typeof property === 'string' && property.includes('.')) {
      const props = property.split('.');
      let value: any = item;
      
      for (const prop of props) {
        if (value && typeof value === 'object') {
          value = value[prop as keyof typeof value];
        } else {
          value = undefined;
          break;
        }
      }
      
      return value;
    }
    
    return item[property];
  }
  
  onSort(property?: keyof T): void {
    if (!property) return;
    
    // Toggle direction if already sorting by this property
    if (this.sortProperty === property) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortProperty = property;
      this.sortDirection = 'asc';
    }
    
    this.sort.emit({
      property: this.sortProperty,
      direction: this.sortDirection
    });
  }
} 