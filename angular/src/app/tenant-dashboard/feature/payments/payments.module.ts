import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PaymentsRoutingModule} from './payments-routing.module';
import {PaymentsComponent} from './payments.component';
import {NzGridModule} from "ng-zorro-antd/grid";
import {NzTypographyModule} from "ng-zorro-antd/typography";
import {NzCardModule} from "ng-zorro-antd/card";
import {NzNotificationModule} from "ng-zorro-antd/notification";
import {NzTableModule} from "ng-zorro-antd/table";
import {PerfectScrollbarModule} from "ngx-perfect-scrollbar";
import {NzIconModule} from "ng-zorro-antd/icon";


@NgModule({
  declarations: [
    PaymentsComponent
  ],
  imports: [
    CommonModule,
    PaymentsRoutingModule,
    NzGridModule,
    NzTypographyModule,
    NzCardModule,
    NzNotificationModule,
    NzTableModule,
    PerfectScrollbarModule,
    NzIconModule,
  ]
})
export class PaymentsModule { }
