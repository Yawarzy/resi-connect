import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ContactRoutingModule} from './contact-routing.module';
import {ContactComponent} from "./contact.component";
import {PageModule} from "../../shared/ui/layout/page/page.module";


@NgModule({
  declarations: [ContactComponent],
  imports: [
    CommonModule,
    ContactRoutingModule,
    PageModule
  ],
  exports: [ContactComponent]
})
export class ContactModule {
}
