import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

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
    path: 'contract',
    loadChildren: () => import('./contract/feature/contract-shell/contract-shell.module').then(m => m.ContractShellModule)
  },
  {
    path: 'contact',
    loadChildren: () => import('./contact/feature/contact.module').then(m => m.ContactModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
