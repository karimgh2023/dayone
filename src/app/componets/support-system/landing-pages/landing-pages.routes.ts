import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: 'support-system/landing-pages',
    children: [
      {
        path: 'landing-page',
        loadComponent: () =>
          import('./landing-page/landing-page.component').then((m) => m.LandingPageComponent),  
      },
        {
        path: 'knowledge-page',
        loadComponent: () =>
          import('./knowledge-page/knowledge-page.component').then((m) => m.KnowledgePageComponent),  
      },
      {
        path: 'knowledge-view',
        loadComponent: () =>
          import('./knowledge-view/knowledge-view.component').then((m) => m.KnowledgeViewComponent),  
      },
      {
        path: 'support-contact',
        loadComponent: () =>
          import('./support-contact/support-contact.component').then((m) => m.SupportContactComponent),  
      },
      {
        path: 'support-open-ticket',
        loadComponent: () =>
          import('./support-open-ticket/support-open-ticket.component').then((m) => m.SupportOpenTicketComponent),  
      },
     
  
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandingPagesRoutingModule {
  static routes = routes;

 }
