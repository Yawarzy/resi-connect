import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthLoginFormComponent} from "./auth-login-form.component";
import {UnauthGuard} from "../../util/UnauthGuard";

const routes: Routes = [
  {
    path: '',
    component: AuthLoginFormComponent,
    canActivate: [UnauthGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthLoginFormRoutingModule {
}
