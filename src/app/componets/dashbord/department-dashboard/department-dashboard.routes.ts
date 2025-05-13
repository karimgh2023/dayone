import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const admin: Routes = [
  {
    path: 'dashboard/department-dashboard', children: [
      {
        path: 'department',
        loadComponent: () =>
          import('./department.component').then((m) => m.DepartmentComponent),
      },
    
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(admin)],
  exports: [RouterModule],
})
export class DepartmentDashboardRoutingModule {
  static routes = admin;
}