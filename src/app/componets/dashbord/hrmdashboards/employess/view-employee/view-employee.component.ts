import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { Component, OnInit } from '@angular/core';
import { NgbDateStruct, NgbModule, NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { SharedModule } from '../../../../../shared/common/sharedmodule';
import { FlatpickrModule, FlatpickrDefaults } from 'angularx-flatpickr';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-employee',
  standalone: true,
  imports: [NgbModule,NgSelectModule,FormsModule,NgCircleProgressModule,SharedModule,FlatpickrModule,ReactiveFormsModule,CommonModule],
  providers:[FlatpickrDefaults],
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.scss']
})
export class ViewEmployeeComponent  {
  
  model!: NgbDateStruct;
  model1!: NgbDateStruct;
  model2!: NgbDateStruct;

  active = 1;
  currentRate = 3;

  rangeValue: { from: Date; to: Date } = {
    from: new Date(),
    to: (new Date() as any)['fp_incr'](10)
  };

  constructor(config: NgbRatingConfig) {
    // customize default values of ratings used by this component tree
    config.max = 5;
  }

}
