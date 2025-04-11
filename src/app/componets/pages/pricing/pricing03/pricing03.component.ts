import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../../../shared/common/sharedmodule';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-pricing03',
  standalone: true,
  imports: [SharedModule,NgbModule,RouterModule],
  templateUrl: './pricing03.component.html',
  styleUrls: ['./pricing03.component.scss']
})
export class Pricing03Component implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
