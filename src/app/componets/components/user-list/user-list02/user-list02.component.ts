import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../../../shared/common/sharedmodule';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-list02',
  standalone: true,
  imports: [SharedModule,RouterModule],
  templateUrl: './user-list02.component.html',
  styleUrls: ['./user-list02.component.scss']
})
export class UserList02Component implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
