import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ContractUploadRoutingModule} from './contract-upload-routing.module';
import {ContractUploadComponent} from './contract-upload.component';
import {PageModule} from "../../../shared/ui/layout/page/page.module";
import {NzFormModule} from "ng-zorro-antd/form";
import {NzGridModule} from "ng-zorro-antd/grid";
import {NzInputModule} from "ng-zorro-antd/input";
import {ReactiveFormsModule} from "@angular/forms";
import {NzButtonModule} from "ng-zorro-antd/button";


@NgModule({
  declarations: [
    ContractUploadComponent
  ],
  imports: [
    CommonModule,
    ContractUploadRoutingModule,
    PageModule,
    NzFormModule,
    NzGridModule,
    NzInputModule,
    ReactiveFormsModule,
    NzButtonModule
  ]
})
export class ContractUploadModule {
}
