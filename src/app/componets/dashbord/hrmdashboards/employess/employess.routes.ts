import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'dashboard/hrmdashboards/employees',
    children: [
      {
        path: 'employee-list',
        loadComponent: () =>
          import('./employee-list/employee-list.component').then((m) => m.EmployeeListComponent),
          
      },
      {
        path: 'view-employee',
        loadComponent: () =>
          import('./view-employee/view-employee.component').then((m) => m.ViewEmployeeComponent),
          
      },
      {
        path: 'add-employee',
        loadComponent: () =>
          import('./add-employee/add-employee.component').then((m) => m.AddEmployeeComponent),
          
      },
    
     
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployessRoutingModule {
  static routes = routes;
 }
