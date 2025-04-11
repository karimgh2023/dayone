import { Component } from '@angular/core';
import { SharedModule } from '../../../../shared/common/sharedmodule';
import { NgApexchartsModule } from 'ng-apexcharts';
import { SwiperModule, } from 'swiper/angular';
import flatpickr from 'flatpickr';
import { FlatpickrDefaults, FlatpickrModule } from 'angularx-flatpickr';
import SwiperCore, {

  Scrollbar,
  A11y,
  Virtual,
  Zoom,
  Autoplay,
  Thumbs,
  Mousewheel,
  
 
} from 'swiper';
import { FormsModule } from '@angular/forms';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';

SwiperCore.use([

  Scrollbar,
  A11y,
  Virtual,
  Mousewheel,
  Zoom,
  Autoplay,
  Thumbs,

]);
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SharedModule,NgApexchartsModule,SwiperModule,NgbModule,RouterModule,FlatpickrModule],
  providers:[FlatpickrDefaults],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  chartOptions:any = {
    series: [{
      name: "Total Budget",
      data: [100, 300, 180, 680, 320, 560, 230, 800, 520, 220, 750, 210, 410]
    }, {
      name: "Total Employee",
      data: [200, 530, 110, 110, 480, 520, 780, 435, 475, 738, 454, 454, 230]
    }],
    chart: {
      height: 325,
      type: 'line',
      zoom: {
        enabled: false
      },
          toolbar: {
              show: false,
          },
      dropShadow: {
        enabled: true,
        enabledOnSeries: undefined,
        top: 5,
        left: 0,
        blur: 3,
        color: '#000',
        opacity: 0.1
      },
    },
    dataLabels: {
      enabled: false
    },
    legend: {
          show: false,
      position: "top",
      horizontalAlign: "center",
      offsetX: -15,
      fontWeight: "bold",
    },
    stroke: {
      curve: 'smooth',
      width: '3',
      dashArray: [0, 5],
    },
    grid: {
      borderColor: '#f2f6f7',
    },
    colors: ["var(--primary-color)", "rgba(var(--primary-rgb), 0.2)"],
    yaxis: {
      title: {
        text: '',
        style: {
          color: '#adb5be',
          fontSize: '14px',
          fontFamily: 'poppins, sans-serif',
          fontWeight: 500,
          cssClass: 'apexcharts-yaxis-label',
        },
      }
    },
    xaxis: {
      type: 'month',
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      axisBorder: {
        show: false,
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
  chartOptions1:any = {
    series: [{
      name: 'On Progress',
      data: [25, 45, 41, 67, 22, 43, 44]
  }, {
      name: 'Pending',
      data: [35, 23, 20, 8, 13, 27, 13]
  }, {
      name: 'COmpleted',
      data: [40, 17, 15, 15, 21, 14, 11]
  }],
  chart: {
      type: 'bar',
      height: 320,
      stacked: true,
      toolbar: {
          show: true
      },
      zoom: {
          enabled: true
      },
    
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
  colors: ["var(--primary-color)", "rgb(254, 127, 0)", "rgba(var(--primary-rgb), 0.3)"],
  legend: {
      show: false,
      position: 'bottom'
  },
  plotOptions: {
      bar: {
          columnWidth: "15%",
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
  chartOptions2:any = {
    series: [80, 29],
    labels: ["Male", "Female"],
    chart: {
        height: 330,
        type: 'donut',
        toolbar: {
            show: false,
        },
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
    colors: ["var(--primary-color)", "rgba(254, 127, 0, 1)"],
  }
  thumbsSwiper:any
  setThumbsSwiper(swiper: any) {
    this.thumbsSwiper = swiper;
  }
  imageData7 = [
    {
      src: './assets/images/users/16.jpg',
      name:'Vanessa James',
      date:'Birthday on Feb 16',
      avatar:"avatar avatar-sm bg-primary ms-auto rounded-2 mt-1",
      icon:"fe fe-mail text-fixed-white fs-17"
    },
    {
      day: '21',
      month:"Feb",
      name:'Anniversary',
      date:'3rd Anniversary on 21st Feb',
      bg:"success"
      
    },
    {
      src: "./assets/images/users/4.jpg",
      name:'Faith Harris',
      date:'Smart Device Trade Show',
    },
    {
      day: '25',
      month:"Mar",
      name:'Meeting',
      date:'It will be held in meeting room',
      bg:"pink"
      
    },

 
  ];
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
  constructor(private modalService:NgbModal ){
    this.futureDate.setDate(this.futureDate.getDate() + 2);
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
}
