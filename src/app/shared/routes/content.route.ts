import { NgModule } from '@angular/core';
import {  RouterModule, Routes } from '@angular/router';

import { ReportDashboardRoutingModule } from '../../componets/dashbord/report-dashboard/report-dashboard.routes';
import { ProtocolDashboardRoutingModule } from '../../componets/dashbord/protocol-dashboard/protocol-dashboard.routes';
import { SuperAdminRoutingModule } from '../../componets/dashbord/super-admin/super-admin.routes';
import { ChatRoutingModule } from '../../componets/chat/chat.routes';
import { AdminRoutingModule } from '../../componets/admin/admin.routes';

import { BlogRoutingModule } from '../../componets/pages/blog/blog.routes';
import { EmailRoutingModule } from '../../componets/pages/email/email.routes';
import { InvoiceRoutingModule } from '../../componets/pages/invoice/invoice.routes';
import { utilitiesRoutingModule } from '../../componets/pages/utilities/utilities.route';
import { ProfileRoutingModule } from '../../componets/pages/profile/profile.routes';
import { PagesRoutingModule } from '../../componets/pages/pages.routes';
import { PricingRoutingModule } from '../../componets/pages/pricing/pricing.routes';
import { DepartmentDashboardRoutingModule } from '@/app/componets/dashbord/department-dashboard/department-dashboard.routes';
import { EmployessRoutingModule } from '@/app/componets/dashbord/employess-dashboard/employess.routes';
import { CompanyDashboardRoutingModule } from '@/app/componets/dashbord/companies-dashboard/company-dashboard.routes';


export const content: Routes = [

  { path: '', children: [
   
    ...SuperAdminRoutingModule.routes,
    ...ReportDashboardRoutingModule.routes,
    ...ProtocolDashboardRoutingModule.routes,
    ...DepartmentDashboardRoutingModule.routes,
    ...CompanyDashboardRoutingModule.routes,
    ...EmployessRoutingModule.routes,
    ...ChatRoutingModule.routes,
    ...AdminRoutingModule.routes,
   
    ...BlogRoutingModule.routes,
    ...EmailRoutingModule.routes,
    ...InvoiceRoutingModule.routes,
    ...utilitiesRoutingModule.routes,
    ...ProfileRoutingModule.routes,
    ...PagesRoutingModule.routes,
    ...PricingRoutingModule.routes,


  ]}

  
];

@NgModule({
  imports: [RouterModule.forRoot(content)],
  exports: [RouterModule]
})
export class SaredRoutingModule { }