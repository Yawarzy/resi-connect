import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LandlordDashboardComponent} from "./landlord-dashboard.component";

const routes: Routes = [
  {
    path: '',
    component: LandlordDashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandlordDashboardRoutingModule {
}
