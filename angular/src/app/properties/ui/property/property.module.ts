import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PropertyComponent} from "./property.component";
import {RouterLink} from "@angular/router";
import {NzFormModule} from "ng-zorro-antd/form";
import {NzTagModule} from "ng-zorro-antd/tag";
import {NzCardModule} from "ng-zorro-antd/card";


@NgModule({
  declarations: [PropertyComponent],
  imports: [
    CommonModule,
    RouterLink,
    NzFormModule,
    NzTagModule,
    NzCardModule
  ],
  exports: [
    PropertyComponent
  ]
})
export class PropertyModule {
}
