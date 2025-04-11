import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../../../shared/common/sharedmodule';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-pricing01',
  standalone: true,
  imports: [SharedModule,RouterModule],
  templateUrl: './pricing01.component.html',
  styleUrls: ['./pricing01.component.scss']
})
export class Pricing01Component implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
