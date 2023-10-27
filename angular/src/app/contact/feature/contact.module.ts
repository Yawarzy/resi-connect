import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ContactRoutingModule} from './contact-routing.module';
import {ContactComponent} from "./contact.component";
import {PageModule} from "../../shared/ui/layout/page/page.module";
import {NzTypographyModule} from "ng-zorro-antd/typography";
import {NzFormModule} from "ng-zorro-antd/form";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzButtonModule} from "ng-zorro-antd/button";
import {ReactiveFormsModule} from "@angular/forms";
import {InputModule} from "../../shared/ui/form/input/input.module";


@NgModule({
  declarations: [ContactComponent],
  imports: [
    CommonModule,
    ContactRoutingModule,
    PageModule,
    NzTypographyModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    ReactiveFormsModule,
    InputModule
  ],
  exports: [ContactComponent]
})
export class ContactModule {
}
