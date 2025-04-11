import { Component, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import flatpickr from 'flatpickr';
import { FlatpickrDefaults, FlatpickrModule } from 'angularx-flatpickr';
import { CalendarView, CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarModule } from 'angular-calendar';
import { subDays, startOfDay, addDays, endOfMonth, addHours, isSameMonth, isSameDay, endOfDay } from 'date-fns';
import { Subject } from 'rxjs';
import { SharedModule } from '../../../../shared/common/sharedmodule';
import { RouterModule } from '@angular/router';
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
  selector: 'app-holidays',
  standalone: true,
  imports: [SharedModule,NgSelectModule,NgbModule,FlatpickrModule,CalendarModule,RouterModule],
  providers: [
    FlatpickrDefaults,
  ],
  templateUrl: './holidays.component.html',
  styleUrl: './holidays.component.scss'
})
export class HolidaysComponent {
  holidays=[
    {
      number:"01",
      day:"Thursday",
      date:"14-01-2021",
      holidaytype:"Pongal Holiday"
    },
    {
      number:"02",
      day:"Tuesday",
      date:"26-01-2021",
      holidaytype:"Republic Holiday"
    },
    {
      number:"03",
      day:"Thursday",
      date:"11-03-2021",
      holidaytype:"Mahashivratri Holiday"
    },
    {
      number:"04",
      day:"Monday",
      date:"29-03-2021",
      holidaytype:"Holi Holiday"
    },
    {
      number:"05",
      day:"Tuesday",
      date:"13-04-2021",
      holidaytype:"Ugadi Holiday"
    },
    {
      number:"06",
      day:"Wednesday",
      date:"14-04-2021",
      holidaytype:"Ambedkar Jayanti Holiday"
    },
    {
      number:"07",
      day:"Sunday",
      date:"15-08-2021",
      holidaytype:"Independence Day Holiday"
    },
    {
      number:"08",
      day:"Friday",
      date:"10-09-2021",
      holidaytype:"Ganesh Chaturthi Holiday"
    },
    {
      number:"09",
      day:"Friday",
      date:"02-10-2021",
      holidaytype:"Gandhi Jayanti Holiday"
    },
    {
      number:"10",
      day:"Friday",
      date:"14-10-2021",
      holidaytype:"Dussehra Holiday"
    },
    {
      number:"11",
      day:"Friday",
      date:"04-11-2021",
      holidaytype:"Diwali Holiday"
    },
    {
      number:"12",
      day:"Saturday",
      date:"25-12-2021",
      holidaytype:"Merry Christmas Holiday"
    }
  ]
  remove(number:string){
    const data = this.holidays.filter((x: { number: string }) => x.number !== number);
    this.holidays = data;
  }
  constructor(private modalService: NgbModal) { }
  open(content:any) {
    this.modalService.open(content, {  windowClass : 'modalCusSty' ,})
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


  @ViewChild('modalContent', { static: true })
  modalContent!: TemplateRef<any>;

  CalendarView = CalendarView;
  view: CalendarView = CalendarView.Month;
  viewDate: Date = new Date();

  modalData!: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    },
  ];

  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] = [
    {
      start: subDays(startOfDay(new Date()), 1),
      end: addDays(new Date(), 1),
      title: 'Calender Event',
      color: colors.red,
      actions: this.actions,
      allDay: false,
      draggable: true,
      cssClass: 'primary',
    },
    {
      start: startOfDay(new Date()),
      end: new Date(),
      title: 'Birthday EVents',
      color: colors.yellow,
      actions: this.actions,
      draggable: true,
      cssClass: 'secondary ',
    },
    {
      start: subDays(endOfMonth(new Date()), 3),
      end: addDays(endOfMonth(new Date()), 3),
      title: 'Holiday Calendar',
      color: colors.blue,
      allDay: true,
      draggable: true,
      cssClass: 'success  ',
    },
    {
      start: addHours(startOfDay(new Date()), 2),
      end: addHours(new Date(), 2),
      title: 'Office Events',
      color: colors.blue,
      actions: this.actions,
      draggable: true,
      cssClass: 'info  ',
    },
    {
      start: addHours(startOfDay(new Date()), 2),
      end: addHours(new Date(), 2),
      title: 'Other Events',
      color: colors.blue,
      actions: this.actions,
      draggable: true,
      cssClass: 'warning  ',
    },
    {
      start: addHours(startOfDay(new Date()), 2),
      end: addHours(new Date(), 2),
      title: 'Festival Events',
      color: colors.blue,
      actions: this.actions,
      draggable: true,
      cssClass: 'danger  ',
    },
    {
      start: addHours(startOfDay(new Date()), 2),
      end: addHours(new Date(), 2),
      title: 'TimeLine Events',
      color: colors.blue,
      actions: this.actions,
      draggable: true,
      cssClass: 'teal  ',
    },
  ];

  activeDayIsOpen: boolean = false;

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
  }
  newEvent!: CalendarEvent;
  addEvent(): void {
    this.newEvent = {
      title: 'New event',
      start: startOfDay(new Date()),
      end: endOfDay(new Date()),
      color: colors.red,
      draggable: true,
      actions: this.actions,
      cssClass: 'primary'
    };
    this.events.push(this.newEvent);

    this.handleEvent('Add new event', this.newEvent);
    this.refresh.next(true);
  }

  eventDropped({
    event,
    newStart,
    newEnd,
    allDay,
  }: CalendarEventTimesChangedEvent): void {
    const externalIndex = this.events.indexOf(event);
    if (typeof allDay !== 'undefined') {
      event.allDay = allDay;
    }
    if (externalIndex > -1) {
      this.events.splice(externalIndex, 1);
      this.events.push(event);
    }
    event.start = newStart;
    if (newEnd) {
      event.end = newEnd;
    }
    if (this.view === 'month') {
      this.viewDate = newStart;
      this.activeDayIsOpen = true;
    }
    this.events = [...this.events];
  }

  externalDrop(event: CalendarEvent) {
    if (this.events.indexOf(event) === -1) {
      this.events = this.events.filter((iEvent) => iEvent !== event);
      this.events.push(event);
    }
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
}
