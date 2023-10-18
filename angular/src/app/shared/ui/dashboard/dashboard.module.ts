import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardComponent} from "./dashboard.component";
import {NzLayoutModule} from "ng-zorro-antd/layout";
import {NzMenuModule} from "ng-zorro-antd/menu";
import {RouterLinkWithHref, RouterOutlet} from "@angular/router";
import {NzIconModule} from "ng-zorro-antd/icon";
import {PerfectScrollbarModule} from "ngx-perfect-scrollbar";
import {NzButtonModule} from "ng-zorro-antd/button";


@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    NzLayoutModule,
    NzMenuModule,
    RouterLinkWithHref,
    NzIconModule,
    RouterOutlet,
    PerfectScrollbarModule,
    NzButtonModule
  ],
  exports: [
    DashboardComponent
  ]
})
export class DashboardModule {
}
