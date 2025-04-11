import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'chat',
        loadComponent: () =>
          import('./chat/chat.component').then((m) => m.ChatComponent),
          
    },
     
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ChatRoutingModule { 
  static routes = routes;

}
