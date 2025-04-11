import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../../../shared/common/sharedmodule';
import { OverlayscrollbarsModule } from 'overlayscrollbars-ngx';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-chat02',
  standalone: true,
  imports: [SharedModule,OverlayscrollbarsModule,NgbModule,RouterModule],
  templateUrl: './chat02.component.html',
  styleUrls: ['./chat02.component.scss']
})
export class Chat02Component implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
