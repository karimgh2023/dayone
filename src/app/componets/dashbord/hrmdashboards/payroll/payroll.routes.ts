import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: 'dashboard/hrmdashboards/payroll',
    children: [
      {
        path: 'employee-salary',
        loadComponent: () =>
          import('./employee-salary/employee-salary.component').then((m) => m.EmployeeSalaryComponent),
          
      },
      {
        path: 'add-payroll',
        loadComponent: () =>
          import('./add-payroll/add-payroll.component').then((m) => m.AddPayrollComponent),
          
      },
      {
        path: 'edit-payroll',
        loadComponent: () =>
          import('./edit-payroll/edit-payroll.component').then((m) => m.EditPayrollComponent),
          
      },
     
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PayrollRoutingModule {
  static routes = routes;

 }
