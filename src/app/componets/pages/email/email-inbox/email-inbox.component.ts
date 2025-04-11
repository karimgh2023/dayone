import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../../../shared/common/sharedmodule';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-email-inbox',
  standalone: true,
  imports: [SharedModule,NgbModule,RouterModule],
  templateUrl: './email-inbox.component.html',
  styleUrls: ['./email-inbox.component.scss']
})
export class EmailInboxComponent implements OnInit {
  page =1;
  constructor() { }

  ngOnInit(): void {
  }

}
