import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../../../shared/common/sharedmodule';
import { NgSelectModule } from '@ng-select/ng-select';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-assigned-categories',
  standalone: true,
  imports: [SharedModule,NgSelectModule,RouterModule,NgbModule],
  templateUrl: './assigned-categories.component.html',
  styleUrls: ['./assigned-categories.component.scss']
})
export class AssignedCategoriesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
