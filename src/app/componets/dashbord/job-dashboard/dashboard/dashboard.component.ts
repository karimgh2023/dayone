import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DlDateTimePickerChange } from 'angular-bootstrap-datetimepicker';
import * as data from './dashboardChartData';
import { SharedModule } from '../../../../shared/common/sharedmodule';
import { NgApexchartsModule } from 'ng-apexcharts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions, EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGrigPlugin from '@fullcalendar/timegrid';
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';
import moment from 'moment';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SharedModule,NgApexchartsModule,NgbModule,NgSelectModule,FullCalendarModule,RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  active =1;
  
  maxView = 'year';
  minuteStep = 5;
  minView = 'minute';
  selectedDate!: Date;
  showCalendar = true;
  startView = 'day';
  views = ['minute', 'hour', 'day', 'month', 'year'];


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


  refresh() {
    this.showCalendar = false;
    setTimeout(() => (this.showCalendar = true), 100);
  }
  constructor() { }

  ngOnInit(): void {
  }

  //Line Chart
  public MultipleChartOptions = data.lineChartOptions
  public MultipleChartData = data.lineChartData
  public MultipleChartType = data.lineChartType
  
  public donutData = data.DonutChartData;
  chartOptions:any={
    series: [
        {
            type: 'line',
            name: 'Applications',
            data: [
                {
                    x: 'Jan',
                    y: 100
                },
                {
                    x: 'Feb',
                    y: 510
                },
                {
                    x: 'Mar',
                    y: 180
                },
                {
                    x: 'Apr',
                    y: 354
                },
                {
                    x: 'May',
                    y: 230
                },
                {
                    x: 'Jun',
                    y: 320
                },
                {
                    x: 'Jul',
                    y: 656
                },
                {
                    x: 'Aug',
                    y: 510
                },
                {
                    x: 'Sep',
                    y: 350
                },
                {
                    x: 'Oct',
                    y: 350
                },
                {
                    x: 'Nov',
                    y: 210
                },
                {
                    x: 'Dec',
                    y: 410
                }
            ]
        },
        {
            type: 'line',
            name: 'Shortlisted',
            chart: {
                dropShadow: {
                    enabled: true,
                    enabledOnSeries: undefined,
                    top: 5,
                    left: 0,
                    blur: 3,
                    color: '#000',
                    opacity: 0.1
                }
            },
            data: [
                {
                    x: 'Jan',
                    y: 180
                },
                {
                    x: 'Feb',
                    y: 520
                },
                {
                    x: 'Mar',
                    y: 106
                },
                {
                    x: 'Apr',
                    y: 320
                },
                {
                    x: 'May',
                    y: 520
                },
                {
                    x: 'Jun',
                    y: 780
                },
                {
                    x: 'Jul',
                    y: 435
                },
                {
                    x: 'Aug',
                    y: 515
                },
                {
                    x: 'Sep',
                    y: 738
                },
                {
                    x: 'Oct',
                    y: 454
                },
                {
                    x: 'Nov',
                    y: 525
                },
                {
                    x: 'Dec',
                    y: 230
                }
            ]
        },
        {
            type: 'area',
            chart: {
                dropShadow: {
                    enabled: true,
                    enabledOnSeries: undefined,
                    top: 5,
                    left: 0,
                    blur: 3,
                    color: '#000',
                    opacity: 0.1
                }
            },
            data: [
                {
                    x: 'Jan',
                    y: 400
                },
                {
                    x: 'Feb',
                    y: 730
                },
                {
                    x: 'Mar',
                    y: 610
                },
                {
                    x: 'Apr',
                    y: 430
                },
                {
                    x: 'May',
                    y: 580
                },
                {
                    x: 'Jun',
                    y: 620
                },
                {
                    x: 'Jul',
                    y: 780
                },
                {
                    x: 'Aug',
                    y: 535
                },
                {
                    x: 'Sep',
                    y: 575
                },
                {
                    x: 'Oct',
                    y: 738
                },
                {
                    x: 'Nov',
                    y: 654
                },
                {
                    x: 'Dec',
                    y: 780
                }
            ]
        }
    ],
    chart: {
        height: 310,
        animations: {
            speed: 500
        },
        toolbar: {
            show: false,
        },
        dropShadow: {
            enabled: true,
            enabledOnSeries: undefined,
            top: 8,
            left: 0,
            blur: 3,
            color: '#000',
            opacity: 0.1
        },
    },
    colors: ["#3366ff", "rgba(51, 102, 255, 0.5)", "rgba(119, 119, 142, 0.05)"],
    dataLabels: {
        enabled: false
    },
    grid: {
        borderColor: '#f1f1f1',
        strokeDashArray: 3
    },
    stroke: {
        curve: 'smooth',
        width: [3, 3, 3],
        dashArray: [0, 6, 0],
    },
    xaxis: {
        axisTicks: {
            show: false,
        },
    },
    yaxis: {
        labels: {
            formatter: function (value:any) {
                return "$" + value;
            }
        },
    },
    tooltip: {
        y: [{
            formatter: function(e:any) {
                return void 0 !== e ? "$" + e.toFixed(0) : e
            }
        }, {
            formatter: function(e:any) {
                return void 0 !== e ? "$" + e.toFixed(0) : e
            }
        }, {
            formatter: function(e:any) {
                return void 0 !== e ? e.toFixed(0) : e
            }
        }]
    },
    legend: {
        show: false,
        customLegendItems: ['Profit', 'Revenue', 'Sales'],
        inverseOrder: true
    },
    toolbar: {
        show: false,
    },
    title: {
        show: false,
    },
    markers: {
        hover: {
            sizeOffset: 5
        }
    }
  }
  chartOptions1:any={
    series: [80, 29, 50, 30],
    labels: ["Applications", "Interviews", "Reject", "Hired"],
    chart: {
        height: 280,
        type: 'donut',
        toolbar: {
            show: false,
        },
    },
    dataLabels: {
        enabled: false,
    },

    legend: {
        show: false,
		position: "bottom",
		horizontalAlign: "center",
		offsetY: 8,
		fontWeight: "normal",
		fontSize: '14px',

		markers: {
			width: 12,
			height: 12,
			strokeWidth: 0,
			strokeColor: '#fff',
			fillColors: undefined,
			radius: 4,
			customHTML: undefined,
			onClick: undefined,
			offsetX: 0,
			offsetY: 0
		},
    },
    stroke: {
        show: true,
        curve: 'smooth',
        lineCap: 'round',
        colors: "#fff",
        width: 0,
        dashArray: 0,
    },
    plotOptions: {
        pie: {
            expandOnClick: false,
            donut: {
                size: '80%',
                background: 'transparent',
                labels: {
                    show: true,
                    name: {
                        show: true,
                        fontSize: '20px',
                        color: '#6c6f9a',
                        offsetY: -13
                    },
                    value: {
                        show: true,
                        fontSize: '30px',
                        fontWeight: 500,
                        color: undefined,
                        offsetY: 8,
                        formatter: function (val: string) {
                            return val + "%"
                        }
                    },
                    total: {
                        show: true,
                        showAlways: true,
                        label: 'Total overview',
                        fontSize: '18px',
                        fontWeight: 400,
                        color: '#6c6f9a',
                    }

                }
            }
        }
    },
    colors: ["rgba(51, 102, 255, 1)", "rgba(254, 127, 0, 1)","#f7284a", "#0dcd94"],
  }
}
