import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PropertyComponent} from "./property.component";
import {RouterLink} from "@angular/router";


@NgModule({
  declarations: [PropertyComponent],
  imports: [
    CommonModule,
    RouterLink
  ],
  exports: [
    PropertyComponent
  ]
})
export class PropertyModule {
}
