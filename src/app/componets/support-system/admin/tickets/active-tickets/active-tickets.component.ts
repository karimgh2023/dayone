import { Component, OnInit } from '@angular/core';
import { NgbDateStruct, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../../../../../shared/common/sharedmodule';
import { NgSelectModule } from '@ng-select/ng-select';
import flatpickr from 'flatpickr';
import { FlatpickrDefaults, FlatpickrModule } from 'angularx-flatpickr';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-active-tickets',
  standalone: true,
  imports: [SharedModule,NgSelectModule,NgbModule,FlatpickrModule,RouterModule],
  templateUrl: './active-tickets.component.html',
  styleUrls: ['./active-tickets.component.scss'],
  providers: [
    FlatpickrDefaults,
  ],
})
export class ActiveTicketsComponent implements OnInit {
  model!: NgbDateStruct;
  page = 1;
  constructor() { }

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
