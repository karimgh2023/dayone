import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: 'pages/profile',
    children: [
      {
        path: 'profile01',
        loadComponent: () =>
          import('./profiles01/profiles01.component').then((m) => m.Profiles01Component),  
      },
      {
        path: 'profile02',
        loadComponent: () =>
          import('./profiles02/profiles02.component').then((m) => m.Profiles02Component),  
      },
      {
        path: 'profile03',
        loadComponent: () =>
          import('./profiles03/profiles03.component').then((m) => m.Profiles03Component),  
      },
    
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { 
  static routes = routes;

}
