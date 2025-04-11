import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: 'support-system/admin/tickets',
    children: [
      {
        path: 'ticket-list',
        loadComponent: () =>
          import('./ticket-list/ticket-list.component').then((m) => m.TicketListComponent),  
      },
      {
        path: 'active-tickets',
        loadComponent: () =>
          import('./active-tickets/active-tickets.component').then((m) => m.ActiveTicketsComponent),  
      },
      {
        path: 'closed-tickets',
        loadComponent: () =>
          import('./closed-tickets/closed-tickets.component').then((m) => m.ClosedTicketsComponent),  
      },
      {
        path: 'new-tickets',
        loadComponent: () =>
          import('./new-tickets/new-tickets.component').then((m) => m.NewTicketsComponent),  
      },
      {
        path: 'view-ticket',
        loadComponent: () =>
          import('./view-tickets/view-tickets.component').then((m) => m.ViewTicketsComponent),  
      },

     
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminTicketsRoutingModule {
  static routes = routes;

 }
