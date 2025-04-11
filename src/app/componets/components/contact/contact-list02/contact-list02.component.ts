import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../../../shared/common/sharedmodule';
import { OverlayscrollbarsModule } from 'overlayscrollbars-ngx';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-contact-list02',
  standalone: true,
  imports: [SharedModule,OverlayscrollbarsModule,NgbModule,RouterModule],
  templateUrl: './contact-list02.component.html',
  styleUrls: ['./contact-list02.component.scss']
})
export class ContactList02Component implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
