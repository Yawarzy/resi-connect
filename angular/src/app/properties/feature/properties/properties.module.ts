import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PropertiesRoutingModule} from './properties-routing.module';
import {PropertiesComponent} from './properties.component';
import {FilterModule} from "../../../shared/ui/layout/filter/filter.module";
import {PageModule} from "../../../shared/ui/layout/page/page.module";
import {PropertyModule} from "../../ui/property/property.module";


@NgModule({
  declarations: [
    PropertiesComponent
  ],
  imports: [
    CommonModule,
    PropertiesRoutingModule,
    FilterModule,
    PageModule,
    PropertyModule
  ],
  exports: [
    PropertiesComponent
  ]
})
export class PropertiesModule {
}
