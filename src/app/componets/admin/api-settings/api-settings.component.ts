import { Component, OnInit } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../../../shared/common/sharedmodule';
import { NgSelectModule } from '@ng-select/ng-select';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-api-settings',
  standalone: true,
  imports: [NgbModule,SharedModule,NgSelectModule,RouterModule],
  templateUrl: './api-settings.component.html',
  styleUrls: ['./api-settings.component.scss']
})
export class ApiSettingsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
