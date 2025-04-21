import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProtocolSelectionComponent } from './protocol-selection/protocol-selection.component';
import { ReportCreateComponent } from './report-create/report-create.component';
import { ViewReportsComponent } from './view-reports/view-reports.component';
import { FillReportComponent } from './fill-report/fill-report.component';

const routes: Routes = [
  {
    path: 'dashboard/report-dashboard',
    children: [


      {
        path: 'fill-report/:id',
        loadComponent: () => Promise.resolve(FillReportComponent),
      },
      {
        path: 'view-reports',
        loadComponent: () => Promise.resolve(ViewReportsComponent),
      },

      {
        path: 'protocol-selection',
        loadComponent: () => Promise.resolve(ProtocolSelectionComponent),
      },
      {
        path: 'report-create/:protocolId',
        loadComponent: () => Promise.resolve(ReportCreateComponent),
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportDashboardRoutingModule {
  static routes = routes;
}
