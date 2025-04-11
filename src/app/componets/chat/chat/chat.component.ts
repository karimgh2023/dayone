import { OverlayscrollbarsModule } from 'overlayscrollbars-ngx';
import { Component, OnInit } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../../../shared/common/sharedmodule';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [NgbModule,SharedModule,OverlayscrollbarsModule,RouterModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  active =1;
  constructor() { }

  ngOnInit(): void {
  }

}
