import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'pages/invoice',
    children: [
      {
        path: 'invoice-list',
        loadComponent: () =>
          import('./invoice-list/invoice-list.component').then((m) => m.InvoiceListComponent),  
      },
      {
        path: 'invoice01',
        loadComponent: () =>
          import('./invoice01/invoice01.component').then((m) => m.Invoice01Component),  
      },
      {
        path: 'invoice02',
        loadComponent: () =>
          import('./invoice02/invoice02.component').then((m) => m.Invoice02Component),  
      },
      {
        path: 'invoice03',
        loadComponent: () =>
          import('./invoice03/invoice03.component').then((m) => m.Invoice03Component),  
      },
      {
        path: 'add-invoice',
        loadComponent: () =>
          import('./add-invoice/add-invoice.component').then((m) => m.AddInvoiceComponent),  
      },
      {
        path: 'edit-invoice',
        loadComponent: () =>
          import('./edit-invoice/edit-invoice.component').then((m) => m.EditInvoiceComponent),  
      },
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoiceRoutingModule {
  static routes = routes;

 }
