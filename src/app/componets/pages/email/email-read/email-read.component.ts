import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../../../shared/common/sharedmodule';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-email-read',
  standalone: true,
  imports: [SharedModule,NgbModule,RouterModule],
  templateUrl: './email-read.component.html',
  styleUrls: ['./email-read.component.scss']
})
export class EmailReadComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
