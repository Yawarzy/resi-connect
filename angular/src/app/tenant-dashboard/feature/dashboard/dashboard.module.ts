import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DashboardRoutingModule} from './dashboard-routing.module';
import {DashboardComponent} from './dashboard.component';
import {NzMenuModule} from "ng-zorro-antd/menu";
import {NzLayoutModule} from "ng-zorro-antd/layout";
import {NzBreadCrumbModule} from "ng-zorro-antd/breadcrumb";
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzDropDownModule} from "ng-zorro-antd/dropdown";
import {NzButtonModule} from "ng-zorro-antd/button";
import {PerfectScrollbarModule} from "ngx-perfect-scrollbar";


@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NzMenuModule,
    NzLayoutModule,
    NzBreadCrumbModule,
    NzIconModule,
    NzDropDownModule,
    NzButtonModule,
    PerfectScrollbarModule,
  ]
})
export class DashboardModule {
}
