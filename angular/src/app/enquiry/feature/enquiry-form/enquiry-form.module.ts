import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {EnquiryFormRoutingModule} from './enquiry-form-routing.module';
import {EnquiryFormComponent} from "./enquiry-form.component";
import {InputModule} from "../../../shared/ui/form/input/input.module";
import {PageModule} from "../../../shared/ui/layout/page/page.module";
import {ReactiveFormsModule} from "@angular/forms";
import {NzFormModule} from "ng-zorro-antd/form";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzDatePickerModule} from "ng-zorro-antd/date-picker";
import {NzUploadModule} from "ng-zorro-antd/upload";
import {NzSpinModule} from "ng-zorro-antd/spin";
import {NzSelectModule} from "ng-zorro-antd/select";


@NgModule({
  declarations: [
    EnquiryFormComponent
  ],
  imports: [
    CommonModule,
    EnquiryFormRoutingModule,
    InputModule,
    PageModule,
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzDatePickerModule,
    NzUploadModule,
    NzSpinModule,
    NzSelectModule
  ],
  exports: [
    EnquiryFormComponent
  ]
})
export class EnquiryFormModule {
}
