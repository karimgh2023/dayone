import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
  OnInit,
  ElementRef
} from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { EventInput, Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGrigPlugin from '@fullcalendar/timegrid';
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';
import moment from 'moment';
import { SharedModule } from '../../../shared/common/sharedmodule';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'angular-calendar';
import { RouterModule } from '@angular/router';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [SharedModule,CalendarModule,FormsModule,ReactiveFormsModule,FullCalendarModule,RouterModule],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarComponent  {


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
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,dayGridWeek,dayGridDay',
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

  ngAfterViewInit(): void {
    const containerEl = this.external.nativeElement;
    new Draggable(containerEl, {
      itemSelector: '.fc-event',
      eventData: (eventEl: { innerText: string; className: string }) => {
        return {
          title: eventEl.innerText.trim(),
          className: eventEl.className + ' overflow-hidden',
        };
      },
    });
  }
}
