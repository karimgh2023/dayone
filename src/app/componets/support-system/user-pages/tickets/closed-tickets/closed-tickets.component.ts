import { Component, OnInit } from '@angular/core';
import { NgbDateStruct, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../../../../../shared/common/sharedmodule';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import flatpickr from 'flatpickr';
import { FlatpickrDefaults, FlatpickrModule } from 'angularx-flatpickr';
@Component({
  selector: 'app-closed-tickets',
  standalone: true,
  imports: [SharedModule,NgbModule,NgSelectModule,FormsModule,ReactiveFormsModule,RouterModule,FlatpickrModule],
  providers:[FlatpickrDefaults],
  templateUrl: './closed-tickets.component.html',
  styleUrls: ['./closed-tickets.component.scss']
})
export class ClosedTicketsComponent implements OnInit {
  model!: NgbDateStruct;
  model1!: NgbDateStruct;
  page =1;
  constructor() { }
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
  tickets=[
    {
      id:"#289",
      name:"Sed ut  perspiciatis",
      bg:"success",
      priority:"Low",
      date:"12-01-2021 12:10AM",
      status:"Closed",
      lastreply:"5 hours ago",
      category:"Support"
    },
    {
      id:"#320",
      name:"Excepteur occaecat",
      bg:"success",
      priority:"Low",
      date:"05-02-2021 10:00AM",
      status:"Closed",
      lastreply:"12 hours ago",
      category:"Services"
    },
    {
      id:"#837",
      name:"Sample Test1",
      bg:"danger",
      priority:"High",
      date:"05-02-2021 05:30PM",
      status:"Closed",
      lastreply:"1 week ago",
      category:"Customization"
    },
    {
      id:"#124",
      name:"Sample Test2",
      bg:"warning",
      priority:"Medium",
      date:"05-02-2021 10:45AM",
      status:"Closed",
      lastreply:"3 weeks ago",
      category:"Support"
    },
    {
      id:"#309",
      name:"Ut aut reiciendi",
      bg:"success",
      priority:"Low",
      date:"21-04-2021 11:50AM",
      status:"Closed",
      lastreply:"4 weeks ago",
      category:"Services"
    },
    {
      id:"#117",
      name:"Unde omnis iste natus",
      bg:"success",
      priority:"Low",
      date:"11-03-2021 12:50PM",
      status:"Closed",
      lastreply:"1 month ago",
      category:"Services"
    },
    {
      id:"#276",
      name:"Et harum quidem",
      bg:"warning",
      priority:"Medium",
      date:"11-04-2021 03:50PM",
      status:"Closed",
      lastreply:"3 months ago",
      category:"Support"
    },
    {
      id:"#738",
      name:"Maiores alias aut",
      bg:"success",
      priority:"Low",
      date:"17-03-2021 12:05AM",
      status:"Closed",
      lastreply:"4 months ago",
      category:"Services"
    },
    {
      id:"#498",
      name:"Quis autem vel",
      bg:"danger",
      priority:"High",
      date:"17-02-2021 10:00AM",
      status:"Closed",
      lastreply:"6 months ago",
      category:"Support"
    },
    {
      id:"#298",
      name:"Ut aut reiciendi",
      bg:"danger",
      priority:"High",
      date:"11-03-2021 02:10PM",
      status:"Closed",
      lastreply:"1 year ago",
      category:"Services"
    }
  ]

}
