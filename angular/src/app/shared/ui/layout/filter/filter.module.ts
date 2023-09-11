import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FilterComponent} from "./filter.component";
import {SelectFieldModule} from "../../form/select-field/select-field.module";
import {NzSliderModule} from "ng-zorro-antd/slider";
import {FormsModule} from "@angular/forms";
import {NzMenuModule} from "ng-zorro-antd/menu";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzDropDownModule} from "ng-zorro-antd/dropdown";
import {NzSelectModule} from "ng-zorro-antd/select";
import {NzBadgeModule} from "ng-zorro-antd/badge";


@NgModule({
  declarations: [FilterComponent],
  imports: [
    CommonModule,
    SelectFieldModule,
    NzSliderModule,
    FormsModule,
    NzMenuModule,
    NzButtonModule,
    NzIconModule,
    NzDropDownModule,
    NzSelectModule,
    NzBadgeModule
  ],
  exports: [FilterComponent]
})
export class FilterModule {
}
