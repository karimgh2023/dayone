import { NgSelectModule } from '@ng-select/ng-select';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../../../../shared/common/sharedmodule';
import { MaterialModuleModule } from '../../../../material-module/material-module.module';
import { RouterModule } from '@angular/router';

interface PeriodicElement {
  id: number;
  img: string;
  name: string;
  email: string;
  registeredBy: string;
  statusText: string;
  status: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {id: 1, img: './assets/images/users/3.jpg', name:'Super Admin', email: 'superadmin@gmail.com', registeredBy:'12-01-2021', statusText: 'Active', status: 'success'},
  {id: 2, img: './assets/images/users/10.jpg', name:'Admin', email: 'admin@gmail.com', registeredBy:'15-06-2021', statusText: 'Active', status: 'success'},
  {id: 3, img: './assets/images/users/4.jpg', name:'Admin2', email: 'admin123@gmail.com', registeredBy:'25-08-2020', statusText: 'InActive', status: 'danger'},
  {id: 4, img: './assets/images/users/11.jpg', name:'Admin3', email: 'admin456@gmail.com',  registeredBy:'16-10-2020', statusText: 'Active', status: 'success'},
  {id: 5, img: './assets/images/users/5.jpg', name:'Admin4', email: 'admin156@gmail.com', registeredBy:'21-12-2020', statusText: 'Active', status: 'success'},
  {id: 6, img: './assets/images/users/12.jpg',name:'Admin5', email: 'admin957@gmail.com', registeredBy:'11-01-2020', statusText: 'Active', status: 'success' },
  {id: 7, img: './assets/images/users/13.jpg', name:'Admin6', email: 'admin209@gmail.com', registeredBy:'18-02-2020', statusText: 'Active', status: 'success'}
];

@Component({
  selector: 'app-super-admins',
  standalone: true,
  imports: [SharedModule,MaterialModuleModule,NgSelectModule,RouterModule],
  templateUrl: './super-admins.component.html',
  styleUrls: ['./super-admins.component.scss']
})
export class SuperAdminsComponent implements OnInit {
  displayedColumns: string[] = ['ID', 'CompanyName', 'Email', 'RegisterDate', 'Status', 'Action'];
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
  removeData(item: number) {
    this.dataSource.data.map((el,ind) =>{
      if(el.id == item){
        this.dataSource.data.splice(ind, 1)
        this.dataSource._updateChangeSubscription();
      }
    })    
  }

  open(content:any) {
    this.modalService.open(content, { windowClass : 'modalCusSty' })
  }
  edit(editcontent:any) {
    this.modalService.open(editcontent, { windowClass : 'modalCusSty' })
  }

}
