import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DashboardOverviewRoutingModule} from './dashboard-overview-routing.module';
import {DashboardOverviewComponent} from './dashboard-overview.component';
import {NzTypographyModule} from "ng-zorro-antd/typography";
import {NzFormModule} from "ng-zorro-antd/form";
import {NzDividerModule} from "ng-zorro-antd/divider";
import {NzCardModule} from "ng-zorro-antd/card";
import {NzInputModule} from "ng-zorro-antd/input";
import {ReactiveFormsModule} from "@angular/forms";
import {NzTabsModule} from "ng-zorro-antd/tabs";
import {NzDatePickerModule} from "ng-zorro-antd/date-picker";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzIconModule} from "ng-zorro-antd/icon";


@NgModule({
  declarations: [
    DashboardOverviewComponent
  ],
  imports: [
    CommonModule,
    DashboardOverviewRoutingModule,
    NzTypographyModule,
    NzFormModule,
    NzDividerModule,
    NzCardModule,
    NzInputModule,
    ReactiveFormsModule,
    NzTabsModule,
    NzDatePickerModule,
    NzButtonModule,
    NzIconModule,
  ]
})
export class DashboardOverviewModule {
}
