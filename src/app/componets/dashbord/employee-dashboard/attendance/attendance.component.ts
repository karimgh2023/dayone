import { CommonModule, DOCUMENT, DecimalPipe } from '@angular/common';
import { ChangeDetectorRef, Component, Inject, OnInit, QueryList, ViewChildren } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgbDateStruct, NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { SortableHeader, SortEvent } from '../../../../shared/directives/sortable.directive';
import { employeeAttendanceService } from './employeeAttendance.service';
import { employeeAttendanceList } from './employeeAttendanceTableData';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from '../../../../shared/common/sharedmodule';
import { FlatpickrDefaults, FlatpickrModule } from 'angularx-flatpickr';
import flatpickr from 'flatpickr'
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-attendance',
  standalone: true,
  imports: [NgbModule,CommonModule,FormsModule,ReactiveFormsModule,NgSelectModule,SharedModule,FlatpickrModule,RouterModule],
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss'],
  providers: [employeeAttendanceService, DecimalPipe,FlatpickrDefaults]
})
export class AttendanceComponent implements OnInit {
  model!: NgbDateStruct;
  model1!: NgbDateStruct;
  employeeAttendance$!: Observable<employeeAttendanceList[]>;
  total$!: Observable<number>;
  Time:any;

  @ViewChildren(SortableHeader) headers!: QueryList<SortableHeader>;
  constructor( public service: employeeAttendanceService, public dialog: MatDialog,  @Inject(DOCUMENT) private document: Document,private modalService:NgbModal,private cdr: ChangeDetectorRef) {
    this.employeeAttendance$ = service.employeeAttendanceData$;
    this.total$ = service.total$;
    this.futureDate.setDate(this.futureDate.getDate() + 2); // Set the future date to two days ahead
    this.startDate = new Date('Dec 1, 2023 00:00:00').getTime();
   }

   open(content:any) {
    this.modalService.open(content, { windowClass : 'modalCusSty' })
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
  futureDate = new Date();

  


  timerInterval:any;

  days!: number;
  hours!: number;
  minutes!: number;
  seconds!: number;
  private startDate: number;

  ngOnInit(): void {
    const time = setInterval(() => {
      const now = new Date().getTime();
      const distance = now - this.startDate;

      this.days = Math.floor(distance / (1000 * 60 * 60 * 24));
      this.hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      this.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      this.seconds = Math.floor((distance % (1000 * 60)) / 1000);

      this.cdr.detectChanges(); // Trigger change detection

      // If you want to stop the interval after a certain condition, you can set it here
      // if (someCondition) {
      //   clearInterval(time);
      // }
    }, 1000);
  
    
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

inlineDatePicker: boolean = false;
  weekNumbers!: true
  // selectedDate: Date | null = null; 
  flatpickrOptions: any = {
    inline: true,
   
  };
  // flatpickrOptions: FlatpickrOptions;



}