import { Component, OnInit } from '@angular/core';
import { CompaniesSummaryData, CompaniesSummaryType, InactiveCompaniesData, InactiveCompaniesType } from './superAdminDashboard';
import * as data from './superAdminChatCData'
import { SharedModule } from '../../../../shared/common/sharedmodule';
import { NgApexchartsModule } from 'ng-apexcharts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SharedModule,NgApexchartsModule,NgbModule,RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  CompaniesSummeryList: CompaniesSummaryType[];
  InactiveCompaniesList: InactiveCompaniesType[];

  constructor() { 
    this.CompaniesSummeryList = CompaniesSummaryData
    this.InactiveCompaniesList = InactiveCompaniesData
  }

  ngOnInit(): void {
  }
  
  removeCompaniesSummery(item:number){
    this.CompaniesSummeryList.map((el,ind)=>{
      if(el.id === item){
        this.CompaniesSummeryList.splice(ind,1)
      }
    })
  }
  removeInactiveCompanies(item:number){
    this.InactiveCompaniesList.map((el,ind)=>{
      if(el.id === item){
        this.InactiveCompaniesList.splice(ind,1)
      }
    })
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
      height: 310,
      toolbar: {
          show: false,
      }
  },
  grid: {
      borderColor: '#f1f1f1',
      strokeDashArray: 3
  },
  colors: [ "#e4e7ed", "rgb(51, 102, 255)"],
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
          columnWidth: '40%',
          borderRadius: 6,
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
