import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgbDateStruct, NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../../../../shared/common/sharedmodule';
import { NgSelectModule } from '@ng-select/ng-select';
import { MaterialModuleModule } from '../../../../material-module/material-module.module';
import flatpickr from 'flatpickr';
import { FlatpickrDefaults, FlatpickrModule } from 'angularx-flatpickr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
export interface PeriodicElement {
  ID: number;
  projectTitle: string;
  projectTitleStatus: string;
  client: string;
  TeamMemeber : team[];
  priority: string;
  priorityStatus: string;
  startDate: string;
  deadline: string;
  workProgressText: string;
  workProgressPercentage: number;
  workProgressPercentageStatus: string;
  statusText: string;
  statusTextIcon: string;
  status: string;
}

interface team{
  team1? :  string;
  team2? :  string;
  team3? :  string;
  team4? :  string;
  team5? :  string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {ID: 1, projectTitle: 'Design Updated', projectTitleStatus: 'warning', client:'Julia Walker', TeamMemeber : [
    {team1: './assets/images/users/4.jpg', team2:'./assets/images/users/15.jpg', team3:'./assets/images/users/5.jpg', team4:'./assets/images/users/14.jpg'}
  ],
  priority:'High', statusTextIcon:'', priorityStatus:'danger', startDate:'12-02-2021', deadline:'16-06-2021', workProgressText:'Project Status', workProgressPercentageStatus:'primary', workProgressPercentage: 80, statusText:'On Progress', status:'primary'},
  {ID: 2, projectTitle: 'HTML Code Updated', projectTitleStatus: 'danger', client:'Diane Short', TeamMemeber : [
    {team1: './assets/images/users/2.jpg', team2:'./assets/images/users/10.jpg', team3:'./assets/images/users/3.jpg'}
  ],
  priority:'Low', statusTextIcon:'info', priorityStatus:'success', startDate:'01-01-2021', deadline:'22-04-2021', workProgressText:'Project Status', workProgressPercentageStatus:'warning', workProgressPercentage: 50, statusText:'Dealy', status:'danger'},
  {ID: 3, projectTitle: 'Angular Issues fixed', projectTitleStatus: 'success', client:'Pippa Welch', TeamMemeber : [
    {team1: './assets/images/users/4.jpg', team2:'./assets/images/users/11.jpg', team3:'./assets/images/users/5.jpg', team4:'./assets/images/users/6.jpg', team5:'./assets/images/users/7.jpg'}
  ],
  priority:'medium', statusTextIcon:'', priorityStatus:'warning', startDate:'11-04-2021', deadline:'16-06-2021', workProgressText:'Project Status', workProgressPercentageStatus:'success', workProgressPercentage: 100, statusText:'OnGoing', status:'warning'},
  {ID: 4, projectTitle: 'Marketing Material Issues', projectTitleStatus: 'primary', client:'Gabrielle Fisher', TeamMemeber : [
    {team1: './assets/images/users/8.jpg', team2:'./assets/images/users/12.jpg', team3:'./assets/images/users/9.jpg'}
  ],
  priority:'High', statusTextIcon:'', priorityStatus:'danger', startDate:'11-04-2021', deadline:'16-06-2021', workProgressText:'Project Status', workProgressPercentageStatus:'success', workProgressPercentage: 100, statusText:'Completed', status:'success'},
  {ID: 5, projectTitle: 'Logo Design', projectTitleStatus: 'primary', client:'Gabrielle Fisher', TeamMemeber : [
    {team1: './assets/images/users/1.jpg', team2:'./assets/images/users/13.jpg', team3:'./assets/images/users/2.jpg', team4: './assets/images/users/4.jpg'}
  ],
  priority:'High', statusTextIcon:'', priorityStatus:'danger', startDate:'11-03-2021', deadline:'16-06-2021', workProgressText:'Project Status', workProgressPercentageStatus:'orange', workProgressPercentage: 30, statusText:'Completed', status:'success'},
  {ID: 6, projectTitle: 'Angular Issues fixed', projectTitleStatus: 'success', client:'James Wilson', TeamMemeber : [ {team1: './assets/images/users/3.jpg', team2:'./assets/images/users/4.jpg', team3:'./assets/images/users/12.jpg'} ],
  priority:'Medium', statusTextIcon:'info', priorityStatus:'warning', startDate:'05-02-2021', deadline:'21-04-2021', workProgressText:'Project Status', workProgressPercentageStatus:'danger', workProgressPercentage: 0, statusText:'Dealy', status:'danger'},
  {ID: 7, projectTitle: 'Theme Update', projectTitleStatus: 'primary', client:'Ryan Terry', TeamMemeber : [ {team1: './assets/images/users/8.jpg', team2:'./assets/images/users/15.jpg', team3:'./assets/images/users/9.jpg', team4:'./assets/images/users/16.jpg'} ],
  priority:'Low', statusTextIcon:'', priorityStatus:'success', startDate:'21-01-2021', deadline:'15-03-2021', workProgressText:'Project Status', workProgressPercentageStatus:'danger', workProgressPercentage: 0, statusText:'Not Started', status:'info'},
  {ID: 8, projectTitle: 'Jquery issues fix', projectTitleStatus: 'success', client:'Sam Gray', TeamMemeber : [ {team1: './assets/images/users/4.jpg', team2:'./assets/images/users/11.jpg', team3:'./assets/images/users/7.jpg', team4:'./assets/images/users/13.jpg'} ],
  priority:'High', statusTextIcon:'', priorityStatus:'danger', startDate:'21-01-2021', deadline:'15-03-2021', workProgressText:'Project Status', workProgressPercentageStatus:'success', workProgressPercentage: 100, statusText:'Completed', status:'success'},
];

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [SharedModule,NgSelectModule,MaterialModuleModule,NgbModule,FlatpickrModule,FormsModule,ReactiveFormsModule,RouterModule],
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
  providers: [
    FlatpickrDefaults,
  ],
})
export class ProjectListComponent implements OnInit {
  model!: NgbDateStruct;
  model1!: NgbDateStruct;
  model2!: NgbDateStruct;
  model3!: NgbDateStruct;
  standard:any=[]
  displayedColumns: string[] = ['ID', 'ProjectTitle', 'Client', 'Team', 'Priority', 'StartDate', 'Deadline', 'Progress', 'Status', 'Action'];
  dataSource;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private modalService: NgbModal) {
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA); }

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
      if(el.ID == item){
        this.dataSource.data.splice(ind, 1)
        this.dataSource._updateChangeSubscription();
      }
    })    
  }
  edit(editContent:any) {
    this.modalService.open(editContent, { windowClass : 'modalCusSty',size:'lg' })
  }
  selected=['Faith Harris','Austin Bell','Maria Bower','Peter Hill']
}
