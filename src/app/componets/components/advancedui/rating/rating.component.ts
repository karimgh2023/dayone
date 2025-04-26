import { Component } from '@angular/core';
import { SharedModule } from '../../../shared/common/sharedmodule';
import { BarRatingModule } from 'ngx-bar-rating';
import { FormsModule, ReactiveFormsModule, UntypedFormControl,Validators } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-rating',
  standalone: true,
  imports: [SharedModule,BarRatingModule,NgbModule,FormsModule,ReactiveFormsModule,RouterModule],
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent {
  starRate = 0;
  starRate1 = 0;
  starRate2 = 5;
  starRate3 = 0;
  squareRate = 3;
  faRate = 3;
  currentRate = 5;
  customCurrentRate = 5;
  customCurrentRateInput = 5;
  selected = 2;
  selected1 = 3;
  hovered = 1;
  hovered1 = 2;
  readonly = false;
  heartRate = 3.45;
  ctrl: UntypedFormControl;
  ctrl1: UntypedFormControl;
  constructor() {
    this.ctrl = new UntypedFormControl(null, Validators.required);
    this.ctrl1 = new UntypedFormControl(null, Validators.required);
  }

  ariaValueText(current: number, max: number) {
    return `${current} out of ${max} hearts`;
  }

  ngOnInit(): void {}

  toggle = () => {
    if (this.ctrl.disabled) {
      this.ctrl.enable();
    } else {
      this.ctrl.disable();
    }
  };
}
