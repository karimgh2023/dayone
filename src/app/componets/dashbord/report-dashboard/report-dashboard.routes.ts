import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProtocolManagementComponent } from './protocol-management/protocol-management.component';

const routes: Routes = [
  {
    path: 'dashboard/report-dashboard',
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./dashboard').then((m) => m.DashboardComponent),
      },
      {
        path: 'report-list',
        loadComponent: () =>
          import('./report-list').then((m) => m.ReportListComponent),
      },
      {
        path: 'new-report',
        loadComponent: () =>
          import('./new-report').then((m) => m.NewReportComponent),
      },
      {
        path: 'view-report/:id',
        loadComponent: () =>
          import('./view-report').then((m) => m.ViewReportComponent),
      },
      {
        path: 'protocols',
        loadComponent: () => Promise.resolve(ProtocolManagementComponent),
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