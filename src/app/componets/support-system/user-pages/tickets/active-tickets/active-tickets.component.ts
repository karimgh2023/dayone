import { Component, OnInit } from '@angular/core';
import { NgbDateStruct, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../../../../../shared/common/sharedmodule';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FlatpickrDefaults, FlatpickrModule } from 'angularx-flatpickr';
import flatpickr from 'flatpickr'
interface TicketActiveType {
  ID: string;
  title: string;
  opened : string;
  priority: string;
  priorityStatus: string;
  category: string;
  date: string;
  statusText: string;
  status: string;
  lastReplied : string;
}

const TicketActiveData:TicketActiveType[] = [
  {ID: '#289', title: 'Sed ut perspiciatis', opened: '12-01-2021 12:10AM', priority: 'Low', priorityStatus: 'success', category: '	Support', date: '12-01-2021', status: 'success', statusText: 'Open', lastReplied: '5 hours ago'},
  {ID: '#320', title: 'Excepteur occaecat', opened: '05-02-2021 10:00AM', priority: 'Low', priorityStatus: 'success', category: 'Services', date: '12-01-2021', status: 'primary', statusText: 'New', lastReplied: '12 hours ago'},
  {ID: '#837', title: 'Sample Test1', opened: '05-02-2021 05:30PM', priority: 'High', priorityStatus: 'danger', category: '	Customization', date: '12-01-2021', status: 'success', statusText: 'Open', lastReplied: '1 week ago'},
  {ID: '#124', title: 'Sample Test2', opened: '05-02-2021 10:45AM', priority: 'Medium', priorityStatus: 'warning', category: '	Support', date: '12-01-2021', status: 'danger', statusText: 'ReOpen', lastReplied: '3 week ago'},
  {ID: '#309', title: 'Ut aut reiciendi', opened: '21-04-2021 11:50AM', priority: 'Low', priorityStatus: 'success', category: '	Services', date: '12-01-2021', status: 'success', statusText: 'Open', lastReplied: '4 week ago'},
  {ID: '#117', title: 'Unde omnis iste natus', opened: '11-03-2021 12:50PM', priority: 'Low', priorityStatus: 'success', category: '	Services', date: '12-01-2021', status: 'success', statusText: 'Open', lastReplied: '1 month ago'},
  {ID: '#276', title: 'Et harum quidem', opened: '11-04-2021 03:50PM', priority: 'Medium', priorityStatus: 'warning', category: '	Support', date: '12-01-2021', status: 'success', statusText: 'Open', lastReplied: '3 month ago'},
  {ID: '#738', title: 'Maiores alias aut', opened: '17-03-2021 12:05AM', priority: 'Low', priorityStatus: 'success', category: '	Services', date: '12-01-2021', status: 'success', statusText: 'Open', lastReplied: '4 month ago'},
  {ID: '#498', title: 'Quis autem vel', opened: '17-02-2021 10:00AM', priority: 'High', priorityStatus: 'danger', category: '	Support', date: '12-01-2021', status: 'primary', statusText: 'new', lastReplied: '6 month ago'},
  {ID: '#298', title: 'Ut aut reiciendi', opened: '11-03-2021 02:10PM', priority: 'High', priorityStatus: 'danger', category: '	Services', date: '12-01-2021', status: 'danger', statusText: 'ReOpen', lastReplied: '1 year ago'},
]

@Component({
  selector: 'app-active-tickets',
  standalone: true,
  imports: [SharedModule,NgSelectModule,FormsModule,ReactiveFormsModule,NgbModule,RouterModule,FlatpickrModule],
  providers:[FlatpickrDefaults],
  templateUrl: './active-tickets.component.html',
  styleUrls: ['./active-tickets.component.scss']
})
export class ActiveTicketsComponent implements OnInit {
  model!: NgbDateStruct;
  model1!: NgbDateStruct;

  page = 1;
  pageSize = 8;
  collectionSize = TicketActiveData.length;
  ticketActive!: TicketActiveType[];
  
  constructor() {this.refreshticketActiveData(); }

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
  refreshticketActiveData() {
    this.ticketActive = TicketActiveData
      .map((ticketActiveData, i) => ({id: i + 1, ...ticketActiveData}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

}
