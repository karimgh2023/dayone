import { Component, OnInit } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../../../../shared/common/sharedmodule';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-profiles03',
  standalone: true,
  imports: [SharedModule,NgbModule,RouterModule],
  templateUrl: './profiles03.component.html',
  styleUrls: ['./profiles03.component.scss']
})
export class Profiles03Component implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
