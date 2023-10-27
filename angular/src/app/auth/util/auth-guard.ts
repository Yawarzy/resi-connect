import {CanActivate, Router} from "@angular/router";
import {AuthService} from "../data-access/auth.service";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(): any {
    this.authService.isLoggedIn().subscribe((res: any) => {
      if (res.status === 'not authenticated') {
        this.router.navigate(['/auth/login']);
        return false;
      } else {
        return true;
      }
    });
  }
}
