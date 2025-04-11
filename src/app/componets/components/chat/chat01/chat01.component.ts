import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../../../shared/common/sharedmodule';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OverlayscrollbarsModule } from 'overlayscrollbars-ngx';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-chat01',
  standalone: true,
  imports: [SharedModule,NgbModule,OverlayscrollbarsModule,RouterModule],
  templateUrl: './chat01.component.html',
  styleUrls: ['./chat01.component.scss']
})
export class Chat01Component implements OnInit {
  active = 1;
  
  constructor() { }

  ngOnInit(): void {
  }

}
