import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {HomeRoutingModule} from './home-routing.module';
import {HomeComponent} from './home.component';
import {SelectFieldModule} from "../../shared/ui/form/select-field/select-field.module";
import {PageModule} from "../../shared/ui/layout/page/page.module";
import {PropertyModule} from "../../properties/ui/property/property.module";
import {NzButtonModule} from "ng-zorro-antd/button";


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SelectFieldModule,
    PageModule,
    PropertyModule,
    NzButtonModule
  ],
  exports: [
    HomeComponent
  ]
})
export class HomeModule {
}
