import { Component, OnInit } from '@angular/core';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { NgbDateStruct, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from '../../../../../shared/common/sharedmodule';
import flatpickr from 'flatpickr';
import { FlatpickrDefaults, FlatpickrModule } from 'angularx-flatpickr';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-closed-tickets',
  standalone: true,
  imports: [SharedModule,NgSelectModule,NgbModule,AngularEditorModule,FlatpickrModule,RouterModule],
  templateUrl: './closed-tickets.component.html',
  styleUrls: ['./closed-tickets.component.scss'],
  providers: [
    FlatpickrDefaults,
  ],
})
export class ClosedTicketsComponent implements OnInit {
  model!: NgbDateStruct;
  model1!: NgbDateStruct;
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
