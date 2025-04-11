import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';



const routes: Routes = [
  {
    path: 'dashboard/client-dashboard',
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./dashboard/dashboard.component').then((m) => m.DashboardComponent),
          
      },
      {
        path: 'client-list',
        loadComponent: () =>
          import('./client-list/client-list.component').then((m) => m.ClientListComponent),
          
      },
      {
        path: 'view-client',
        loadComponent: () =>
          import('./view-client/view-client.component').then((m) => m.ViewClientComponent),
          
      },
      {
        path: 'new-client',
        loadComponent: () =>
          import('./new-client/new-client.component').then((m) => m.NewClientComponent),
          
      },
      {
        path: 'user-profile',
        loadComponent: () =>
          import('./user-profile/user-profile.component').then((m) => m.UserProfileComponent),
          
      },

     
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientDashboardRoutingModule { 
  static routes = routes;

}
