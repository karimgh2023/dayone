import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: 'dashboard/employee-dashboard',
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./dashboard/dashboard.component').then((m) => m.DashboardComponent),
          
      },
      {
        path: 'attendance',
        loadComponent: () =>
          import('./attendance/attendance.component').then((m) => m.AttendanceComponent),
          
      },
      {
        path: 'apply-leaves',
        loadComponent: () =>
          import('./apply-leaves/apply-leaves.component').then((m) => m.ApplyLeavesComponent),
          
      },
      {
        path: 'my-leaves',
        loadComponent: () =>
          import('./my-leaves/my-leaves.component').then((m) => m.MyLeavesComponent),
          
      },
      {
        path: 'payslips',
        loadComponent: () =>
          import('./payslips/payslips.component').then((m) => m.PayslipsComponent),
          
      },
      {
        path: 'expenses',
        loadComponent: () =>
          import('./expenses/expenses.component').then((m) => m.ExpensesComponent),
          
      },
     
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeDashboardRoutingModule { 
  static routes = routes;

}
