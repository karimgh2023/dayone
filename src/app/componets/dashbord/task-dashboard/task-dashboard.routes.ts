import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompletedTasksComponent } from './completed-tasks/completed-tasks.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NewTasksComponent } from './new-tasks/new-tasks.component';
import { OnHoldTasksComponent } from './on-hold-tasks/on-hold-tasks.component';
import { OverviewCalendarComponent } from './overview-calendar/overview-calendar.component';
import { RunningTasksComponent } from './running-tasks/running-tasks.component';
import { TaskBoardComponent } from './task-board/task-board.component';
import { TaskListComponent } from './task-list/task-list.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ViewTasksComponent } from './view-tasks/view-tasks.component';

const routes: Routes = [
  {
    path: 'dashboard/task-dashboard',
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./dashboard/dashboard.component').then((m) => m.DashboardComponent),
          
      },
      {
        path: 'task-list',
        loadComponent: () =>
          import('./task-list/task-list.component').then((m) => m.TaskListComponent),
          
      },
      {
        path: 'running-tasks',
        loadComponent: () =>
          import('./running-tasks/running-tasks.component').then((m) => m.RunningTasksComponent),
          
      },
      {
        path: 'onhold-tasks',
        loadComponent: () =>
          import('./on-hold-tasks/on-hold-tasks.component').then((m) => m.OnHoldTasksComponent),
          
      },
      {
        path: 'completed-tasks',
        loadComponent: () =>
          import('./completed-tasks/completed-tasks.component').then((m) => m.CompletedTasksComponent),
          
      },
      {
        path: 'view-tasks',
        loadComponent: () =>
          import('./view-tasks/view-tasks.component').then((m) => m.ViewTasksComponent),
          
      },
      {
        path: 'overview-calendar',
        loadComponent: () =>
          import('./overview-calendar/overview-calendar.component').then((m) => m.OverviewCalendarComponent),
          
      },
      {
        path: 'task-board',
        loadComponent: () =>
          import('./task-board/task-board.component').then((m) => m.TaskBoardComponent),
          
      },
      {
        path: 'new-task',
        loadComponent: () =>
          import('./new-tasks/new-tasks.component').then((m) => m.NewTasksComponent),
          
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
export class TaskDashboardRoutingModule { 
  static routes = routes;

}
