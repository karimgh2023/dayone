import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../../../shared/common/sharedmodule';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [SharedModule,NgbModule,NgSelectModule,RouterModule,CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent{

  isSMTPOpen1: boolean = false;

  toggleSmtp1(isOpen: boolean): void {
    this.isSMTPOpen1 = isOpen;
  }

  isPaypalOpen = false;

  togglePaypalDisplay(event: Event) {
    this.isPaypalOpen = (event.target as HTMLInputElement).checked;
  }
  isSMTPOpen: boolean = false;

  toggleSmtp(isOpen: boolean): void {
    this.isSMTPOpen = isOpen;
  }
 
}
