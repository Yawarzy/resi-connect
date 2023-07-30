import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NavbarComponent} from './components/navbar/navbar.component';
import {PageComponent} from './components/page/page.component';
import {FooterComponent} from './components/footer/footer.component';
import {RouterLinkWithHref} from "@angular/router";
import {SelectFieldComponent} from './components/form/select-field/select-field.component';
import {NzSelectModule} from "ng-zorro-antd/select";
import {FormsModule} from "@angular/forms";
import {FilterComponent} from './components/filter/filter.component';
import {NzSliderModule} from "ng-zorro-antd/slider";


@NgModule({
  declarations: [
    NavbarComponent,
    PageComponent,
    FooterComponent,
    SelectFieldComponent,
    FilterComponent
  ],
  exports: [
    PageComponent,
    SelectFieldComponent,
    FilterComponent
  ],
  imports: [
    CommonModule,
    RouterLinkWithHref,
    NzSelectModule,
    FormsModule,
    NzSliderModule
  ]
})
export class SharedModule {
}
