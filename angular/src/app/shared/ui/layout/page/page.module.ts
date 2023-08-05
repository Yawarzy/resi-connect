import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PageComponent} from "./page.component";
import {NavbarModule} from "../navbar/navbar.module";
import {FooterModule} from "../footer/footer.module";


@NgModule({
  declarations: [PageComponent],
  imports: [
    CommonModule,
    NavbarModule,
    FooterModule
  ],
  exports: [PageComponent]
})
export class PageModule {
}
