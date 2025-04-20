import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalItems: number;
}

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  template: `
    <nav aria-label="Page navigation" *ngIf="totalPages > 1">
      <ul class="pagination justify-content-center">
        <li class="page-item" [class.disabled]="currentPage === 1">
          <a class="page-link" href="javascript:void(0)" (click)="changePage(1)" aria-label="First">
            <span aria-hidden="true">&laquo;&laquo;</span>
          </a>
        </li>
        <li class="page-item" [class.disabled]="currentPage === 1">
          <a class="page-link" href="javascript:void(0)" (click)="changePage(currentPage - 1)" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        
        <ng-container *ngFor="let page of getVisiblePages()">
          <li class="page-item" [class.active]="page === currentPage">
            <a class="page-link" href="javascript:void(0)" (click)="changePage(page)">{{ page }}</a>
          </li>
        </ng-container>
        
        <li class="page-item" [class.disabled]="currentPage === totalPages">
          <a class="page-link" href="javascript:void(0)" (click)="changePage(currentPage + 1)" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
        <li class="page-item" [class.disabled]="currentPage === totalPages">
          <a class="page-link" href="javascript:void(0)" (click)="changePage(totalPages)" aria-label="Last">
            <span aria-hidden="true">&raquo;&raquo;</span>
          </a>
        </li>
      </ul>
      
      <div class="text-center mt-3 text-muted">
        <small>
          Showing {{ getStartItem() }}-{{ getEndItem() }} of {{ totalItems }} items | 
          Page {{ currentPage }} of {{ totalPages }}
        </small>
      </div>
    </nav>
  `,
  styles: [`
    .pagination {
      margin-bottom: 0;
    }
  `]
})
export class PaginationComponent {
  @Input() currentPage: number = 1;
  @Input() totalPages: number = 1;
  @Input() pageSize: number = 10;
  @Input() totalItems: number = 0;
  @Input() maxVisiblePages: number = 5;
  
  @Output() pageChange = new EventEmitter<number>();
  
  changePage(page: number): void {
    if (page < 1 || page > this.totalPages || page === this.currentPage) {
      return;
    }
    
    this.pageChange.emit(page);
  }
  
  getVisiblePages(): number[] {
    const pages: number[] = [];
    
    if (this.totalPages <= this.maxVisiblePages) {
      // If we have fewer pages than the max visible, show all
      for (let i = 1; i <= this.totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Calculate the start and end pages to display
      let startPage = Math.max(1, this.currentPage - Math.floor(this.maxVisiblePages / 2));
      let endPage = startPage + this.maxVisiblePages - 1;
      
      // Adjust if we're near the end
      if (endPage > this.totalPages) {
        endPage = this.totalPages;
        startPage = Math.max(1, endPage - this.maxVisiblePages + 1);
      }
      
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
    }
    
    return pages;
  }
  
  getStartItem(): number {
    return (this.currentPage - 1) * this.pageSize + 1;
  }
  
  getEndItem(): number {
    return Math.min(this.currentPage * this.pageSize, this.totalItems);
  }
} 