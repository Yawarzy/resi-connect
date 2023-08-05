import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PropertyDetailsRoutingModule} from './property-details-routing.module';
import {PropertyDetailsComponent} from "./property-details.component";
import {PageModule} from "../../../shared/ui/layout/page/page.module";
import {LightgalleryModule} from "lightgallery/angular";


@NgModule({
  declarations: [PropertyDetailsComponent],
  imports: [
    CommonModule,
    PropertyDetailsRoutingModule,
    PageModule,
    LightgalleryModule
  ],
  exports: [PropertyDetailsComponent]
})
export class PropertyDetailsModule {
}
