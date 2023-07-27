import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ClientRoutingModule} from './client-routing.module';
import {HomeComponent} from './pages/home/home.component';
import {PropertiesComponent} from './pages/properties/properties.component';
import {ContactComponent} from './pages/contact/contact.component';
import {SharedModule} from "../shared/shared.module";


@NgModule({
  declarations: [
    HomeComponent,
    PropertiesComponent,
    ContactComponent
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    SharedModule
  ]
})
export class ClientModule {
}
