import { ChangeDetectionStrategy, Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { NgbDateStruct, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { SortableHeader, SortEvent } from '../../../../../shared/directives/sortable.directive';
import { DataAttendanceByUserService, PersonAttendanceByUser } from '../attendencebyuser/attendanceByUserSelectDropdown.service';
import { attendanceViewType } from './attendenceViewTableData';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { DecimalPipe, CommonModule } from '@angular/common';
import flatpickr from 'flatpickr';
import { FlatpickrDefaults, FlatpickrModule } from 'angularx-flatpickr';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../../../../shared/common/sharedmodule';

@Component({
  selector: 'app-attendenceview',
  standalone: true,
  imports: [NgbModule,NgSelectModule,CommonModule,FormsModule,NgCircleProgressModule,FlatpickrModule,RouterModule,SharedModule,RouterModule],
  templateUrl: './attendenceview.component.html',
  styleUrls: ['./attendenceview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    FlatpickrDefaults,
  ],
})
export class AttendenceviewComponent  {
 
  ngOnInit(): void {
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
}
