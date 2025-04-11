import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: 'dashboard/super-admin',
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./dashboard/dashboard.component').then((m) => m.DashboardComponent),
          
      },
      {
        path: 'companies',
        loadComponent: () =>
          import('./companies/companies.component').then((m) => m.CompaniesComponent),
          
      },
      {
        path: 'subscription-plans',
        loadComponent: () =>
          import('./subscription-plans/subscription-plans.component').then((m) => m.SubscriptionPlansComponent),
          
      }, 
        {
        path: 'invoices',
        loadComponent: () =>
          import('./invoices/invoices.component').then((m) => m.InvoicesComponent),
          
      },   {
        path: 'super-admins',
        loadComponent: () =>
          import('./super-admins/super-admins.component').then((m) => m.SuperAdminsComponent),
          
      },   {
        path: 'settings',
        loadComponent: () =>
          import('./settings/settings.component').then((m) => m.SettingsComponent),
          
      },   {
        path: 'role-access',
        loadComponent: () =>
          import('./role-access/role-access.component').then((m) => m.RoleAccessComponent),
          
      },
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuperAdminRoutingModule {
  static routes = routes;

 }
