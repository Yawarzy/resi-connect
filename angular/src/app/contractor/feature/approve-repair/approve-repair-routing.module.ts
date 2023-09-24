import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ApproveRepairComponent} from "./approve-repair.component";

const routes: Routes = [
  {
    path:':slug',
    component: ApproveRepairComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApproveRepairRoutingModule { }
