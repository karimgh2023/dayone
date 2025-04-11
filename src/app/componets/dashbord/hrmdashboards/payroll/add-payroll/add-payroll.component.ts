import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { DataAttendanceByUserService, PersonAttendanceByUser } from '../../attendance/attendencebyuser/attendanceByUserSelectDropdown.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-add-payroll',
  standalone: true,
  imports: [NgSelectModule,FormsModule,ReactiveFormsModule,CommonModule,RouterModule,NgbModule],
  templateUrl: './add-payroll.component.html',
  styleUrls: ['./add-payroll.component.scss']
})
export class AddPayrollComponent implements OnInit {
  constructor(private modalService: NgbModal, private dataService: DataAttendanceByUserService) { }
  

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

  open(content:any) {
    this.modalService.open(content, { windowClass : 'modalCusSty' })
  }


}
