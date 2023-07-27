import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NavbarComponent} from './components/navbar/navbar.component';
import {PageComponent} from './components/page/page.component';
import {FooterComponent} from './components/footer/footer.component';
import {RouterLinkWithHref} from "@angular/router";


@NgModule({
  declarations: [
    NavbarComponent,
    PageComponent,
    FooterComponent
  ],
  exports: [
    NavbarComponent,
    PageComponent
  ],
  imports: [
    CommonModule,
    RouterLinkWithHref
  ]
})
export class SharedModule {
}
