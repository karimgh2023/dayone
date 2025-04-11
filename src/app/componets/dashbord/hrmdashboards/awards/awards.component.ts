import { MaterialModuleModule } from './../../../../material-module/material-module.module';
import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgApexchartsModule } from 'ng-apexcharts';
import { NgCircleProgressModule } from 'ng-circle-progress';
import flatpickr from 'flatpickr';
import { FlatpickrDefaults, FlatpickrModule } from 'angularx-flatpickr';
import { SharedModule } from '../../../../shared/common/sharedmodule';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-awards',
  standalone: true,
  imports: [SharedModule,NgApexchartsModule,NgCircleProgressModule,NgSelectModule,FlatpickrModule,MaterialModuleModule,RouterModule],
  providers: [
    FlatpickrDefaults,
  ],
  templateUrl: './awards.component.html',
  styleUrl: './awards.component.scss'
})
export class AwardsComponent {
  constructor(private modalService: NgbModal) { }

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
  open(content:any) {
    this.modalService.open(content, {  windowClass : 'modalCusSty' ,size:'lg'})
  }
  optionsCircle:any={
    chart: {
      height: 100,
      type: "radialBar",
  },

  series: [85],
  colors: ["rgba(13, 205, 148,1)"],
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
  optionsCircle1:any={
    chart: {
      height: 100,
      type: "radialBar",
  },

  series: [58],
  colors: ["rgba(247, 40, 74,1)"],
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
                  color: "#4b9bfa",
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

  series: [90],
  colors: ["rgba(13, 205, 148,1)"],
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
                  color: "#4b9bfa",
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

  series: [78],
  colors: ["rgba(247, 40, 74,1)"],
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
                  color: "#4b9bfa",
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
      height: 100,
      type: "radialBar",
  },

  series: [48],
  colors: ["rgba(18, 138, 249,1)"],
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
                  color: "#4b9bfa",
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
  optionsCircle5:any={
    chart: {
      height: 100,
      type: "radialBar",
  },

  series: [32],
  colors: ["rgba(247, 40, 74,1)"],
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
                  color: "#4b9bfa",
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
  optionsCircle6:any={
    chart: {
      height: 100,
      type: "radialBar",
  },

  series: [82],
  colors: ["rgba(13, 205, 148,1)"],
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
                  color: "#4b9bfa",
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
  optionsCircle7:any={
    chart: {
      height: 100,
      type: "radialBar",
  },

  series: [78],
  colors: ["rgba(13, 205, 148,1)"],
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
                  color: "#4b9bfa",
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
  optionsCircle8:any={
    chart: {
      height: 100,
      type: "radialBar",
  },

  series: [49],
  colors: ["rgba(18, 138, 249,1)"],
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
                  color: "#4b9bfa",
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
  optionsCircle9:any={
    chart: {
      height: 100,
      type: "radialBar",
  },

  series: [66],
  colors: ["rgba(247, 40, 74,1)"],
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
                  color: "#4b9bfa",
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
  optionsCircle10:any={
    chart: {
      height: 100,
      type: "radialBar",
  },

  series: [85],
  colors: ["rgba(51,102,255,1)"],
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
                  color: "#4b9bfa",
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
}
