import { DecimalPipe } from '@angular/common';
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { employeeList } from './employeeListTableData';
import { SharedModule } from '../../../../../shared/common/sharedmodule';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [SharedModule,RouterModule,RouterModule,NgSelectModule],
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss'],
  // providers: [EmployeeService, DecimalPipe]
})
export class EmployeeListComponent implements OnInit {
  // @ViewChildren(SortableHeader) headers!: QueryList<SortableHeader>;

  employeeList$!: Observable<employeeList[]>;
  total$!: Observable<number>;
  
  constructor(
 
     ) {
 
   }

  ngOnInit(): void {
  }


  deleteData(id:string){
    const data = this.lists.filter((x: { id: string }) => {
      return x.id != id;
  
    })
    this.lists = data;
  }
   lists=[
    {
      id:"01",
      src:"./assets/images/users/10.jpg",
      name:"Faith Harris",
      mail:"faith@gmail.com",
      empid:"#2987",
      dept:"Designing Department",
      designation:"Web Designer",
      phno:"+9685321475",
      date:"05-05-2017",
      work:"3 yrs 1 mons 13 days"
    },
    {
      id:"02",
      src:"./assets/images/users/2.jpg",
      name:"Austin Bell",
      mail:"austin@gmail.com",
      empid:"#4987",
      dept:"Development Department",
      designation:"Angular Developer",
      phno:"+8653217950",
      date:"02-01-2018",
      work:"3 yrs 0 mons 25 days"
    },
    {
      id:"03",
      src:"./assets/images/users/4.jpg",
      name:"Maria Bower",
      mail:"maria@gmail.com",
      empid:"#6729",
      dept:"Marketing Department",
      designation:"Marketing analyst",
      phno:"+9563258417",
      date:"02-08-2019",
      work:"2 yrs 3 mons 23 days"
    },
    {
      id:"04",
      src:"./assets/images/users/5.jpg",
      name:"Peter Hill",
      mail:"mpeter@gmail.com",
      empid:"#2098",
      dept:"IT Department",
      designation:"Testor",
      phno:"+8563249751",
      date:"01-01-2020",
      work:"1 yrs 0 mons 25 days"
    },
    {
      id:"05",
      src:"./assets/images/users/7.jpg",
      name:"Victoria Lyman",
      mail:"victoria@gmail.com",
      empid:"#1025",
      dept:"Managers Department",
      designation:"General Manager",
      phno:"+9635826432",
      date:"05-05-2021",
      work:"0 yrs 0 mons 20 days"
    },
    {
      id:"06",
      src:"./assets/images/users/9.jpg",
      name:"Adam Quinn",
      mail:"adam@gmail.com",
      empid:"#3262",
      dept:"Accounts Department",
      designation:"Accountant",
      phno:"+9685231572",
      date:"05-05-2020",
      work:"0 yrs 8 mons 20 days"
    },
    {
      id:"07",
      src:"./assets/images/users/13.jpg",
      name:"Melanie Coleman",
      mail:"melanie@gmail.com",
      empid:"#3489",
      dept:"Application Department",
      designation:"App Designer",
      phno:"+8635291470",
      date:"15-02-2019",
      work:"1 yrs 11 mons 10 days"
    },
    {
      id:"08",
      src:"./assets/images/users/10.jpg",
      name:"Max Wilson",
      mail:"max@gmail.com",
      empid:"#3698",
      dept:"Development Department",
      designation:"PHP Developer",
      phno:"+9986357240",
      date:"05-05-2020",
      work:"0 yrs 9 mons 20 days"
    },
    {
      id:"09",
      src:"./assets/images/users/11.jpg",
      name:"Amelia Russell",
      mail:"amelia@gmail.com",
      empid:"#5612",
      dept:"Designing Department",
      designation:"UX Designer",
      phno:"+9356982472",
      date:"01-05-2018",
      work:"2 yrs 9 mons 25 days"
    },
    {
      id:"10",
      src:"./assets/images/users/12.jpg",
      name:"Justin Metcalfe",
      mail:"justin@gmail.com",
      empid:"#0245",
      dept:"Designing Department",
      designation:"web Designer",
      phno:"+9685321475",
      date:"05-05-2017",
      work:"3 yrs 1 mons 13 days"
    },
   ]
}
