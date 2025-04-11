import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../../../shared/common/sharedmodule';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-invoice03',
  standalone: true,
  imports: [SharedModule,NgbModule,RouterModule],
  templateUrl: './invoice03.component.html',
  styleUrls: ['./invoice03.component.scss']
})
export class Invoice03Component implements OnInit {
  active = 1;

  constructor() { }

  ngOnInit(): void {
  }

}
