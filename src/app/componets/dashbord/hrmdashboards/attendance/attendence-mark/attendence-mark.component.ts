import { NgApexchartsModule } from 'ng-apexcharts';
import { NgSelectModule } from '@ng-select/ng-select';
import { Component, OnInit } from '@angular/core';
import { NgbDateStruct, NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../../../../../shared/common/sharedmodule';
import flatpickr from 'flatpickr';
import { FlatpickrDefaults, FlatpickrModule } from 'angularx-flatpickr';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-attendence-mark',
  standalone: true,
  imports: [NgbModule,SharedModule,NgSelectModule,FlatpickrModule,NgApexchartsModule,RouterModule,CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './attendence-mark.component.html',
  styleUrls: ['./attendence-mark.component.scss'],
  providers: [
    FlatpickrDefaults,
  ],
})
export class AttendenceMarkComponent implements OnInit {
  model!: NgbDateStruct;

  constructor(private modalService: NgbModal) {}
  fullDay(content:any) {
    this.modalService.open(content,{});
    }
    halfDay(content1:any) {
      this.modalService.open(content1,{});
      }
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
   chartOptions:any= {
    chart: {
      height: 140,
      type: "radialBar",
  },
  
  series: [100],
  colors: ["rgba(13,205,148,1)"],
  plotOptions: {
      radialBar: {
          hollow: {
              margin: 0,
              size: "65%",
          },
          dataLabels: {
              name: {
                  offsetY: 3,
                  color: "#4b9bfa",
                  fontSize: ".825rem",
                  fontFamily: "Roboto",
                  fontWeight: 400,
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
  labels: ['9:00 hrs'],
  }
  chartOptions1:any= {
    chart: {
      height: 170,
      type: "radialBar",
  },

  series: [50],
  colors: ["rgba(13,205,148,1)"],
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
  plotOptions: {
      radialBar: {
          hollow: {
              margin: 0,
              size: "65%",
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
                  fontSize: ".875rem",
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

  allTasksChecked: boolean = false;
  tasks: any[] = [/* your tasks here */];

  toggleSelectAll(event: Event) {
    this.allTasksChecked = (event.target as HTMLInputElement).checked;
  }

tableData = [
  {
    id:'#2987',
    image:'./assets/images/users/1.jpg',
    name:'Faith Harris',
    position:'Web Designer',
    status:'Present',
    statusBg:'success',
    clockin:'09:30 AM',
    clockout:'06:30 PM',
    address:'225.192.45.1',
    from:'06:30 PM',
    attendance:'Marked',
    attendanceBg:'success',
    checked:true
  },
  {
    id:'#4987',
    image:'./assets/images/users/9.jpg',
    name:'Austin Bell',
    position:'Angular Developer',
    status:'Absent',
    statusBg:'danger',
    clockin:'09:30 AM',
    clockout:'06:30 PM',
    address:'225.192.45.1',
    from:'Office',
    attendance:'Not Marked',
    attendanceBg:'danger',
    checked:true
  },
  {
    id:'#6729',
    image:'./assets/images/users/2.jpg',
    name:'Maria Bower',
    position:'Marketing analyst',
    status:'Present',
    statusBg:'success',
    clockin:'09:30 AM',
    clockout:'06:30 PM',
    address:'225.192.45.1',
    from:'Office',
    attendance:'Marked',
    attendanceBg:'success'
  },
  {
    id:'#2098',
    image:'./assets/images/users/10.jpg',
    name:'Peter Hill',
    position:'Tester',
    status:'Half Day',
    statusBg:'warning',
    clockin:'09:30 AM',
    clockout:'06:30 PM',
    address:'225.192.45.1',
    from:'Office',
    attendance:'Not Marked',
    attendanceBg:'danger',
    checked:true
  },
  {
    id:'#1025',
    image:'./assets/images/users/3.jpg',
    name:'Victoria Lyman',
    position:'General Manager',
    status:'Present',
    statusBg:'success',
    clockin:'09:30 AM',
    clockout:'06:30 PM',
    address:'225.192.45.1',
    from:'Office',
    attendance:'Marked',
    attendanceBg:'success',
    checked:true
  },
  {
    id:'#3262',
    image:'./assets/images/users/4.jpg',
    name:'Adam Quinn',
    position:'Accountant',
    status:'Present',
    statusBg:'success',
    clockin:'09:30 AM',
    clockout:'06:30 PM',
    address:'225.192.45.1',
    from:'Office',
    attendance:'Marked',
    attendanceBg:'success'
  },
  {
    id:'#3698',
    image:'./assets/images/users/12.jpg',
    name:'Max Wilson',
    position:'PHP Developer',
    status:'Late',
    statusBg:'orange',
    clockin:'09:30 AM',
    clockout:'06:30 PM',
    address:'225.192.45.1',
    from:'Office',
    attendance:'Not Marked',
    attendanceBg:'danger'
  },
  {
    id:'#5612',
    image:'./assets/images/users/5.jpg',
    name:'Amelia Russell',
    position:'UX Designer',
    status:'Present',
    statusBg:'success',
    clockin:'09:30 AM',
    clockout:'06:30 PM',
    address:'225.192.45.1',
    from:'Office',
    attendance:'Marked',
    attendanceBg:'success',
    checked:true
  },
  {
    id:'#0245',
    image:'./assets/images/users/13.jpg',
    name:'Justin Metcalfe',
    position:'Web Designer',
    status:'Present',
    statusBg:'success',
    clockin:'09:30 AM',
    clockout:'06:30 PM',
    address:'225.192.45.1',
    from:'06:30 PM',
    attendance:'Marked',
    attendanceBg:'success',
    checked:true
  },
]
getCheckedTasks() {
  return this.tasks.filter(task => task.checked);
}
}
