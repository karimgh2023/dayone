import { NgModule } from '@angular/core';
import {  RouterModule, Routes } from '@angular/router';
import { hrmdashboardRoutingModule } from '../../../app/componets/dashbord/hrmdashboards/hrmdashboards.routes';
import { EmployessRoutingModule } from '../../../app/componets/dashbord/hrmdashboards/employess/employess.routes';
import { AttendanceRoutingModule } from '../../componets/dashbord/hrmdashboards/attendance/attendance.routes';
import { PayrollRoutingModule } from '../../componets/dashbord/hrmdashboards/payroll/payroll.routes';
import { EmployeeDashboardRoutingModule } from '../../componets/dashbord/employee-dashboard/employee-dashboard.routes';
import { TaskDashboardRoutingModule } from '../../componets/dashbord/task-dashboard/task-dashboard.routes';
import { ProjectDashboardRoutingModule } from '../../componets/dashbord/project-dashboard/project-dashboard.routes';
import { ClientDashboardRoutingModule } from '../../componets/dashbord/client-dashboard/client-dashboard.routes';
import { JobDashboardRoutingModule } from '../../componets/dashbord/job-dashboard/job-dashboard.routes';
import { SuperAdminRoutingModule } from '../../componets/dashbord/super-admin/super-admin.routes';
import { ChatRoutingModule } from '../../componets/chat/chat.routes';
import { AdminRoutingModule } from '../../componets/admin/admin.routes';
import { ContactRoutingModule } from '../../componets/components/contact/contact.routes';
import { FileManagerRoutingModule } from '../../componets/components/file-manager/file-manager.routes';
import { TodoListRoutingModule } from '../../componets/components/todo-list/todo-list.routes';
import { UserListRoutingModule } from '../../componets/components/user-list/user-list.routes';
import { ComponentsRoutingModule } from '../../componets/components/components.routes';

import { BlogRoutingModule } from '../../componets/pages/blog/blog.routes';
import { EmailRoutingModule } from '../../componets/pages/email/email.routes';
import { InvoiceRoutingModule } from '../../componets/pages/invoice/invoice.routes';
import { utilitiesRoutingModule } from '../../componets/pages/utilities/utilities.route';
import { ProfileRoutingModule } from '../../componets/pages/profile/profile.routes';
import { PagesRoutingModule } from '../../componets/pages/pages.routes';
import { PricingRoutingModule } from '../../componets/pages/pricing/pricing.routes';
import { ComponentChatRoutingModule } from '../../componets/components/chat/chat.routes';
import { ReportDashboardRoutingModule } from '../../componets/dashbord/report-dashboard/report-dashboard.routes';




export const content: Routes = [

  { path: '', children: [
    ...hrmdashboardRoutingModule.routes,
    ...EmployessRoutingModule.routes,
    ...AttendanceRoutingModule.routes,
    ...PayrollRoutingModule.routes,
    ...EmployeeDashboardRoutingModule.routes,
    ...TaskDashboardRoutingModule.routes,
    ...ProjectDashboardRoutingModule.routes,
    ...ClientDashboardRoutingModule.routes,
    ...JobDashboardRoutingModule.routes,
    ...SuperAdminRoutingModule.routes,
    ...ReportDashboardRoutingModule.routes,
    ...ChatRoutingModule.routes,
    ...AdminRoutingModule.routes,
    ...ComponentChatRoutingModule.routes,
    ...ContactRoutingModule.routes,
    ...FileManagerRoutingModule.routes,
    ...TodoListRoutingModule.routes,
    ...UserListRoutingModule.routes,
    ...ComponentsRoutingModule.routes,
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