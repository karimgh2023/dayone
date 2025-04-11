import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularEditorConfig, AngularEditorModule } from '@kolkov/angular-editor';
import { NgbAccordionModule, NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgApexchartsModule } from 'ng-apexcharts';
import { MaterialModuleModule } from '../../../../material-module/material-module.module';
import { SharedModule } from '../../../../shared/common/sharedmodule';
import { CommonModule } from '@angular/common';
import { FlatpickrDefaults, FlatpickrModule } from 'angularx-flatpickr';
import flatpickr from 'flatpickr'
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-view-tasks',
  standalone: true,
  imports: [SharedModule,NgbModule,NgbAccordionModule,NgSelectModule,FlatpickrModule,NgApexchartsModule,MaterialModuleModule,FormsModule,ReactiveFormsModule,AngularEditorModule,CommonModule,RouterModule],
  templateUrl: './view-tasks.component.html',
  styleUrls: ['./view-tasks.component.scss'],
  providers: [FlatpickrDefaults]
})
export class ViewTasksComponent implements OnInit {
  active =1;
  constructor(private modalService: NgbModal) { }
  isCollapsed=true
  panels = ['Have you insert form validations Page?', 'Have you made Responsiveness?', 'Have you using Bootstrap?','Have you insert live chat?'];
  open(content:any) {
    this.modalService.open(content, {windowClass : 'modalCusSty' })
  }
  //Angular Editor
  public config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
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
  }
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

    flatpickr('#pretime', this.flatpickrOptions);}
}
