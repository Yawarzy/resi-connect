import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EnquiryFormComponent} from "./enquiry-form.component";

const routes: Routes = [
  {
    path: '',
    component: EnquiryFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EnquiryFormRoutingModule {
}
