import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../../../shared/common/sharedmodule';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-list04',
  standalone: true,
  imports: [SharedModule,NgbModule,RouterModule],
  templateUrl: './user-list04.component.html',
  styleUrls: ['./user-list04.component.scss']
})
export class UserList04Component implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
