import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: 'pages/pricing',
    children: [
      {
        path: 'pricing01',
        loadComponent: () =>
          import('./pricing01/pricing01.component').then((m) => m.Pricing01Component),  
      },
      {
        path: 'pricing02',
        loadComponent: () =>
          import('./pricing02/pricing02.component').then((m) => m.Pricing02Component),  
      },
      {
        path: 'pricing03',
        loadComponent: () =>
          import('./pricing03/pricing03.component').then((m) => m.Pricing03Component),  
      },
    
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PricingRoutingModule {
  static routes = routes;

 }
