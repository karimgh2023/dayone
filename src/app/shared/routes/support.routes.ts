import { NgModule } from '@angular/core';
import {   RouterModule, Routes } from '@angular/router';
import { AdminRoutingModule } from '../../componets/support-system/admin/admin.routes';
import { AgentRoutingModule } from '../../componets/support-system/agent/agent.routes';
import { LandingPagesRoutingModule } from '../../componets/support-system/landing-pages/landing-pages.routes';
import { UserPagesRoutingModule } from '../../componets/support-system/user-pages/user-pages.routes';
import { TicketsRoutingModule } from '../../componets/support-system/user-pages/tickets/tickets.routes';
import { AdminTicketsRoutingModule } from '../../componets/support-system/admin/tickets/tickets.routes';
import { AgentTicketsRoutingModule } from '../../componets/support-system/agent/tickets/tickets.routes';




export const support: Routes = [

  { path: '', children: [
    ...AdminRoutingModule.routes,
    ...AgentRoutingModule.routes,
    ...LandingPagesRoutingModule.routes,
    ...UserPagesRoutingModule.routes,
    ...TicketsRoutingModule.routes,
    ...AdminTicketsRoutingModule.routes,
    ...AgentTicketsRoutingModule.routes,

  ]}

  
];


@NgModule({
  imports: [RouterModule.forRoot(support)],
  exports: [RouterModule]
})
export class SaredRoutingModule { }