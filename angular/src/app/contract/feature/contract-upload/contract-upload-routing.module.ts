import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ContractUploadComponent} from "./contract-upload.component";

const routes: Routes = [
  {
    path: 'upload/:slug',
    component: ContractUploadComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContractUploadRoutingModule {
}
