import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../../../shared/common/sharedmodule';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-profiles01',
  standalone: true,
  imports: [SharedModule,RouterModule,NgbModule],
  templateUrl: './profiles01.component.html',
  styleUrls: ['./profiles01.component.scss']
})
export class Profiles01Component implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
