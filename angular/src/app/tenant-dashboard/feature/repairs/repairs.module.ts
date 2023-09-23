import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {RepairsRoutingModule} from './repairs-routing.module';
import {RepairsComponent} from './repairs.component';
import {NzGridModule} from "ng-zorro-antd/grid";
import {NzTypographyModule} from "ng-zorro-antd/typography";
import {NzStepsModule} from "ng-zorro-antd/steps";
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzFormModule} from "ng-zorro-antd/form";
import {NzSelectModule} from "ng-zorro-antd/select";
import {ReactiveFormsModule} from "@angular/forms";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzWaveModule} from "ng-zorro-antd/core/wave";
import {NzListModule} from "ng-zorro-antd/list";
import {NzBreadCrumbModule} from "ng-zorro-antd/breadcrumb";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzModalModule} from "ng-zorro-antd/modal";


@NgModule({
  declarations: [
    RepairsComponent
  ],
  imports: [
    CommonModule,
    RepairsRoutingModule,
    NzGridModule,
    NzTypographyModule,
    NzStepsModule,
    NzIconModule,
    NzFormModule,
    NzSelectModule,
    ReactiveFormsModule,
    NzButtonModule,
    NzWaveModule,
    NzListModule,
    NzBreadCrumbModule,
    NzInputModule,
    NzModalModule,
  ]
})
export class RepairsModule { }
