import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgbDateStruct, NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgApexchartsModule } from 'ng-apexcharts';
import { MaterialModuleModule } from '../../../../material-module/material-module.module';
import { SharedModule } from '../../../../shared/common/sharedmodule';
import { FlatpickrDefaults, FlatpickrModule } from 'angularx-flatpickr';
import flatpickr from 'flatpickr'
import { MatFormFieldAppearance } from '@angular/material/form-field';
import { RouterModule } from '@angular/router';
import { AngularEditorConfig, AngularEditorModule } from '@wfpena/angular-wysiwyg';
interface PeriodicElement {
  No: number;
  Task: string;
  badge: string;
  Department: string;
  img: string;
  AssignTo: string;
  Priority: string;
  PriorityStatus: string;
  StartDate: string;
  Deadline: string;
  progress: number;
  progressStatus: string;
  worksStatus: string;
  worksStatusIcon:string;
  worksText: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {No: 1, Task: 'Marketing materials Issues', badge: 'warning', Department:'Marketing', img:'./assets/images/users/10.jpg', AssignTo: 'Faith Harris', Priority:'High', PriorityStatus: 'danger', StartDate:'11-03-2021', Deadline:'19-05-2021', progress: 80, progressStatus: 'success',worksStatus:'warning', worksStatusIcon:'', worksText: 'On hold'},
  {No: 2, Task: 'Logo Design', badge: 'danger', Department:'Designing', img:'./assets/images/users/1.jpg', AssignTo: 'Austin Bell', Priority:'Low', PriorityStatus: 'success', StartDate:'05-02-2021', Deadline:'21-04-2021', progress: 70, progressStatus: 'success', worksStatus:'danger',   worksStatusIcon:'info',worksText: 'Dealy'},
  {No: 3, Task: 'Theme Update', badge: 'warning', Department:'Designing', img:'./assets/images/users/2.jpg', AssignTo: 'Maria Bower', Priority:'Medium', PriorityStatus: 'warning', StartDate:'23-01-2021', Deadline:'25-02-2021', progress: 40, progressStatus: 'success',worksStatus:'success', worksStatusIcon:'', worksText: 'Completed'},
  {No: 4, Task: 'Design Updated', badge: 'warning', Department:'Designing', img:'./assets/images/users/3.jpg', AssignTo: 'Peter Hill', Priority:'High', PriorityStatus: 'danger', StartDate:'12-02-2021', Deadline:'16-06-2021', progress: 50, progressStatus: 'success',worksStatus:'primary', worksStatusIcon:'', worksText: 'On Progress'},
  {No: 5, Task: 'HTML code Updated', badge: 'danger', Department:'Designing', img:'./assets/images/users/4.jpg', AssignTo: 'Victoria Lyman', Priority:'High', PriorityStatus: 'danger', StartDate:'05-02-2021', Deadline:'22-04-2021	', progress: 50,progressStatus: 'success',worksStatus:'primary', worksStatusIcon:'', worksText: 'OnProgress'},
  {No: 6, Task: 'Application Bugs fix', badge: 'danger', Department:'Angular', img:'./assets/images/users/5.jpg', AssignTo: 'Adam Quinn', Priority:'Medium', PriorityStatus: 'warning', StartDate:'11-04-2021', Deadline:'16-06-2021', progress: 80,  progressStatus: 'success',worksStatus:'danger', worksStatusIcon:'info', worksText: 'Dealy'},
  {No: 7, Task: 'Theme update', badge: 'primary', Department:'Designing', img:'./assets/images/users/4.jpg', AssignTo: 'Melanie Coleman', Priority:'Low', PriorityStatus: 'success', StartDate:'23-01-2021', Deadline:'25-02-2021', progress: 40,  progressStatus: 'primary',worksStatus:'primary', worksStatusIcon:'', worksText: 'On Progress'},
  {No: 8, Task: 'Jquery Issues Fix', badge: 'success', Department:'Development', img:'./assets/images/users/12.jpg', AssignTo: 'Max Wilson', Priority:'High', PriorityStatus: 'danger', StartDate:'13-03-2021', Deadline:'05-05-2021', progress: 10,  progressStatus: 'success',worksStatus:'success', worksStatusIcon:'', worksText: 'Completed'}
];

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [RouterModule,SharedModule,NgbModule,NgSelectModule,FlatpickrModule,NgSelectModule,NgApexchartsModule,MaterialModuleModule,FormsModule,ReactiveFormsModule,AngularEditorModule],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  providers: [FlatpickrDefaults]
})
export class TaskListComponent implements OnInit {
  model!: NgbDateStruct;
  model1!: NgbDateStruct;
  model2!: NgbDateStruct;
  model3!: NgbDateStruct;
  displayedColumns: string[] = ['No', 'Task', 'Department', 'AssignTo', 'Priority', 'StartDate', 'Deadline', 'Progress', 'WorkStatus', 'Action'];
  dataSource;
  standard:any=['']

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private modalService: NgbModal) {
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA); }
    inlineDatePicker: boolean = false;
    weekNumbers!: true
    // selectedDate: Date | null = null; 
    flatpickrOptions: any = {
      inline: true,
     
    };
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
  removeData(No: number) {
    this.dataSource.data.map((el,ind) =>{
      if(el.No == No){
        this.dataSource.data.splice(ind, 1)
        this.dataSource._updateChangeSubscription();
      }
    })    
  }
  edit(editContent:any) {
    this.modalService.open(editContent, {  windowClass : 'modalCusSty',size:'lg' })
  }
  htmlContent:string = '';
  config1: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '13rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...', 
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    toolbarHiddenButtons: [
      ['bold']
      ],
    customClasses: [
      {
        name: "quote",
        class: "quote",
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: "titleText",
        class: "titleText",
        tag: "h1",
      },
    ]
  };
}
