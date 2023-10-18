import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {AuthService} from "../data-access/auth.service";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let isLandlord = false;
    if (state.url.includes('landlord')) {
      isLandlord = true;
    }

    console.log({isLandlord});
    if (isLandlord) {
      if (this.authService.isLandlordLoggedIn()) {
        return true
      } else {
        this.router.navigate(['/auth/landlord/login'])
        return false;
      }

    } else {
      if (this.authService.isLoggedIn()) {
        return true;
      } else {
        this.router.navigate(['/auth/login'])
        return false;
      }
    }
  }
}
