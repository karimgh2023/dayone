import { Component, OnInit } from '@angular/core';
import * as  data from './taskDashboardData'
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from '../../../../shared/common/sharedmodule';
import { NgApexchartsModule } from 'ng-apexcharts';
import { RouterModule } from '@angular/router';
import flatpickr from 'flatpickr';
import { FlatpickrModule,FlatpickrDefaults } from 'angularx-flatpickr';
import { NgCircleProgressModule } from 'ng-circle-progress';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SharedModule,NgbModule,NgSelectModule,NgApexchartsModule,RouterModule,FlatpickrModule,NgCircleProgressModule],
  providers:[FlatpickrDefaults],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  active =1;
  constructor(private modalService:NgbModal ) { }


  open(content:any){
    this.modalService.open(content)
  }
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
    labels: ["Completed Tasks", "Running Tasks"],
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
    colors: ["var(--primary-color)",  "var(--primary01)"],
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
