import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TenantDashboardComponent} from "./tenant-dashboard.component";

const routes: Routes = [
  {
    path: '',
    component: TenantDashboardComponent,
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
      },
      {
        path: 'repairs',
        loadChildren: () => import('../repairs/repairs.module').then(m => m.RepairsModule),
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TenantDashboardRoutingModule {
}
