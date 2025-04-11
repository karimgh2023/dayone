import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import * as data from '../dashboard/employeeDashboardChartData'
import { NgSelectModule } from '@ng-select/ng-select';
import { NgApexchartsModule } from 'ng-apexcharts';
import { RouterModule } from '@angular/router';
import flatpickr from 'flatpickr';
import { FlatpickrModule,FlatpickrDefaults  } from 'angularx-flatpickr';
@Component({
  selector: 'app-my-leaves',
  standalone: true,
  imports: [NgbModule,NgSelectModule,NgApexchartsModule,RouterModule,FlatpickrModule],
  templateUrl: './my-leaves.component.html',
  styleUrls: ['./my-leaves.component.scss'],
  providers:[FlatpickrDefaults]
})
export class MyLeavesComponent implements OnInit {
modal: any;
  constructor(private modalService: NgbModal) { }

  open(content:any) {
    this.modalService.open(content, { windowClass : 'modalCusSty' })
  }
  
  public donutData = data.DonutChartData;
  inlineDatePicker: boolean = false;
  weekNumbers!: true
  // selectedDate: Date | null = null; 
  flatpickrOptions: any = {
    inline: true,
   
  };
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
