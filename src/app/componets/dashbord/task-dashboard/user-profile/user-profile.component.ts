import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgbDateStruct, NgbModal, NgbModule, NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgApexchartsModule } from 'ng-apexcharts';
import { MaterialModuleModule } from '../../../../material-module/material-module.module';
import { SharedModule } from '../../../../shared/common/sharedmodule';
import { FlatpickrDefaults, FlatpickrModule } from 'angularx-flatpickr';
import flatpickr from 'flatpickr';
import { RouterModule } from '@angular/router';
interface PeriodicElement {
  No: number;
  Task: string;
  badge: string;
  Priority: string;
  PriorityStatus: string;
  StartDate: string;
  Deadline: string;
  progress: number;
  progressStatus: string;
  worksStatus: string;
  worksText: string;
  workInfoStatus: boolean;
  worksInfoText: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {No: 1, Task: 'Design Updated', badge: 'warning', Priority:'High', PriorityStatus: 'danger', StartDate:'12-02-2021', Deadline:'16-06-2021', progress: 30, progressStatus: 'primary',worksStatus:'warning', worksText: 'On hold', workInfoStatus:false, worksInfoText:''},
  {No: 2, Task: 'HTML Code Updated', badge: 'danger', Priority:'Low', PriorityStatus: 'success', StartDate:'01-01-2021', Deadline:'22-04-2021', progress: 50, progressStatus: 'primary', worksStatus:'danger', worksText: 'Delay', workInfoStatus:true, worksInfoText:'Dealy by 99 days'},
  {No: 3, Task: 'Angular Issues fixed', badge: 'success', Priority:'Medium', PriorityStatus: 'warning', StartDate:'11-04-2021', Deadline:'16-06-2021', progress: 100, progressStatus: 'success',worksStatus:'success', worksText: 'Completed', workInfoStatus: false, worksInfoText:''},
  {No: 4, Task: 'Marketing materials Issues', badge: 'primary', Priority:'High', PriorityStatus: 'danger', StartDate:'11-03-2021', Deadline:'19-05-2021', progress: 80, progressStatus: 'warning',worksStatus:'primary', worksText: 'On Progress', workInfoStatus: false, worksInfoText:''},
  {No: 5, Task: 'Logo Design', badge: 'primary', Priority:'High', PriorityStatus: 'danger', StartDate:'05-02-2021', Deadline:'21-04-2021	', progress: 70,progressStatus: 'warning',worksStatus:'primary', worksText: 'On Progress', workInfoStatus: false, worksInfoText:''},
  {No: 6, Task: 'Application Bugs fix', badge: 'danger', Priority:'Medium', PriorityStatus: 'warning', StartDate:'21-01-2021', Deadline:'15-03-2021', progress: 40,  progressStatus: 'primary',worksStatus:'danger', worksText: 'Delay', workInfoStatus: true, worksInfoText:'Dealy by 30 days'},
  {No: 7, Task: 'Theme update', badge: 'primary', Priority:'Low', PriorityStatus: 'success', StartDate:'13-01-2021', Deadline:'25-02-2021', progress: 40,  progressStatus: 'primary',worksStatus:'primary', worksText: 'On Progress', workInfoStatus: false, worksInfoText:''},
  {No: 8, Task: 'Jquery Issues Fix', badge: 'success', Priority:'High', PriorityStatus: 'danger', StartDate:'13-03-2021', Deadline:'05-05-2021', progress: 100,  progressStatus: 'success',worksStatus:'success', worksText: 'Completed', workInfoStatus: false, worksInfoText:''}
];

@Component({
  selector: 'app-user-profile',  
  standalone: true,
  imports: [SharedModule,NgbModule,NgSelectModule,NgApexchartsModule,MaterialModuleModule,FormsModule,ReactiveFormsModule,FlatpickrModule,RouterModule],
  providers:[FlatpickrDefaults],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  model!: NgbDateStruct;
  model1!: NgbDateStruct;
  model2!: NgbDateStruct;
  model3!: NgbDateStruct;
  displayedColumns: string[] = ['No', 'Task', 'Priority', 'StartDate', 'Deadline', 'Progress', 'WorkStatus', 'Action'];
  dataSource;
  currentRate = 3;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private modalService: NgbModal, config: NgbRatingConfig) {
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA); 

    // customize default values of ratings used by this component tree
    config.max = 5;
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
      if(el.No == item){
        this.dataSource.data.splice(ind, 1)
        this.dataSource._updateChangeSubscription();
      }
    })    
  }
  edit(editContent:any) {
    this.modalService.open(editContent, { windowClass : 'modalCusSty modal-lg' })
  }

  inlineDatePicker: boolean = false;
  weekNumbers!: true
  // selectedDate: Date | null = null; 
  flatpickrOptions: any = {
    inline: true,
   
  };
  // flatpickrOptions: FlatpickrOptions;


  ngOnInit() {
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
}