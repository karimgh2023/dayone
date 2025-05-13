import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const admin: Routes = [
  {
    path: 'dashboard/companies-dashboard', children: [
      {
        path: 'companies',
        loadComponent: () =>
          import('./companies.component').then((m) => m.CompaniesComponent),
      },
    
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(admin)],
  exports: [RouterModule],
})
export class CompanyDashboardRoutingModule {
  static routes = admin;
}