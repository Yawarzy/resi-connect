import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: 'approve-repair',
    loadChildren: () => import('../approve-repair/approve-repair.module').then(m => m.ApproveRepairModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContractorShellRoutingModule { }
