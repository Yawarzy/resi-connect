import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from "./dashboard.component";

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'overview',
        loadChildren: () => import('../dashboard-overview/dashboard-overview.module').then(m => m.DashboardOverviewModule),
      },
      {
        path: 'profile',
        loadChildren: () => import('../profile/profile.module').then(m => m.ProfileModule),
      },
      {
        path: 'payments',
        loadChildren: () => import('../payments/payments.module').then(m => m.PaymentsModule),
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {
}
