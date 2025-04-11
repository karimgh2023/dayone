import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'pages/email',
    children: [
      {
        path: 'email-compose',
        loadComponent: () =>
          import('./email-compose/email-compose.component').then((m) => m.EmailComposeComponent),  
      },
      {
        path: 'email-inbox',
        loadComponent: () =>
          import('./email-inbox/email-inbox.component').then((m) => m.EmailInboxComponent),  
      },
      {
        path: 'email-read',
        loadComponent: () =>
          import('./email-read/email-read.component').then((m) => m.EmailReadComponent),  
      },
    
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmailRoutingModule { 
  static routes = routes;

}
