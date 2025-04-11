import { MaterialModuleModule } from './../../../../material-module/material-module.module';
import { Component, QueryList, ViewChildren } from '@angular/core';
import { Observable } from 'rxjs';
import { SortEvent, SortableHeader } from '../../../../shared/directives/sortable.directive';
import { expensesList } from './expensesTableData';
import { expensesService } from './expenses.service';
import { MatDialog } from '@angular/material/dialog';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule, DecimalPipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import flatpickr from 'flatpickr';
import { FlatpickrDefaults, FlatpickrModule } from 'angularx-flatpickr';
import { SharedModule } from '../../../../shared/common/sharedmodule';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-expenses',
  standalone: true,
  imports: [CommonModule,MaterialModuleModule,FormsModule,ReactiveFormsModule,NgbModule,NgSelectModule,FlatpickrModule,SharedModule,RouterModule],
  templateUrl: './expenses.component.html',
  styleUrl: './expenses.component.scss',
  providers: [expensesService, DecimalPipe,FlatpickrDefaults]
})
export class ExpensesComponent {
  expenses$!: Observable<expensesList[]>;
  total$!: Observable<number>;
  @ViewChildren(SortableHeader) headers!: QueryList<SortableHeader>;
  constructor(private modalService: NgbModal, public service: expensesService, public dialog: MatDialog) {
    this.expenses$ = service.expensesData$;
    this.total$ = service.total$;
   }
   onSort({column, direction}: SortEvent | any) {
    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.service.sortColumn = column;
    this.service.sortDirection = direction;
  }
  
  deleteData(d:any){
    this.expenses$.subscribe(result => {
      const index = result.indexOf(d);
      result.splice(index,1)
    })
   }

   checked(d:any){
    this.expenses$.subscribe(result =>{
      const index = result.indexOf(d);
      result[index].check = false
      result[index].x = false
      result[index].ApprovalStatus = "Approved"
      result[index].statusBg = "badge bg-success"
    })
   }
   cancel(d:any){
    this.expenses$.subscribe(result =>{
      const index = result.indexOf(d);
      result[index].check = false
      result[index].x = false
      result[index].ApprovalStatus = "Rejected"
      result[index].statusBg = "badge bg-danger"
    })

   }
   openDialog(content:any) {
    this.modalService.open(content, {  windowClass : 'modalCusSty' ,size:'lg'})
  }
  inlineDatePicker: boolean = false;
  weekNumbers!: true
  // selectedDate: Date | null = null; 
  flatpickrOptions: any = {
    inline: true,
   
  };
  // flatpickrOptions: FlatpickrOptions;


  ngOnInit() {
    this.flatpickrOptions = {
      enableTime: true,
      noCalendar: true,
      dateFormat: 'H:i',
    };

    flatpickr('#inlinetime', this.flatpickrOptions);

      this.flatpickrOptions = {
        enableTime: true,
        dateFormat: 'Y-m-d H:i', // Specify the format you want
        defaultDate: '2023-11-07 14:30', // Set the default/preloaded time (adjust this to your desired time)
      };

      flatpickr('#pretime', this.flatpickrOptions);
  }

}
