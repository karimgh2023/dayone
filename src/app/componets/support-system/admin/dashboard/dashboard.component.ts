import { Component, OnInit } from '@angular/core';
import { UserPagedashboardType, UserPageData } from '../../user-pages/dashboard/dashboard.component';
import * as data from '../../user-pages/dashboard/supportChartData';
import { SharedModule } from '../../../../shared/common/sharedmodule';
import { NgApexchartsModule } from 'ng-apexcharts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SharedModule,NgApexchartsModule,NgbModule,NgSelectModule,FormsModule,ReactiveFormsModule,RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  page = 1;
  pageSize = 5;
  collectionSize = UserPageData.length;
  dashboard!: UserPagedashboardType[];
  
  constructor() {this.refreshDashboardData(); }

  ngOnInit(): void {
  }
  refreshDashboardData() {
    this.dashboard = UserPageData
      .map((DashboardData, i) => ({id: i + 1, ...DashboardData}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }
  
  public donutData = data.DonutChartData;

  TableData = [
    {
      ID:'#289',
      Title:'	Sed ut perspiciatis',
      Priority:'Low',
      PriorityBg:'success',
      Category:'Support',
      Date:'12-01-2021',
      Status:'Open',
      StatusBg:'success',
    },
    {
      ID:'#320',
      Title:'Excepteur occaecat',
      Priority:'Low',
      PriorityBg:'success',
      Category:'Services',
      Date:'05-02-2021',
      Status:'Closed',
      StatusBg:'danger',
    },
    {
      ID:'#837',
      Title:'Sample Test1',
      Priority:'High',
      PriorityBg:'danger',
      Category:'Customization	',
      Date:'13-03-2021',
      Status:'open',
      StatusBg:'success',
    },
    {
      ID:'#124',
      Title:'Sample Test2',
      Priority:'Medium',
      PriorityBg:'warning',
      Category:'Support',
      Date:'01-01-2021',
      Status:'Closed',
      StatusBg:'danger',
    },
    {
      ID:'#309',
      Title:'Ut aut reiciendi',
      Priority:'Low',
      PriorityBg:'success',
      Category:'Services',
      Date:'11-04-2021',
      Status:'Open',
      StatusBg:'success',
    },
    {
      ID:'#117',
      Title:'	Unde omnis iste natus',
      Priority:'Low',
      PriorityBg:'success',
      Category:'Services',
      Date:'11-04-2021',
      Status:'Open',
      StatusBg:'success',
    },
    {
      ID:'#276',
      Title:'Et harum quidem',
      Priority:'Medium',
      PriorityBg:'warning',
      Category:'Support',
      Date:'11-04-2021',
      Status:'Open',
      StatusBg:'success',
    },
    {
      ID:'#738',
      Title:'Maiores alias aut',
      Priority:'High',
      PriorityBg:'success',
      Category:'Services',
      Date:'17-03-2021',
      Status:'Open',
      StatusBg:'success',
    },
    {
      ID:'#498',
      Title:'Quis autem vel',
      Priority:'High',
      PriorityBg:'danger',
      Category:'Support',
      Date:'17-02-2021',
      Status:'Open',
      StatusBg:'success',
    },

    {
      ID:'#298',
      Title:'Ut aut reiciendi',
      Priority:'High',
      PriorityBg:'danger',
      Category:'Services',
      Date:'11-03-2021',
      Status:'closed',
      StatusBg:'danger',
    },
  ]
}
