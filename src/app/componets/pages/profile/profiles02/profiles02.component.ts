import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../../../shared/common/sharedmodule';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-profiles02',
  standalone: true,
  imports: [SharedModule,NgbModule,RouterModule],
  templateUrl: './profiles02.component.html',
  styleUrls: ['./profiles02.component.scss']
})
export class Profiles02Component implements OnInit {
  active = 1;

  constructor() { }

  ngOnInit(): void {
  }

}
