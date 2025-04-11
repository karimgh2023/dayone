import { Component, OnInit } from '@angular/core';
import * as data from '../../user-pages/dashboard/supportChartData';
import { SharedModule } from '../../../../shared/common/sharedmodule';
import { NgApexchartsModule } from 'ng-apexcharts';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SharedModule,NgApexchartsModule,RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  public barData = data.BarChartData;
  // Bar Chart 1
  public barChartOptions = data.barChartOptions1;
  public barChartData = data.barChartData1;
  public barChartType = data.barChartType1;
  public barChartPlugins = data.barChartPlugins1;

}
