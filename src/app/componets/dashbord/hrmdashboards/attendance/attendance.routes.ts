import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: 'dashboard/hrmdashboards/attendance',
    children: [
      {
        path: 'attendence-list',
        loadComponent: () =>
          import('./attendence-list/attendence-list.component').then((m) => m.AttendenceListComponent),
          
      },
      {
        path: 'attendencebyuser',
        loadComponent: () =>
          import('./attendencebyuser/attendencebyuser.component').then((m) => m.AttendencebyuserComponent),
          
      },
      {
        path: 'attendenceview',
        loadComponent: () =>
          import('./attendenceview/attendenceview.component').then((m) => m.AttendenceviewComponent),
          
      },
      {
        path: 'attendence-list',
        loadComponent: () =>
          import('./attendence-list/attendence-list.component').then((m) => m.AttendenceListComponent),
          
      },
      {
        path: 'overview-calendar',
        loadComponent: () =>
          import('./overview-calendar/overview-calendar.component').then((m) => m.OverviewCalendarComponent),
          
      },
      {
        path: 'attendence-mark',
        loadComponent: () =>
          import('./attendence-mark/attendence-mark.component').then((m) => m.AttendenceMarkComponent),
          
      },
      {
        path: 'leave-settings',
        loadComponent: () =>
          import('./leave-settings/leave-settings.component').then((m) => m.LeaveSettingsComponent),
          
      },
      {
        path: 'leave-applications',
        loadComponent: () =>
          import('./leave-applications/leave-applications.component').then((m) => m.LeaveApplicationsComponent),
          
      },
      {
        path: 'recent-leaves',
        loadComponent: () =>
          import('./recent-leaves/recent-leaves.component').then((m) => m.RecentLeavesComponent),
          
      },
     
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AttendanceRoutingModule {
  static routes = routes;

 }
