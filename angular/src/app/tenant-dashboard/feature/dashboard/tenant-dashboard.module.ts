import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TenantDashboardRoutingModule} from './tenant-dashboard-routing.module';
import {TenantDashboardComponent} from './tenant-dashboard.component';
import {NzMenuModule} from "ng-zorro-antd/menu";
import {NzLayoutModule} from "ng-zorro-antd/layout";
import {NzBreadCrumbModule} from "ng-zorro-antd/breadcrumb";
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzDropDownModule} from "ng-zorro-antd/dropdown";
import {NzButtonModule} from "ng-zorro-antd/button";
import {PerfectScrollbarModule} from "ngx-perfect-scrollbar";
import {DashboardModule} from "../../../shared/ui/dashboard/dashboard.module";


@NgModule({
  declarations: [
    TenantDashboardComponent
  ],
  imports: [
    CommonModule,
    TenantDashboardRoutingModule,
    NzMenuModule,
    NzLayoutModule,
    NzBreadCrumbModule,
    NzIconModule,
    NzDropDownModule,
    NzButtonModule,
    PerfectScrollbarModule,
    DashboardModule,
  ]
})
export class TenantDashboardModule {
}
