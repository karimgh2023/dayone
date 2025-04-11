import { Component, OnInit } from '@angular/core';
import * as data from './supportChartData';
import { SharedModule } from '../../../../shared/common/sharedmodule';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { NgApexchartsModule } from 'ng-apexcharts';
import { CommonModule } from '@angular/common';

export interface UserPagedashboardType {
  ID: string;
  title: string;
  priority: string;
  priorityStatus: string;
  category: string;
  date: string;
  statusText: string;
  status: string;
}

export const UserPageData:UserPagedashboardType[] = [
  {ID: '#289', title: 'Sed ut perspiciatis', priority: 'Low', priorityStatus: 'success', category: '	Support', date: '12-01-2021', status: 'success', statusText: 'Open'},
  {ID: '#320', title: 'Excepteur occaecat', priority: 'Low', priorityStatus: 'success', category: 'Services', date: '12-01-2021', status: 'danger', statusText: 'Closed'},
  {ID: '#837', title: 'Sample Test1', priority: 'High', priorityStatus: 'danger', category: '	Customization', date: '12-01-2021', status: 'success', statusText: 'Open'},
  {ID: '#124', title: 'Sample Test2', priority: 'Medium', priorityStatus: 'warning', category: '	Support', date: '12-01-2021', status: 'danger', statusText: 'Closed'},
  {ID: '#309', title: 'Ut aut reiciendi', priority: 'Low', priorityStatus: 'success', category: '	Services', date: '12-01-2021', status: 'success', statusText: 'Open'},
  {ID: '#117', title: 'Unde omnis iste natus', priority: 'Low', priorityStatus: 'success', category: '	Services', date: '12-01-2021', status: 'success', statusText: 'Open'},
  {ID: '#276', title: 'Et harum quidem', priority: 'Medium', priorityStatus: 'warning', category: '	Support', date: '12-01-2021', status: 'success', statusText: 'Open'},
  {ID: '#738', title: 'Maiores alias aut', priority: 'Low', priorityStatus: 'success', category: '	Services', date: '12-01-2021', status: 'success', statusText: 'Open'},
  {ID: '#498', title: 'Quis autem vel', priority: 'High', priorityStatus: 'danger', category: '	Support', date: '12-01-2021', status: 'success', statusText: 'Open'},
  {ID: '#298', title: 'Ut aut reiciendi', priority: 'High', priorityStatus: 'danger', category: '	Services', date: '12-01-2021', status: 'danger', statusText: 'Closed'},
]

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SharedModule,NgSelectModule,FormsModule,NgbModule,RouterModule,NgApexchartsModule,CommonModule],
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
  
  isLevel1Open = false;

  toggleLevel1() {
    this.isLevel1Open = !this.isLevel1Open;
  }
  
  // Bar Chart 1
  public barChartOptions = data.barChartOptions;
  public barChartData = data.barChartData;
  public barChartType = data.barChartType;
  public barChartPlugins = data.barChartPlugins;
chartOptions:any={
  series: [{
    name: 'Profit Earned',
    data: [44, 42, 57, 86, 58, 55, 70,44, 42, 57, 86, 58],
}, {
    name: 'Total Sales',
    data: [40, 38, 47, 86, 51, 55, 65,39, 32, 47, 76, 41],
}],
chart: {
    type: 'bar',
    height: 350,
    toolbar: {
        show: false,
    }
},
grid: {
    borderColor: '#f1f1f1',
    strokeDashArray: 3
},
colors: ["rgb(51, 102, 255)", "rgba(51, 102, 255, 0.1)"],
plotOptions: {
    bar: {
        colors: {
            ranges: [{
                from: -100,
                to: -46,
                color: '#ebeff5'
            }, {
                from: -45,
                to: 0,
                color: '#ebeff5'
            }]
        },
        columnWidth: '55%',
        borderRadius: 5,
    }
},
dataLabels: {
    enabled: false,
},
stroke: {
    show: true,
    width: 2,
    colors: undefined,
},
legend: {
    show: false,
    position: 'top',
},
yaxis: {
    title: {
        style: {
            color: '#adb5be',
            fontSize: '13px',
            fontFamily: 'poppins, sans-serif',
            fontWeight: 600,
            cssClass: 'apexcharts-yaxis-label',
        },
    },
    labels: {
        formatter: function (y: number) {
            return y.toFixed(0) + "";
        }
    }
},
xaxis: {
    type: 'week',
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    axisBorder: {
        show: true,
        color: 'rgba(119, 119, 142, 0.05)',
        offsetX: 0,
        offsetY: 0,
    },
    axisTicks: {
        show: true,
        borderType: 'solid',
        color: 'rgba(119, 119, 142, 0.05)',
        width: 6,
        offsetX: 0,
        offsetY: 0
    },
    labels: {
        rotate: -90
    }
}
}
  
}
