import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FooterComponent} from "./footer.component";
import {RouterLinkWithHref} from "@angular/router";


@NgModule({
  declarations: [FooterComponent],
  imports: [
    CommonModule,
    RouterLinkWithHref
  ],
  exports: [FooterComponent]
})
export class FooterModule {
}
