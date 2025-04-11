import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: 'components/todo-list',
    children: [
      {
        path: 'todo-list01',
        loadComponent: () =>
          import('./todo-list01/todo-list01.component').then((m) => m.TodoList01Component),
          
      },
      {
        path: 'todo-list02',
        loadComponent: () =>
          import('./todo-list02/todo-list02.component').then((m) => m.TodoList02Component),
          
      },
      {
        path: 'todo-list03',
        loadComponent: () =>
          import('./todo-list03/todo-list03.component').then((m) => m.TodoList03Component),
          
      },

   
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TodoListRoutingModule {
  static routes = routes;

 }
