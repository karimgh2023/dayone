import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusBadgeComponent } from './status-badge/status-badge.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { TypeBadgeComponent } from './type-badge/type-badge.component';
import { LoadingIndicatorComponent } from './loading-indicator/loading-indicator.component';
import { ErrorAlertComponent } from './error-alert/error-alert.component';
import { StatisticCardComponent } from './statistic-card/statistic-card.component';
import { ReportFilterComponent } from './report-filter/report-filter.component';
import { PaginationComponent } from './pagination/pagination.component';
import { ReportActionsComponent } from './report-actions/report-actions.component';
import { ReportDetailsComponent } from './report-details/report-details.component';
import { NoDataComponent } from './no-data/no-data.component';
import { DataTableComponent } from './data-table/data-table.component';

@NgModule({
  imports: [
    CommonModule,
    StatusBadgeComponent,
    UserInfoComponent,
    TypeBadgeComponent,
    LoadingIndicatorComponent,
    ErrorAlertComponent,
    StatisticCardComponent,
    ReportFilterComponent,
    PaginationComponent,
    ReportActionsComponent,
    ReportDetailsComponent,
    NoDataComponent,
    DataTableComponent
  ],
  exports: [
    StatusBadgeComponent,
    UserInfoComponent,
    TypeBadgeComponent,
    LoadingIndicatorComponent,
    ErrorAlertComponent,
    StatisticCardComponent,
    ReportFilterComponent,
    PaginationComponent,
    ReportActionsComponent,
    ReportDetailsComponent,
    NoDataComponent,
    DataTableComponent
  ]
})
export class ReportsSharedModule { } 