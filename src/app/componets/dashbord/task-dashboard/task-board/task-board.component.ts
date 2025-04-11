import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgApexchartsModule } from 'ng-apexcharts';
// import { DragulaService } from 'ng2-dragula';
import { Subscription } from 'rxjs';
import { MaterialModuleModule } from '../../../../material-module/material-module.module';
import { SharedModule } from '../../../../shared/common/sharedmodule';
import { OverlayscrollbarsModule } from 'overlayscrollbars-ngx';
import { FlatpickrDefaults, FlatpickrModule } from 'angularx-flatpickr';
import flatpickr from 'flatpickr'
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-task-board',
  standalone: true,
  imports: [SharedModule,NgbModule,NgSelectModule,NgApexchartsModule,FlatpickrModule,MaterialModuleModule,FormsModule,ReactiveFormsModule,OverlayscrollbarsModule,RouterModule],
  templateUrl: './task-board.component.html',
  styleUrls: ['./task-board.component.scss'],
  providers: [FlatpickrDefaults]
})
export class TaskBoardComponent implements OnInit {

  BAG = "DRAGULA_EVENTS";
  subs = new Subscription();


  constructor(private modalService: NgbModal) { }
  open(content:any){
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
 
  ngOnDestroy() {
    this.subs.unsubscribe();
  }
  addClass(el: any, classes: string) {  }
  removeClass(ele: any, classes: string) {  }
}
