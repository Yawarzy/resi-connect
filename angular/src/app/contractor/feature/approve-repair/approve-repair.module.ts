import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ApproveRepairRoutingModule} from './approve-repair-routing.module';
import {ApproveRepairComponent} from './approve-repair.component';
import {PageModule} from "../../../shared/ui/layout/page/page.module";
import {NzGridModule} from "ng-zorro-antd/grid";
import {LightgalleryModule} from "lightgallery/angular";
import {NzTypographyModule} from "ng-zorro-antd/typography";
import {NzInputModule} from "ng-zorro-antd/input";
import {ReactiveFormsModule} from "@angular/forms";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzAlertModule} from "ng-zorro-antd/alert";
import {NzNotificationModule} from "ng-zorro-antd/notification";
import {NzCardModule} from "ng-zorro-antd/card";
import {PerfectScrollbarModule} from "ngx-perfect-scrollbar";
import {NzTabsModule} from "ng-zorro-antd/tabs";
import {NzRadioModule} from "ng-zorro-antd/radio";
import {NzFormModule} from "ng-zorro-antd/form";
import {NzIconModule} from "ng-zorro-antd/icon";


@NgModule({
  declarations: [
    ApproveRepairComponent
  ],
  imports: [
    CommonModule,
    ApproveRepairRoutingModule,
    PageModule,
    NzGridModule,
    LightgalleryModule,
    NzTypographyModule,
    NzInputModule,
    ReactiveFormsModule,
    NzButtonModule,
    NzAlertModule,
    NzNotificationModule,
    NzCardModule,
    PerfectScrollbarModule,
    NzTabsModule,
    NzRadioModule,
    NzFormModule,
    NzIconModule,
  ]
})
export class ApproveRepairModule { }
