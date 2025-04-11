import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../../../shared/common/sharedmodule';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-pricing02',
  standalone: true,
  imports: [SharedModule,RouterModule],
  templateUrl: './pricing02.component.html',
  styleUrls: ['./pricing02.component.scss']
})
export class Pricing02Component implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
