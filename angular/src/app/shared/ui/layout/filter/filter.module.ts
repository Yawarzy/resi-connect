import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FilterComponent} from "./filter.component";
import {SelectFieldModule} from "../../form/select-field/select-field.module";
import {NzSliderModule} from "ng-zorro-antd/slider";
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [FilterComponent],
  imports: [
    CommonModule,
    SelectFieldModule,
    NzSliderModule,
    FormsModule
  ],
  exports: [FilterComponent]
})
export class FilterModule {
}
