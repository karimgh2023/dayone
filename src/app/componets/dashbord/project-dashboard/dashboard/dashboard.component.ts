import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DlDateTimePickerChange } from 'angular-bootstrap-datetimepicker';
import { SharedModule } from '../../../../shared/common/sharedmodule';
import { FullCalendarModule } from '@fullcalendar/angular';
import { NgSelectModule } from '@ng-select/ng-select';
import { CalendarOptions, EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGrigPlugin from '@fullcalendar/timegrid';
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';
import moment from 'moment';
import { NgApexchartsModule } from 'ng-apexcharts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SharedModule,FullCalendarModule,NgSelectModule,NgApexchartsModule,NgbModule,RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
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
    eventClick: (arg) => this.handleEventClick(arg),
  };
 
  handleEventClick(arg: any) {
    if (confirm('Are you sure you want to delete this event?')) {
      arg.event.remove();
    }
  }

  constructor(){}
  ngOnInit(): void {
  }
  
  //Line Chart
  optionsCircle:any={
    chart: {
        height: 90,
        width: 65,
        type: "radialBar",
        sparkline: {
            enabled: true,
        }
    },

  series: [75],
  colors: ["rgba(13, 205, 148,1)"],
  plotOptions: {
      radialBar: {
          hollow: {
              margin: 0,
              size: "40%",
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
//   grid: {
//       padding: {
//         bottom: -8,
//         top: -50,
//       },
//   },
  stroke: {
      lineCap: "round"
  },
  labels: ["Status"]
  }
  optionsCircle1:any={
    chart: {
        height: 90,
        width: 65,
        type: "radialBar",
        sparkline: {
            enabled: true,
        }
    },
  
    series: [38],
    colors: ["rgba(51,102,255,1)"],
    plotOptions: {
        radialBar: {
            hollow: {
                margin: 0,
                size: "40%",
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
        height: 90,
        width: 65,
        type: "radialBar",
        sparkline: {
            enabled: true,
        }
    },
  
    series: [67],
    colors: ["#ffad00"],
    plotOptions: {
        radialBar: {
            hollow: {
                margin: 0,
                size: "40%",
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
        height: 90,
        width: 65,
        type: "radialBar",
        sparkline: {
            enabled: true,
        }
    },
  
    series: [49],
    colors: ["#0fcd95"],
    plotOptions: {
        radialBar: {
            hollow: {
                margin: 0,
                size: "40%",
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
  optionsCircle4:any={
    chart: {
        height: 90,
        width: 65,
        type: "radialBar",
        sparkline: {
            enabled: true,
        }
    },

  series: [75],
  colors: ["rgba(13, 205, 148,1)"],
  plotOptions: {
      radialBar: {
          hollow: {
              margin: 0,
              size: "40%",
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
//   grid: {
//       padding: {
//         bottom: -8,
//         top: -50,
//       },
//   },
  stroke: {
      lineCap: "round"
  },
  labels: ["Status"]
  }
  chartOptions:any={
    series: [
      {
          type: 'line',
          name: 'Profit',
          data: [
              {
                  x: 'Jan',
                  y: 100
              },
              {
                  x: 'Feb',
                  y: 210
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
                  y: 610
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
          name: 'Revenue',
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
                  y: 320
              },
              {
                  x: 'Mar',
                  y: 376
              },
              {
                  x: 'Apr',
                  y: 220
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
          name: 'Sales',
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
                  y: 200
              },
              {
                  x: 'Feb',
                  y: 530
              },
              {
                  x: 'Mar',
                  y: 110
              },
              {
                  x: 'Apr',
                  y: 130
              },
              {
                  x: 'May',
                  y: 480
              },
              {
                  x: 'Jun',
                  y: 520
              },
              {
                  x: 'Jul',
                  y: 780
              },
              {
                  x: 'Aug',
                  y: 435
              },
              {
                  x: 'Sep',
                  y: 475
              },
              {
                  x: 'Oct',
                  y: 738
              },
              {
                  x: 'Nov',
                  y: 454
              },
              {
                  x: 'Dec',
                  y: 480
              }
          ]
      }
  ],
  chart: {
      height: 350,
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
  colors: ["#3366ff", "#fe7f00", "rgba(119, 119, 142, 0.05)"],
  dataLabels: {
      enabled: false
  },
  grid: {
      borderColor: '#f1f1f1',
      strokeDashArray: 3
  },
  stroke: {
      curve: 'smooth',
      width: [3, 3, 0],
      dashArray: [0, 0, 0],
  },
  xaxis: {
      axisTicks: {
          show: false,
      },
  },
  yaxis: {
      labels: {
          formatter: function (value: string) {
              return "$" + value;
          }
      },
  },
  tooltip: {
      y: [{
          formatter: function(e: number | undefined) {
              return void 0 !== e ? "$" + e.toFixed(0) : e
          }
      }, {
          formatter: function(e: number | undefined) {
              return void 0 !== e ? "$" + e.toFixed(0) : e
          }
      }, {
          formatter: function(e: number | undefined) {
              return void 0 !== e ? e.toFixed(0) : e
          }
      }]
  },
  legend: {
      show: false,
      customLegendItems: ['Profit', 'Revenue', 'Sales'],
      inverseOrder: true
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
    series: [80, 29],
    labels: ["Male", "Female"],
    chart: {
        height: 325,
        type: 'donut',
    },
    dataLabels: {
        enabled: false,
    },

    legend: {
        show: true,
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
                        color: '#495057',
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
                        label: 'Total',
                        fontSize: '18px',
                        fontWeight: 400,
                        color: '#495057',
                    }

                }
            }
        }
    },
    colors: ["rgba(51, 102, 255, 1)", "rgba(254, 127, 0, 1)"],
  }
  chartOptions2:any={
    series: [{
        name: 'Working Hours',
        data: [100, 145, 141, 167, 122, 143, 144]
    },{
        name: 'Work',
        data: [40, 17, 15, 15, 21, 14, 11]
    }],
    chart: {
        type: 'bar',
        height: 286,
        stacked: true,
        toolbar: {
            show: true
        },
        zoom: {
            enabled: true
        }
    },
    grid: {
        borderColor: '#f1f1f1',
        strokeDashArray: 3
    },
    responsive: [{
        breakpoint: 480,
        options: {
            legend: {
                position: 'bottom',
                offsetX: -10,
                offsetY: 0
            }
        }
    }],
    colors: ["rgba(51, 102, 255, 1)",  "rgba(51, 102, 255, 0.2)"],
    legend: {
        show: false,
        position: 'top'
    },
    plotOptions: {
        bar: {
            columnWidth: "17%",
			borderRadius: 2,
        }
    },
    dataLabels: {
        enabled: false
    },
    xaxis: {
        categories: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
		labels: {
            rotate: -90
        }
    },
    fill: {
        opacity: 1
    }
  }
}
