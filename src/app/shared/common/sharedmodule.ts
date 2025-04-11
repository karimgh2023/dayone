import { SupportHeaderComponent } from './support-header/support-header.component';
import { FlatpickrDefaults, FlatpickrModule } from 'angularx-flatpickr';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { PageHeaderComponent } from './page-header/page-header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SwitcherComponent } from './switcher/switcher.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ColorPickerModule } from 'ngx-color-picker';
import { MainLayoutComponent } from '../layouts/main-layout/main-layout.component';
import { AuthenticationLayoutComponent } from '../layouts/authentication-layout/authentication-layout.component';
import { FullscreenDirective } from '../directives/fullscreen.directive';
import { TapToTopComponent } from "./tap-to-top/tap-to-top.component";
import { HoverEffectSidebarDirective } from '../directives/hover-effect-sidebar.directive';
import { DropdownPositionDirective } from '../directives/dropdown-position.directive';
import { FooterComponent } from './footer/footer.component';
import { CustomHeaderComponent } from './custom-header/custom-header.component';
import { OverlayscrollbarsModule } from "overlayscrollbars-ngx";
import { HrDashboardPageHeaderModalComponent } from './page-headers/hr-dashboard-page-header-modal/hr-dashboard-page-header-modal.component';
import { HrDashboardPageHeaderComponent } from './page-headers/hr-dashboard-page-header/hr-dashboard-page-header.component';
import { JobDashboardPageHeaderModalComponent } from './page-headers/job-dashboard-page-header-modal/job-dashboard-page-header-modal.component';
import { JobDashboardPageHeaderComponent } from './page-headers/job-dashboard-page-header/job-dashboard-page-header.component';
import { TaskDashboardPageHeaderComponent } from './page-headers/task-dashboard-page-header/task-dashboard-page-header.component';
import { MaterialModuleModule } from '../../material-module/material-module.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { SupportSystemComponent } from '../layouts/support-system/support-system.component';
import { NgxColorsModule } from 'ngx-colors';
import { SupportSwitcherComponent } from './support-switcher/support-switcher.component';
import { RightSidebarComponent } from './right-sidebar/right-sidebar.component';
import { SupportFooterComponent } from './support-footer/support-footer.component';
import { SupportSidebarComponent } from './support-sidebar/support-sidebar.component';
import { SupportPageHeaderComponent } from './page-headers/support-page-header/support-page-header.component';
import { LiveChatComponent } from './live-chat/live-chat.component';

@NgModule({
    declarations: [
        PageHeaderComponent,
        SidebarComponent,
        MainLayoutComponent, AuthenticationLayoutComponent, SwitcherComponent, HeaderComponent, TapToTopComponent,
        FooterComponent, CustomHeaderComponent, HrDashboardPageHeaderComponent,
        HrDashboardPageHeaderModalComponent,
        TaskDashboardPageHeaderComponent,
        JobDashboardPageHeaderComponent,
        JobDashboardPageHeaderModalComponent,SupportSystemComponent,SupportHeaderComponent,SupportSwitcherComponent,RightSidebarComponent,
        SupportFooterComponent,SupportSidebarComponent,SupportPageHeaderComponent,LiveChatComponent
    ],
    exports: [
        PageHeaderComponent,
        SidebarComponent, SwitcherComponent, HeaderComponent, FooterComponent, CustomHeaderComponent, TapToTopComponent, HrDashboardPageHeaderComponent,RightSidebarComponent,
        HrDashboardPageHeaderModalComponent,
        TaskDashboardPageHeaderComponent,
        JobDashboardPageHeaderComponent,
        JobDashboardPageHeaderModalComponent,SupportSystemComponent,SupportSwitcherComponent,SupportFooterComponent,SupportSidebarComponent,SupportPageHeaderComponent,LiveChatComponent
    ],
    imports: [
        CommonModule,
        NgbModule,
        OverlayscrollbarsModule,
        ColorPickerModule,
        FormsModule, ReactiveFormsModule,
        RouterModule, FullscreenDirective,
        HoverEffectSidebarDirective, DropdownPositionDirective,MaterialModuleModule,NgSelectModule,FormsModule,FlatpickrModule,NgxColorsModule,
        
    ],
    providers: [
        FlatpickrDefaults,
      ],
})
export class SharedModule { }
