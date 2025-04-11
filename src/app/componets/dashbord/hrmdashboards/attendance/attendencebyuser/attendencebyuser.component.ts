import { SharedModule } from './../../../../../shared/common/sharedmodule';
import { Component, QueryList, ViewChildren } from '@angular/core';
import { NgbDateStruct, NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { SortableHeader, SortEvent } from '../../../../../shared/directives/sortable.directive';
import { attendanceByUserType } from '../attendencebyuser/attendenceByUserTableData';
import { NgbdModal1Content } from '../attendence-list/attendence-list.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import flatpickr from 'flatpickr';
import { FlatpickrDefaults, FlatpickrModule } from 'angularx-flatpickr';
import { RouterModule } from '@angular/router';
import { NgApexchartsModule } from 'ng-apexcharts';

@Component({
  selector: 'app-attendencebyuser',
  standalone: true,
  imports: [NgbModule,NgSelectModule,FormsModule,FlatpickrModule,RouterModule,NgApexchartsModule,SharedModule,RouterModule],
  templateUrl: './attendencebyuser.component.html',
  styleUrl: './attendencebyuser.component.scss',
  providers: [
    FlatpickrDefaults,
  ],
})
export class AttendencebyuserComponent {
chartOptions:any= {
  chart: {
    height: 280,
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
labels: ['09:00 hrs'],
}

  model!: NgbDateStruct;
  @ViewChildren(SortableHeader) headers!: QueryList<SortableHeader>;

  attendanceByUser$!: Observable<attendanceByUserType[]>;
  total$!: Observable<number>;
  constructor(private modalService: NgbModal) {}
  open(content:any) {
    this.modalService.open(content, { windowClass : 'modalCusSty' })
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


  selectedMonthId:any = "January";
  selectedYearId:any = "2021";
  selectedEmpName:any = "10";

 

  
  onSort({column, direction}: SortEvent | any) {
    // resetting other headers
    this.headers.forEach((header:any) => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });
  }
  deleteData(d:any){
    this.attendanceByUser$.subscribe(result => {
      const index = result.indexOf(d);
      result.splice(index,1)
    })
   }

   showPresentModal: boolean = false;
   showEditModal: boolean = false;
 
   openPresentModal() {
     this.showPresentModal = true;
   }

   closePresentModal() {
     this.showPresentModal = false;
   }
 
   openEditModal() {
     this.closePresentModal();
     this.showEditModal = true;
   }
 
   closeEditModal() {
     this.showEditModal = false;
   }
 
   backToPresentModal() {
     this.closeEditModal();
     this.openPresentModal();
   }


   tableData = [
    {
       Date:'28-01-2021',
       Day:'Thursday',
       Status:'Present',
       StatusBg:'success',
       ClockIn :'09:30 AM',
       ClockOut:'06:30 PM',
       Progress:'100',
       ProgressBg:'success',
       Progress1:''
    },
    {
      Date:'27-01-2021',
      Day:'Wednesday',
      Status:'Present',
      StatusBg:'success',
      ClockIn :'09:30 AM',
      ClockOut:'06:30 PM',
      Progress:'100',
      ProgressBg:'success',
      Progress1:''
   },
   {
    Date:'26-01-2021',
    Day:'Tuesday',
    Status:'Holiday (Republic Day)',
    StatusBg:'pink',
    ClockIn :'--',
    ClockOut:'--',
    Progress:'',
    Progress1:''
 },
 {
  Date:'25-01-2021',
  Day:'Monday',
  Status:'Late',
  StatusBg:'danger',
  ClockIn :'09:50 AM',
  ClockOut:'06:30 PM',
  Progress:'80',
  Progress1:'20',
  ProgressBg:'success',
  Progress1Bg:'danger'
},
{
  Date:'24-01-2021',
  Day:'Sunday',
  Status:'Holiday (Sunday)',
  StatusBg:'pink',
  ClockIn :'--',
  ClockOut:'--',
  Progress:'100',
  ProgressBg:'light',
  Progress1:''
},
{
  Date:'22-01-2021',
  Day:'Friday',
  Status:'Present',
  StatusBg:'success',
  ClockIn :'09:30 AM',
  ClockOut:'06:30 PM',
  Progress:'100',
  ProgressBg:'success',
  Progress1:''
},
{
  Date:'21-01-2021',
  Day:'Thursday',
  Status:'Present',
  StatusBg:'success',
  ClockIn :'09:30 AM',
  ClockOut:'06:30 PM',
  Progress:'100',
  ProgressBg:'success',
  Progress1:''
},
{
  Date:'20-01-2021',
  Day:'Wednesday',
  Status:'Present',
  StatusBg:'success',
  ClockIn :'09:30 AM',
  ClockOut:'06:30 PM',
  Progress:'100',
  ProgressBg:'success',
  Progress1:''
},
{
  Date:'19-01-2021',
  Day:'Tuesday',
  Status:'Present',
  StatusBg:'success',
  ClockIn :'09:30 AM',
  ClockOut:'06:30 PM',
  Progress:'100',
  ProgressBg:'success',
  Progress1:''
}
   ]
}
