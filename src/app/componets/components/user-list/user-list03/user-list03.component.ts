import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../../../shared/common/sharedmodule';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-list03',
  standalone: true,
  imports: [SharedModule,NgbModule,RouterModule],
  templateUrl: './user-list03.component.html',
  styleUrls: ['./user-list03.component.scss']
})
export class UserList03Component implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
