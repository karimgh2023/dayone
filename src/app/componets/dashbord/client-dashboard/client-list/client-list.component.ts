import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../../../../shared/common/sharedmodule';
import { NgSelectModule } from '@ng-select/ng-select';
import { MaterialModuleModule } from '../../../../material-module/material-module.module';
import flatpickr from 'flatpickr';
import { FlatpickrDefaults, FlatpickrModule } from 'angularx-flatpickr';
import { RouterModule } from '@angular/router';
interface PeriodicElement {
  id: number;
  No: string;
  name: string;
  img: string;
  email: string;
  project: number;
  statusText: string;
  status: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {id: 1, No: '#SPT-001', name: 'Julia Walker', img: './assets/images/users/3.jpg' , email: 'julia@gmail.com', project: 2, statusText: 'Active', status: 'success'},
  {id: 2, No: '#SPT-002', name: 'Diane Short', img: './assets/images/users/9.jpg' , email: 'daine@gmail.com', project: 1, statusText: 'Active', status: 'success'},
  {id: 3, No: '#SPT-003', name: 'Pippa Welch', img: './assets/images/users/4.jpg' , email: 'pippa@gmail.com', project: 0, statusText: 'InActive', status: 'danger'},
  {id: 4, No: '#SPT-004', name: 'Gabrielle Fisher', img: './assets/images/users/10.jpg' , email: 'gabrielle@gmail.com', project: 5, statusText: 'Active', status: 'success'},
  {id: 5, No: '#SPT-005', name: 'Ryan Terry', img: './assets/images/users/5.jpg' , email: 'ryan@gmail.com', project: 3, statusText: 'Active', status: 'success'},
  {id: 6, No: '#SPT-006', name: 'James Wilson', img: './assets/images/users/11.jpg', email: 'james@gmail.com', project: 2, statusText: 'InActive', status: 'danger' },
  {id: 7, No: '#SPT-007', name: 'Lisa Vance', img: './assets/images/users/6.jpg' , email: 'lisa@gmail.com', project: 6, statusText: 'Active', status: 'success'},
  {id: 8, No: '#SPT-008', name: 'Sam Gray', img: './assets/images/users/12.jpg', email: 'samgray@gmail.com', project: 6, statusText: 'InActive', status: 'danger' }
];

@Component({
  selector: 'app-client-list',
  standalone: true,
  imports: [SharedModule,NgSelectModule,MaterialModuleModule,FlatpickrModule,RouterModule],
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss'],
  providers: [
    FlatpickrDefaults,
  ],
})
export class ClientListComponent implements OnInit {
  model!: NgbDateStruct;
  model1!: NgbDateStruct;
  model2!: NgbDateStruct;
  model3!: NgbDateStruct;
  displayedColumns: string[] = ['ID', 'Name', 'Email', 'Projects', 'Status', 'Action'];
  dataSource;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private modalService: NgbModal) {
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA); }


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
  removeData(item: string) {
    this.dataSource.data.map((el,ind) =>{
      if(el.No == item){
        this.dataSource.data.splice(ind, 1)
        this.dataSource._updateChangeSubscription();
      }
    })    
  }
  edit(editContent:any) {
    this.modalService.open(editContent, {windowClass : 'modalCusSty modal-lg' })
  }
  open(content:any) {
    this.modalService.open(content, {windowClass : 'modalCusSty',size:'lg' })
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
}
