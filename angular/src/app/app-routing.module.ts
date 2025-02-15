import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from "./auth/util/auth-guard";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/feature/home.module').then(m => m.HomeModule)
  },
  {
    path: 'properties',
    loadChildren: () => import('./properties/feature/property-shell/property-shell.module').then(m => m.PropertyShellModule)
  },
  {
    path: 'enquiry',
    loadChildren: () => import('./enquiry/feature/enquiry-shell/enquiry-shell.module').then(m => m.EnquiryShellModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/feature/auth-shell/auth-shell.module').then(m => m.AuthShellModule)
  },
  {
    path: 'contract',
    loadChildren: () => import('./contract/feature/contract-shell/contract-shell.module').then(m => m.ContractShellModule)
  },
  {
    path: 'contact',
    loadChildren: () => import('./contact/feature/contact.module').then(m => m.ContactModule),
  },
  {
    path: 'tenant',
    loadChildren: () => import('./tenant-dashboard/feature/tenant-dashboard-shell/tenant-dashboard-shell.module').then(m => m.TenantDashboardShellModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'contractor',
    loadChildren: () => import('./contractor/feature/contractor-shell/contractor-shell.module').then(m => m.ContractorShellModule),
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
