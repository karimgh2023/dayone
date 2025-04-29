import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProtocolSelectionComponent } from './protocol-selection/protocol-selection.component';
import { ProtocolCreateComponent } from './protocol-create/protocol-create.component';


const routes: Routes = [
  {
    path: 'dashboard/protocol-dashboard',
    children: [
      {
        path: 'selection',
        loadComponent: () => import('./protocol-selection/protocol-selection.component').then(m => m.ProtocolSelectionComponent),
        title: 'Protocol Selection'
      },
      {
        path: 'create',
        loadComponent: () => import('./protocol-create/protocol-create.component').then(m => m.ProtocolCreateComponent),
        title: 'Create Protocol'
      },
      {
        path: '',
        redirectTo: 'selection',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProtocolDashboardRoutingModule {
  static routes = routes;
}
