import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogStylesComponent } from './blog-styles/blog-styles.component';
import { Blog01Component } from './blog01/blog01.component';
import { Blog02Component } from './blog02/blog02.component';
import { Blog03Component } from './blog03/blog03.component';

const routes: Routes = [
  {
    path: 'pages/blog',
    children: [
      {
        path: 'blog01',
        loadComponent: () =>
          import('./blog01/blog01.component').then((m) => m.Blog01Component),
          
      },
      {
        path: 'blog02',
        loadComponent: () =>
          import('./blog02/blog02.component').then((m) => m.Blog02Component),
          
      }, 
       {
        path: 'blog03',
        loadComponent: () =>
          import('./blog03/blog03.component').then((m) => m.Blog03Component),
          
      }, 
       {
        path: 'blog-styles',
        loadComponent: () =>
          import('./blog-styles/blog-styles.component').then((m) => m.BlogStylesComponent),
          
      },
     
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule {
  static routes = routes;

 }
