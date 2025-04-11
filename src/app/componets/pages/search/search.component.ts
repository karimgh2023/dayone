import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../../shared/common/sharedmodule';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [SharedModule,NgbModule,RouterModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  page = 1;
  active = 1;
  constructor() { }

  ngOnInit(): void {
  }

}
