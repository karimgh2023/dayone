import { NgApexchartsModule } from 'ng-apexcharts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DlDateTimePickerChange } from 'angular-bootstrap-datetimepicker';
import * as data from './clientDashboardChatData';
import { SharedModule } from '../../../../shared/common/sharedmodule';
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
  imports: [SharedModule,NgSelectModule,NgbModule,NgApexchartsModule,FullCalendarModule,RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  active = 1;
  optionsCircle:any={
    chart: {
      height: 100,
      type: "radialBar",
  },

  series: [75],
  colors: ["#0dcd94"],
  plotOptions: {
      radialBar: {
          hollow: {
              margin: 0,
              size: "40%",
              background: "#fff"
          },
          dataLabels: {
              name: {
                  offsetY: 4,
                  fontSize: ".825rem",
                  fontFamily: "Roboto",
                  fontWeight: 500,
                  colors: "#4b9bfa"
              },
              value: {
                  offsetY: 5,
                  color: "#4b9bfa",
                  fontSize: ".875rem",
                  show: false,
                  fontWeight: 500
              }
          }
      }
  },
  states: {
  normal: {
    filter: {
      type: 'none',
    }
  },
  hover: {
    filter: {
      type: 'none',
    }
  },
  active: {
    filter: {
      type: 'none',
    }
  },
},
  grid: {
      padding: {
        bottom: -8,
        top: -15,
      },
  },
  stroke: {
      lineCap: "round"
  },
  labels: ["75%"]
  }
  optionsCircle1:any={
    chart: {
      height: 100,
      type: "radialBar",
  },

  series: [38],
  colors: ["#3366ff"],
  plotOptions: {
      radialBar: {
          hollow: {
              margin: 0,
              size: "45%",
              background: "#fff"
          },
          dataLabels: {
              name: {
                  offsetY: -10,
                  color: "#fff",
                  fontSize: ".625rem",
                  show: false
              },
              value: {
                  offsetY: 5,
                  color: "#4b9bfa",
                  fontSize: ".7rem",
                  show: true,
                  fontWeight: 500
              }
          }
      }
  },
  states: {
  normal: {
    filter: {
      type: 'none',
    }
  },
  hover: {
    filter: {
      type: 'none',
    }
  },
  active: {
    filter: {
      type: 'none',
    }
  },
},
  grid: {
      padding: {
        bottom: -8,
        top: -15,
      },
  },
  stroke: {
      lineCap: "round"
  },
  labels: ["Status"]
  }
  optionsCircle2:any={
    chart: {
      height: 100,
      type: "radialBar",
  },

  series: [67],
  colors: ["#ffad00"],
  plotOptions: {
      radialBar: {
          hollow: {
              margin: 0,
              size: "45%",
              background: "#fff"
          },
          dataLabels: {
              name: {
                  offsetY: -10,
                  color: "#fff",
                  fontSize: ".625rem",
                  show: false
              },
              value: {
                  offsetY: 5,
                  color: "#4b9bfa",
                  fontSize: ".7rem",
                  show: true,
                  fontWeight: 500
              }
          }
      }
  },
  states: {
  normal: {
    filter: {
      type: 'none',
    }
  },
  hover: {
    filter: {
      type: 'none',
    }
  },
  active: {
    filter: {
      type: 'none',
    }
  },
},
  grid: {
      padding: {
        bottom: -8,
        top: -15,
      },
  },
  stroke: {
      lineCap: "round"
  },
  labels: ["Status"]
  }
  optionsCircle3:any={
    chart: {
      height: 100,
      type: "radialBar",
  },

  series: [49],
  colors: ["#f34932"],
  plotOptions: {
      radialBar: {
          hollow: {
              margin: 0,
              size: "45%",
              background: "#fff"
          },
          dataLabels: {
              name: {
                  offsetY: -10,
                  color: "#fff",
                  fontSize: ".625rem",
                  show: false
              },
              value: {
                  offsetY: 5,
                  color: "#f34932",
                  fontSize: ".7rem",
                  show: true,
                  fontWeight: 500
              }
          }
      }
  },
  states: {
  normal: {
    filter: {
      type: 'none',
    }
  },
  hover: {
    filter: {
      type: 'none',
    }
  },
  active: {
    filter: {
      type: 'none',
    }
  },
},
  grid: {
      padding: {
        bottom: -8,
        top: -15,
      },
  },
  stroke: {
      lineCap: "round"
  },
  labels: ["Status"]
  }
  maxView = 'year';
  minuteStep = 5;
  minView = 'minute';
  selectedDate!: Date;
  showCalendar = true;
  startView = 'day';
  views = ['minute', 'hour', 'day', 'month', 'year'];

  /**
   * Sample implementation of a `change` event handler.
   * @param event
   *  The change event.
   */

  onCustomDateChange(event: DlDateTimePickerChange<Date>) {
    console.log(event.value);
  }

  chartOptions:any=
    {
      series: [{
        name: 'Profit Earned',
        data: [44, 42, 57, 86, 58, 55, 70,44, 42, 57, 86, 58],
    }, {
        name: 'Total Sales',
        data: [40, 38, 47, 86, 51, 55, 65,39, 32, 47, 76, 41],
    }],
    chart: {
        type: 'bar',
        height: 340,
        toolbar: {
            show: false,
        }
    },
    grid: {
        borderColor: '#f1f1f1',
        strokeDashArray: 3
    },
    colors: ["rgb(51, 102, 255)", "#d6e0ff"],
    plotOptions: {
        bar: {
            columnWidth: '50%',
            borderRadius: 5,
        }
    },
    dataLabels: {
        enabled: false,
    },
    stroke: {
        show: true,
        width: 2,
    },
    legend: {
        show: false,
        position: 'top',
    },
    yaxis: {
        title: {
            style: {
                color: '#adb5be',
                fontSize: '13px',
                fontFamily: 'poppins, sans-serif',
                fontWeight: 600,
                cssClass: 'apexcharts-yaxis-label',
            },
        },
        labels: {
            formatter: function (y: number) {
                return y.toFixed(0) + "";
            }
        }
    },
    xaxis: {
        type: 'week',
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        axisBorder: {
            show: true,
            color: 'rgba(119, 119, 142, 0.05)',
            offsetX: 0,
            offsetY: 0,
        },
        axisTicks: {
            show: true,
            borderType: 'solid',
            color: 'rgba(119, 119, 142, 0.05)',
            width: 6,
            offsetX: 0,
            offsetY: 0
        },
        labels: {
            rotate: -90
        }
    }
    }
    chartOptions1:any={
      series: [80, 29, 50],
      labels: ["Design", "Service","Development"],
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
                          // color: '#495057',
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
                          showAlways: false,
                          label: 'Total Analysis',
                          fontSize: '18px',
                          fontWeight: 400,
                      }
  
                  }
              }
          }
      },
      colors: ["rgba(51, 102, 255, 1)", "rgba(254, 127, 0, 1)","#0dcd94"],
    }
    chartOptions2:any=
    {
      series: [ {
        name: 'Accepted',
        type: 'line',
        data: [15, 32, 15, 38, 18, 25]
      },
      {
        name: 'Rejected',
        type: 'area',
        data: [25, 28, 21, 33, 18, 36]
      }],
      chart: {
      height: 190,
      fontFamily: 'Poppins, Arial, sans-serif',
      toolbar: {
        show: false
      }
      },
      grid: {
      show: false,
      borderColor: '#f2f6f7',
      },
      dataLabels: {
      enabled: false
      },
      legend: {
      show: false,
      position: 'top',
      fontSize: '13px',
      },
      stroke: {
      width: [3,3],
      curve: 'smooth',
      },
      plotOptions: {
        bar: {
          columnWidth: "27%",
          borderRadius: 1
        }
      },
      labels: ['2015', '2016', '2017', '2018', '2019','2020'],
      colors: ["rgb(51, 102, 255)", "rgba(var(--primary-rgb), 0.2)"],
    }

  refresh() {
    this.showCalendar = false;
    setTimeout(() => (this.showCalendar = true), 100);
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


  constructor() { }

  ngOnInit(): void {
  }

  // Bar Chart 1
  public barChartOptions = data.barChartOptions;
  public barChartData = data.barChartData;
  public barChartType = data.barChartType;
  public barChartPlugins = data.barChartPlugins;

  //Line Chart
  public MultipleChartOptions = data.lineChartOptions
  public MultipleChartData = data.lineChartData
  public MultipleChartType = data.lineChartType
  
  public donutData = data.DonutChartData;

  images = [
    './assets/images/media/png/19.png',
    './assets/images/media/png/17.png',
    './assets/images/media/png/18.png',
  ]
}
