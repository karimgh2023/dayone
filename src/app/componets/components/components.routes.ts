import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: 'components',
    children: [
      {
        path: 'calendar',
        loadComponent: () =>
          import('./calendar/calendar.component').then((m) => m.CalendarComponent),
          
    },
    {
      path: 'dragula-card',
      loadComponent: () =>
        import('./dragula-card/dragula-card.component').then((m) => m.DragulaCardComponent),
        
  },
  {
    path: 'page-sessiontimeout',
    loadComponent: () =>
      import('./page-session-timeout/page-session-timeout.component').then((m) => m.PageSessionTimeoutComponent),
      
},
{
  path: 'notifications',
  loadComponent: () =>
    import('./notifications/notifications.component').then((m) => m.NotificationsComponent),
    
},
{
  path: 'sweet-alerts',
  loadComponent: () =>
    import('./sweet-alerts/sweet-alerts.component').then((m) => m.SweetAlertsComponent),
    
},
{
  path: 'counters',
  loadComponent: () =>
    import('./counters/counters.component').then((m) => m.CountersComponent),
    
},
{
  path: 'time-line',
  loadComponent: () =>
    import('./time-line/time-line.component').then((m) => m.TimeLineComponent),
    
},
{
  path: 'rating',
  loadComponent: () =>
    import('./rating/rating.component').then((m) => m.RatingComponent),
    
},
{
  path: 'ribbons',
  loadComponent: () =>
    import('./ribbons/ribbons.component').then((m) => m.RibbonsComponent),
    
},
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentsRoutingModule { 
  static routes = routes;

}
