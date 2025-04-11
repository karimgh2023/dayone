import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import * as data from '../dashboard/employeeDashboardChartData'
import { NgApexchartsModule } from 'ng-apexcharts';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from '../../../../shared/common/sharedmodule';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import flatpickr from 'flatpickr';
import { FlatpickrDefaults, FlatpickrModule } from 'angularx-flatpickr';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions, EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGrigPlugin from '@fullcalendar/timegrid';
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';
import moment from 'moment';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-apply-leaves',
  standalone: true,
  imports: [NgApexchartsModule,NgSelectModule,SharedModule,FormsModule,ReactiveFormsModule,FlatpickrModule,FullCalendarModule,RouterModule],
  templateUrl: './apply-leaves.component.html',
  styleUrls: ['./apply-leaves.component.scss'],
  providers: [
    FlatpickrDefaults,
  ],
})
export class ApplyLeavesComponent implements OnInit {
  model!:NgbDateStruct;
  model1!:NgbDateStruct;
  public donutData = data.DonutChartData;

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
  // flatpickrOptions: FlatpickrOptions;

 
  @ViewChild('external', { static: false }) external!: ElementRef;
  calendarPlugins = [dayGridPlugin, timeGrigPlugin, interactionPlugin];
  curYear = moment().format('YYYY');
  curMonth = moment().format('MM');
  calendarEvents: EventInput[] = [
    {
      id: '1',
      start: this.curYear + '-' + this.curMonth + '-02',
      end: this.curYear + '-' + this.curMonth + '-02',
      title: 'Spruko Meetup',
      className: 'bg-secondary-transparent',
    },
   {
    id: '2',
    start: this.curYear + '-' + this.curMonth + '-17',
    end: this.curYear + '-' + this.curMonth + '-17',
    title: 'Design Review',
    className: "bg-info-transparent",
  
  },
   {
    id: '3',
    start: this.curYear + '-' + this.curMonth + '-13',
    end: this.curYear + '-' + this.curMonth + '-13',
    title: 'Lifestyle Conference',
    className: "bg-primary-transparent",
    
  }, 
  {
    id: '4',
    start: this.curYear + '-' + this.curMonth + '-21',
    end: this.curYear + '-' + this.curMonth + '-21',
    title: 'Team Weekly Brownbag',
    className: "bg-warning-transparent",
    
  },
   {
    id: '5',
    start: this.curYear + '-' + this.curMonth + '-04T10:00:00',
    end: this.curYear + '-' + this.curMonth + '-06T15:00:00',
    title: 'Music Festival',
    className: "bg-success-transparent",
   
  },
   {
    id: '6',
    start: this.curYear + '-' + this.curMonth + '-08',
    end: this.curYear + '-' + this.curMonth + '-08',
    title: 'Attend Lea\'s Wedding',
    className: "bg-success-transparent",

  },
  {
    id: '7',
    start: this.curYear + '-' + this.curMonth + '-06',
    end: this.curYear + '-' + this.curMonth + '-06',
    title: 'Harcates Birthday',
    className: "bg-info-transparent",
    
  }, 
  {
    id: '8',
    start: this.curYear + '-' + this.curMonth + '-28',
    end: this.curYear + '-' + this.curMonth + '-28',
    title: 'Bunnysin\'s Birthday',
    className: "bg-info-transparent",
  },
  {
    id: '9',
    start: this.curYear + '-' + this.curMonth + '-03',
    end: this.curYear + '-' + this.curMonth + '-03',
    title: 'Lee shin\'s Birthday',
    className: "bg-info-transparent",
  }, 
  {
    id: '10',
    start: this.curYear + '-' + 11 + '-11',
    end: this.curYear + '-' + 11 + '-11',
    title: 'Shinchan\'s Birthday',
    className: "bg-info-transparent",
  },
  ];
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',

    headerToolbar: {
      left: 'prev',
      center: 'title',
      right:'next'
    },
    navLinks: true, // can click day/week names to navigate views
    businessHours: true, // display business hours
    editable: true,
    selectable: true,
    selectMirror: true,
    droppable: true,
    weekends: true,
    dayMaxEvents: true, // allow "more" link when too many events
    dateClick: (arg) => this.handleDateClick(arg),
    eventClick: (arg) => this.handleEventClick(arg),
  };
  handleDateClick(arg: any) {
    const title = prompt('Event Title:');
    if (title) {
      this.calendarEvents = this.calendarEvents.concat({
        title: title,
        start: arg.date,
        allDay: arg.allDay,
      });
    }
  }
  handleEventClick(arg: any) {
    if (confirm('Are you sure you want to delete this event?')) {
      arg.event.remove();
    }
  }


}
