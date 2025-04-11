import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: 'components/contact',
    children: [
      {
        path: 'contact-list01',
        loadComponent: () =>
          import('./contact-list01/contact-list01.component').then((m) => m.ContactList01Component),
          
      },
      {
        path: 'contact-list02',
        loadComponent: () =>
          import('./contact-list02/contact-list02.component').then((m) => m.ContactList02Component),
          
      },
     
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactRoutingModule { 
  static routes = routes;

}
