import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../../../../shared/common/sharedmodule';
import { MaterialModuleModule } from '../../../../material-module/material-module.module';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';

interface PeriodicElement {
  id: number;
  position: string;
  name: string;
  email: string;
  phoneNumber: number;
  AppliedOn : string;
  submittedBy: string;
  statusText: string;
  status: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {id: 1, position: '	Senior PHP Developer', name:'Faith Harris', email: 'faith@gmail.com', phoneNumber: 9685*21475, AppliedOn:'25-01-2021', submittedBy:'Austin Bell', statusText: 'Pending', status: 'warning'},
  {id: 2, position: '	Fresher Web Designer', name:'Austin Bell', email: 'austin@gmail.com', phoneNumber: 865321*950, AppliedOn:'20-02-2021', submittedBy:'Austin Bell', statusText: 'Selected', status: 'primary'},
  {id: 3, position: '	Senior Web Developer', name:'Maria Bower', email: 'maria@gmail.com', phoneNumber: 95632*8417, AppliedOn:'28-02-2021', submittedBy:'Maria Bower', statusText: 'Rejected', status: 'danger'},
  {id: 4, position: '	Fresher UI Designer', name:'Peter Hill', email: 'peter@gmail.com', phoneNumber: 85*3249751, AppliedOn:'19-01-2021', submittedBy:'Peter Hill', statusText: 'Selected', status: 'primary'},
  {id: 5, position: 'SEO Specialist', name:'Victoria Lyman', email: 'victoria@gmail.com', phoneNumber: 96358*6432, AppliedOn:'19-03-2021', submittedBy:'Victoria Lyman', statusText: 'Pending', status: 'warning'},
  {id: 6, position: 'Senior Worpress Developer',name:'	Adam Quinn', email: 'adam@gmail.com', phoneNumber: 96**231572, AppliedOn:'17-01-2021', submittedBy:'Adam Quinn', statusText: 'Selected', status: 'primary' },
  {id: 7, position: '	Senior Accountant', name:'	Melanie Coleman', email: 'melanie@gmail.com', phoneNumber: 863529*470, AppliedOn:'21-02-2021  ', submittedBy:'Melanie Coleman', statusText: 'Selected', status: 'primary'},
  {id: 8, position: 'Fresher Angular Developer',name:'Max Wilson', email: 'max@gmail.com', phoneNumber: 998635*240, AppliedOn:'30-03-2021', submittedBy:'Max Wilson', statusText: 'Selected', status: 'primary' },
  {id: 9, position: '	Senior Angular Developer',name:'Amelia Russell', email: 'amelia@gmail.com', phoneNumber: 935698**72, AppliedOn:'04-04-2021', submittedBy:'Amelia Russell', statusText: 'Pending', status: 'warning' },
  {id: 10, position: 'Fresher Web Designer',name:'Justin Metcalfe', email: 'justin@gmail.com', phoneNumber: 968**21475, AppliedOn:'17-02-2021', submittedBy:'Justin Metcalfe', statusText: 'Rejected', status: 'danger' },
  {id: 11, position: 'Senior Web Developer',name:'Sophie Anderson', email: 'sophie@gmail.com', phoneNumber: 86742*1566, AppliedOn:'	22-02-2021', submittedBy:'Sophie Anderson', statusText: 'Selected', status: 'primary' },
  {id: 12, position: 'Senior Worpress Developer',name:'Ryan Young', email: 'ryan@gmail.com', phoneNumber: 968532*475, AppliedOn:'18-03-2021', submittedBy:'Ryan Young', statusText: 'Pending', status: 'warning' },
  {id: 13, position: 'Fresher Angular Developer',name:'Jennifer Hardacre', email: 'jennifer@gmail.com', phoneNumber: 96358**432, AppliedOn:'19-03-2021', submittedBy:'Jennifer Hardacre', statusText: 'Rejected', status: 'danger' },
  {id: 14, position: 'Senior PHP Developer',name:'Justin Parr', email: 'justin@gmail.com', phoneNumber: 9*85321475, AppliedOn:'20-03-2021', submittedBy:'Justin Parr', statusText: 'Selected', status: 'primary' }
];

@Component({
  selector: 'app-job-applications',
  standalone: true,
  imports: [SharedModule,MaterialModuleModule,RouterModule,NgSelectModule,NgbModule],
  templateUrl: './job-applications.component.html',
  styleUrls: ['./job-applications.component.scss']
})
export class JobApplicationsComponent implements OnInit {

  displayedColumns: string[] = ['ID', 'Position', 'Name', 'Email', 'PhoneNumber', 'AppliedOn', 'SubmittedBy', 'Status', 'Action'];
  dataSource;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private modalService: NgbModal) {
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA); }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  removeData(item: any) {
    this.dataSource.data.map((el,ind) =>{
      // if(el.No == item){
      //   this.dataSource.data.splice(ind, 1)
      //   this.dataSource._updateChangeSubscription();
      // }
    })    
  }
  edit(editContent:any) {
    this.modalService.open(editContent, {backdrop : 'static' , windowClass : 'modalCusSty' })
  }
  open(content:any) {
    this.modalService.open(content, { windowClass : 'modalCusSty' })
  }
}
