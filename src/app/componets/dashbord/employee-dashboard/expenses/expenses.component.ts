import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgbDateStruct, NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { MaterialModuleModule } from '../../../../material-module/material-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../../../shared/common/sharedmodule';
import { FlatpickrModule } from 'angularx-flatpickr';

interface PeriodicElement {
  id: number;
  Title: string;
  PurchaseFrom: string;
  date: string;
  Amount: string;
  paidBy: string;
  approvalStatus: string;
  approval: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {id: 1, Title: 'Bike Services', PurchaseFrom:'ABC Service Center', date: '01-10-2021', Amount:'$678', paidBy:'Card', approval:'Approved', approvalStatus:'success'},
  {id: 2, Title: 'Bike Services', PurchaseFrom:'ABC Service Center', date: '01-10-2021', Amount:'$678', paidBy:'Card', approval:'Rejected', approvalStatus:'danger'},
  {id: 3, Title: 'Pens', PurchaseFrom:'Books stationery', date: '11-12-2020', Amount:'$12', paidBy:'Cash', approval:'Approved', approvalStatus:'success'},
  {id: 4, Title: 'Mouse Pad', PurchaseFrom:'Amazon', date: '21-11-2020', Amount:'$45', paidBy:'Online Payment', approval:'Pending', approvalStatus:'warning'},
  {id: 5, Title: 'Data Connection', PurchaseFrom:'PhonePe', date: '16-10-2020', Amount:'$599', paidBy:'Online Payment', approval:'Approved', approvalStatus:'success'},
  {id: 6, Title: 'Mobile Recharge', PurchaseFrom:'PhonePe', date: '15-10-2020', Amount:'$100', paidBy:'Online Payment', approval:'Approved', approvalStatus:'success'},
  {id: 7, Title: 'Bike Fuel', PurchaseFrom:'Petrol Bunk', date: '12-09-2020', Amount:'$220', paidBy:'Card', approval:'Pending', approvalStatus:'warning'},
  {id: 8, Title: 'Bike Fuel', PurchaseFrom:'Petrol Bunk', date: '12-09-2020', Amount:'$220', paidBy:'Card', approval:'Rejected', approvalStatus:'danger'},
];

@Component({
  selector: 'app-expenses',
  standalone: true,
  imports: [SharedModule,NgbModule,NgSelectModule,MaterialModuleModule,FormsModule,ReactiveFormsModule,RouterModule,FlatpickrModule],
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.scss']
})
export class ExpensesComponent implements OnInit {
  model!: NgbDateStruct;
  model1!: NgbDateStruct;
  displayedColumns: string[] = ['id', 'Title', 'PurchaseFrom', 'date', 'Amount', 'paidBy', 'approval', 'Action'];
  dataSource;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private modalService: NgbModal) {
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA); }

  ngOnInit(): void {
  }

  openModal(content:any) {
    this.modalService.open(content, { windowClass : 'modalCusSty' })
  }
expenses=[
  {
    id:"#01",
    title:"Bike Services",
    purchase:"ABC Service Center",
    date:"01-10-2021",
    price:"$678",
    mode:"Card",
    status:"Approved",
    bg:"success",
    icon:""
  },
  {
    id:"#02",
    title:"Bike Services",
    purchase:"ABC Service Center",
    date:"01-10-2021",
    price:"$678",
    mode:"Card",
    status:"Rejected",
    bg:"danger",
    icon:"fe fe-info"
  },
  {
    id:"#03",
    title:"Pens",
    purchase:"Books stationery",
    date:"11-12-2020",
    price:"$12",
    mode:"Cash",
    status:"Approved",
    bg:"success",
    icon:""
  },
  {
    id:"#04",
    title:"Mouse Pad",
    purchase:"Aamzon",
    date:"21-11-2020",
    price:"$45",
    mode:"Online Payment",
    status:"Pending",
    bg:"warning",
    icon:""
  },
  {
    id:"#05",
    title:"Data Connection",
    purchase:"PhonePe",
    date:"16-10-2020",
    price:"$599",
    mode:"Online Payment",
    status:"Pending",
    bg:"warning",
    icon:""
  },
  {
    id:"#06",
    title:"Mobile Recharge",
    purchase:"PhonePe",
    date:"15-10-2020",
    price:"$100",
    mode:"Online Payment",
    status:"Approved",
    bg:"success",
    icon:""
  },
  {
    id:"#07",
    title:"Bike Fuel",
    purchase:"Petrol Bunk",
    date:"12-09-2020",
    price:"$220",
    mode:"Card",
    status:"Pending",
    bg:"warning",
    icon:""
  },
  {
    id:"#08",
    title:"Bike Fuel",
    purchase:"Petrol Bunk",
    date:"12-09-2020",
    price:"$220",
    mode:"Card",
    status:"Rejected",
    bg:"danger",
     icon:"fe fe-info"
  }
]
remove(id:string){
  const data = this.expenses.filter((x: { id: string }) => x.id !== id);
  this.expenses = data;
}
}
