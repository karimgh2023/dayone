import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: 'dashboard/project-dashboard',
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./dashboard/dashboard.component').then((m) => m.DashboardComponent),
          
      },
      {
        path: 'project-list',
        loadComponent: () =>
          import('./project-list/project-list.component').then((m) => m.ProjectListComponent),
          
      },
      {
        path: 'view-project',
        loadComponent: () =>
          import('./view-project/view-project.component').then((m) => m.ViewProjectComponent),
          
      },
      {
        path: 'overview-calendar',
        loadComponent: () =>
          import('./overview-calendar/overview-calendar.component').then((m) => m.OverviewCalendarComponent),
          
      },
      {
        path: 'new-project',
        loadComponent: () =>
          import('./new-project/new-project.component').then((m) => m.NewProjectComponent),
          
      },
     
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectDashboardRoutingModule {
  static routes = routes;
 }
