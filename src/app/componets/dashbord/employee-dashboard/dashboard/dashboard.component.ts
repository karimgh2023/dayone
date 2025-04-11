import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarModule, CalendarView } from 'angular-calendar';
import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
// import { DlDateTimePickerChange } from 'angular-bootstrap-datetimepicker';
import * as data from './employeeDashboardChartData'
import { SharedModule } from '../../../../shared/common/sharedmodule';
import { NgApexchartsModule } from 'ng-apexcharts';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { subDays, startOfDay, addDays, endOfMonth, addHours, isSameMonth, isSameDay, endOfDay } from 'date-fns';
import { Subject } from 'rxjs';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions, EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGrigPlugin from '@fullcalendar/timegrid';
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';
import moment from 'moment';
import flatpickr from 'flatpickr';
import { FlatpickrDefaults, FlatpickrModule } from 'angularx-flatpickr';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
const colors = {
  red: {
    primary: '#705ec8',
    secondary: '#6958be',
  },
  blue: {
    primary: '#fb1c52',
    secondary: '#f83e6b',
  },
  yellow: {
    primary: '#ffab00',
    secondary: '#f3a403',
  },
};
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SharedModule,NgApexchartsModule,NgbModule,CalendarModule,FullCalendarModule,RouterModule,FlatpickrModule,NgSelectModule],
  providers:[FlatpickrDefaults],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private modalService: NgbModal) {    this.futureDate.setDate(this.futureDate.getDate() + 2);
  }
  futureDate = new Date();


  timerInterval:any;

  days!: number;
  hours!: number;
  mins!: number;
  secs!: number;


  updateTimer() {
    const currentDate = new Date();
    const timeDifference = this.futureDate.getTime() - currentDate.getTime();
    
    if (timeDifference > 0) {
      this.days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      this.hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      this.mins = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
      this.secs = Math.floor((timeDifference % (1000 * 60)) / 1000);

        this.futureDate.setSeconds(this.futureDate.getSeconds() - 1); // Decrease future date by one second
    } else {
        clearInterval(this.timerInterval);
    }
}
  
  // Bar Chart 1
  public barChartOptions = data.barChartOptions;
  public barChartData = data.barChartData;
  public barChartType = data.barChartType;
  public barChartPlugins = data.barChartPlugins;


  
  chartOptions:any=
    {
      series: [{
        name: "Earnings",
        data: [80, 60, 50, 30, 65, 35, 64, 51, 59, 80, 70, 78]
    }, {
        name: "Students",
        data: [85, 65, 55, 37, 60, 32, 47, 31, 54, 70, 60, 62]
    }],
    chart: {
        height: 370,
        type: "bar",
        toolbar: {
            show: false,
        },
    },
    dataLabels: {
        enabled: false
    },
    stroke: {
        width: [1, 1],
        show: true,
        curve: ['smooth', 'smooth'],
    },
    grid: {
        borderColor: '#f3f3f3',
        strokeDashArray: 3
    },
    xaxis: {
        axisBorder: {
            color: 'rgba(119, 119, 142, 0.05)',
        },
    },
    legend: {
        show: false
    },
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    markers: {
        size: 0
    },
    colors: ["rgba(51, 102, 255, 0.2)", "rgb(51, 102, 255)"],
    plotOptions: {
        bar: {
            columnWidth: "35%",
            borderRadius: 6,
            borderRadiusApplication: 'end',
        }
    },  
    }

    modal: any;

  
    inlineDatePicker: boolean = false;
    weekNumbers!: true
    // selectedDate: Date | null = null; 
    flatpickrOptions: any = {
      inline: true,
     
    };
    // flatpickrOptions: FlatpickrOptions;
  
  
    ngOnInit() {
      setInterval(() => {
        this.timerInterval =  this.updateTimer();
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
  
    open(content:any) {
      this.modalService.open(content, { windowClass : 'modalCusSty' })
    }
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

