import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AuthLoginFormRoutingModule} from './auth-login-form-routing.module';
import {AuthLoginFormComponent} from './auth-login-form.component';
import {PageModule} from "../../../shared/ui/layout/page/page.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NzFormModule} from "ng-zorro-antd/form";
import {NzGridModule} from "ng-zorro-antd/grid";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzCardModule} from "ng-zorro-antd/card";


@NgModule({
  declarations: [
    AuthLoginFormComponent
  ],
  imports: [
    CommonModule,
    AuthLoginFormRoutingModule,
    PageModule,
    FormsModule,
    NzFormModule,
    NzGridModule,
    NzInputModule,
    ReactiveFormsModule,
    NzIconModule,
    NzButtonModule,
    NzCardModule,
  ]
})
export class AuthLoginFormModule {
}
