import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../../../shared/common/sharedmodule';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-invoice02',
  standalone: true,
  imports: [SharedModule,RouterModule],
  templateUrl: './invoice02.component.html',
  styleUrls: ['./invoice02.component.scss']
})
export class Invoice02Component implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
