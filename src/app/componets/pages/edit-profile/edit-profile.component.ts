import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../../shared/common/sharedmodule';
import { NgSelectModule } from '@ng-select/ng-select';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [SharedModule,NgSelectModule,RouterModule],
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
