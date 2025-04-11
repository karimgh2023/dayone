import { Component, OnInit } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from '../../../../../shared/common/sharedmodule';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-recent-leaves',
  standalone: true,
  imports: [NgbModule,NgSelectModule,SharedModule,RouterModule],
  templateUrl: './recent-leaves.component.html',
  styleUrls: ['./recent-leaves.component.scss']
})
export class RecentLeavesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
