import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/common/sharedmodule';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-rating',
  standalone: true,
  imports: [SharedModule,NgbModule,FormsModule,ReactiveFormsModule,RouterModule],
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit {
  rating3: number;
  public form: FormGroup;

  currentRate = 5;
 customCurrentRate = 5;
 customCurrentRateInput = 5;
 selected = 0;
 hovered = 0;
 readonly = false;
 heartRate = 3.45;
 ctrl! : FormControl;

 constructor(private fb: FormBuilder) { 
   this.rating3 = 1;
   this.form = this.fb.group({
     rating1: ['', Validators.required],
   });
   this.ctrl = new FormControl(null, Validators.required);
 }

 ngOnInit(): void {
 }

 ratingDisplay!: number;
 
 onRatingSet(rating: number): void {
   this.ratingDisplay = rating;
 }

 toggle() {
   if (this.ctrl.disabled) {
     this.ctrl.enable();
   } else {
     this.ctrl.disable();
   }
 }
}
