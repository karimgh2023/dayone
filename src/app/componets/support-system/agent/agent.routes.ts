import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: 'support-system/agent',
    children: [
      
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./dashboard/dashboard.component').then((m) => m.DashboardComponent),
          
      },
      {
        path: 'edit-profile',
        loadComponent: () =>
          import('./edit-profile/edit-profile.component').then((m) => m.EditProfileComponent),
          
      }, 
      {
        path: 'assigned-categories',
        loadComponent: () =>
          import('./assigned-categories/assigned-categories.component').then((m) => m.AssignedCategoriesComponent),
          
      }, 
      
     
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgentRoutingModule {
  static routes = routes;

 }
