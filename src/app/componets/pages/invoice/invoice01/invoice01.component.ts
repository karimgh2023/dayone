import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../../../shared/common/sharedmodule';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-invoice01',
  standalone: true,
  imports: [SharedModule,RouterModule],
  templateUrl: './invoice01.component.html',
  styleUrls: ['./invoice01.component.scss']
})
export class Invoice01Component implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
