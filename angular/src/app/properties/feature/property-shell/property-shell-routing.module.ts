import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('../properties/properties.module').then(m => m.PropertiesModule)
  },
  {
    path: ':id',
    loadChildren: () => import('../property-details/property-details.module').then(m => m.PropertyDetailsModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PropertyShellRoutingModule {
}
