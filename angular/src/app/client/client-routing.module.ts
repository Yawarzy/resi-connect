import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {ContactComponent} from "./pages/contact/contact.component";
import {PropertiesComponent} from "./pages/properties/properties.component";
import {PropertyDetailsComponent} from "./pages/property-details/property-details.component";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'contact',
    component: ContactComponent
  },
  {
    path: 'properties',
    component: PropertiesComponent
  },
  {
    path: 'property/:id',
    component: PropertyDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule {
}
