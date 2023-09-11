import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NavbarComponent} from "./navbar.component";
import {RouterLinkWithHref} from "@angular/router";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzIconModule} from "ng-zorro-antd/icon";


@NgModule({
  declarations: [NavbarComponent],
  imports: [
    CommonModule,
    RouterLinkWithHref,
    NzButtonModule,
    NzIconModule
  ],
  exports: [NavbarComponent]
})
export class NavbarModule {
}
