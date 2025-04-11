import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: 'components/user-list',
    children: [
      {
        path: 'user-list01',
        loadComponent: () =>
          import('./user-list01/user-list01.component').then((m) => m.UserList01Component),
          
      },
      {
        path: 'user-list02',
        loadComponent: () =>
          import('./user-list02/user-list02.component').then((m) => m.UserList02Component),
          
      },
      {
        path: 'user-list03',
        loadComponent: () =>
          import('./user-list03/user-list03.component').then((m) => m.UserList03Component),
          
      },

      {
        path: 'user-list01',
        loadComponent: () =>
          import('./user-list01/user-list01.component').then((m) => m.UserList01Component),
          
      },
      {
        path: 'user-list04',
        loadComponent: () =>
          import('./user-list04/user-list04.component').then((m) => m.UserList04Component),
          
      },
    
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserListRoutingModule {
  static routes = routes;

 }
