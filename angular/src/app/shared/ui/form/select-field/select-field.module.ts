import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SelectFieldComponent} from "./select-field.component";
import {NzSelectModule} from "ng-zorro-antd/select";
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [SelectFieldComponent],
  imports: [
    CommonModule,
    NzSelectModule,
    FormsModule
  ],
  exports: [SelectFieldComponent]
})
export class SelectFieldModule {
}
