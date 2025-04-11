import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../../../shared/common/sharedmodule';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [SharedModule,NgSelectModule,NgbModule,RouterModule,CommonModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  active = 1;
  
  public showPassword: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }
  toggleClass = 'eye-off';

  public togglePassword() {
    this.showPassword = !this.showPassword;
    if (this.toggleClass === 'eye') {
      this.toggleClass = 'eye-off';
    } else {
      this.toggleClass = 'eye';
    }
}
toggleClass1 = 'eye-off';
public showPassword1: boolean = false;
public togglePassword1() {
  this.showPassword1 = !this.showPassword1;
  if (this.toggleClass1 === 'eye') {
    this.toggleClass1 = 'eye-off';
  } else {
    this.toggleClass1 = 'eye';
  }
}
toggleClass2 = 'eye-off';
public showPassword2: boolean = false;
public togglePassword2() {
  this.showPassword2 = !this.showPassword2;
  if (this.toggleClass2 === 'eye') {
    this.toggleClass2 = 'eye-off';
  } else {
    this.toggleClass2 = 'eye';
  }
}
  isLevel1Open = false;

  toggleLevel1() {
    this.isLevel1Open = !this.isLevel1Open;
  }
}
