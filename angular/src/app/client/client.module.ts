import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ClientRoutingModule} from './client-routing.module';
import {HomeComponent} from './pages/home/home.component';
import {PropertiesComponent} from './pages/properties/properties.component';
import {ContactComponent} from './pages/contact/contact.component';
import {SharedModule} from "../shared/shared.module";
import {NzButtonModule} from "ng-zorro-antd/button";
import {PropertyComponent} from './_components/property/property.component';


@NgModule({
  declarations: [
    HomeComponent,
    PropertiesComponent,
    ContactComponent,
    PropertyComponent
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    SharedModule,
    NzButtonModule,
  ]
})
export class ClientModule {
}
