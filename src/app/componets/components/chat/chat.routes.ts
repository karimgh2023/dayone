import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: 'components/chat',
    children: [
      {
        path: 'chat01',
        loadComponent: () =>
          import('./chat01/chat01.component').then((m) => m.Chat01Component),
          
      },
      {
        path: 'chat02',
        loadComponent: () =>
          import('./chat02/chat02.component').then((m) => m.Chat02Component),
          
      },
      {
        path: 'chat03',
        loadComponent: () =>
          import('./chat03/chat03.component').then((m) => m.Chat03Component),
          
      },
     
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentChatRoutingModule { 
  static routes = routes;

}
