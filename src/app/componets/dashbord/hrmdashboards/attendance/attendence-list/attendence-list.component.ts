import { NgCircleProgressModule } from 'ng-circle-progress';
import { NgSelectModule } from '@ng-select/ng-select';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { DataAttendanceByUserService, PersonAttendanceByUser } from '../attendencebyuser/attendanceByUserSelectDropdown.service';
import { RouterModule } from '@angular/router';
import { NgApexchartsModule } from 'ng-apexcharts';
import { SharedModule } from '../../../../../shared/common/sharedmodule';


@Component({
  selector: 'app-attendence-list',
  standalone: true,
  imports: [NgbModule,NgSelectModule,NgCircleProgressModule,RouterModule,NgApexchartsModule,SharedModule,RouterModule],
  templateUrl: './attendence-list.component.html',
  styleUrls: ['./attendence-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AttendenceListComponent implements OnInit {
  constructor(private modalService: NgbModal, private dataService: DataAttendanceByUserService) { 
    // this.modalService.activeInstances.subscribe((list) => {
    //   console.log(list);
    //  });
  }
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
  labels: ['100%'],
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
  month$!: Observable<PersonAttendanceByUser[]>;
  year$!: Observable<PersonAttendanceByUser[]>;
  empName$!: Observable<PersonAttendanceByUser[]>;
  selectedMonthId:any = "January";
  selectedYearId:any = "2021";
  selectedEmpName:any = "10";

  ngOnInit() {
    this.month$ = this.dataService.getMonth();
    this.year$ = this.dataService.getYear();
    this.empName$ = this.dataService.getEmpName();
  }

  fullDay(modal:any) {
	this.modalService.open(modal,{});
  }
  halfDay(content1:any){
	this.modalService.open(content1,{});
  }
  
}

// Fullday modal content

export class NgbdModal1Content {
  constructor(private modalService: NgbModal, public activeModal: NgbActiveModal) {}

  second() {
    this.modalService.open(NgbdModal2Content, {
      size: 'lg'
    });
  }
}


export class NgbdModal2Content {
  constructor(public activeModal: NgbActiveModal) {}
}



  export class NgbdModalHalfDayContent {
	constructor(private modalService: NgbModal, public activeModal: NgbActiveModal) {}
  
	second() {
	  this.modalService.open(NgbdModalHalfDaySecondContent, {
		size: 'lg'
	  });
	}
  }
  

  export class NgbdModalHalfDaySecondContent {
	constructor(public activeModal: NgbActiveModal) {}
  }