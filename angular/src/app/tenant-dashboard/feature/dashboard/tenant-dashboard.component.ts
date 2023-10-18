import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../auth/data-access/auth.service";
import {Router} from "@angular/router";
import {NavItem} from "../../../shared";

@Component({
  selector: 'app-tenant-dashboard',
  templateUrl: './tenant-dashboard.component.html',
  styleUrls: ['./tenant-dashboard.component.scss']
})
export class TenantDashboardComponent implements OnInit {

  navItems: NavItem[] = [
    {
      path: '/tenant/dashboard/overview',
      label: 'Dashboard',
      icon: 'home'
    },
    {
      path: '/tenant/dashboard/profile',
      label: 'Profile',
      icon: 'profile'
    },
    {
      path: '/tenant/dashboard/payments',
      label: 'Payments',
      icon: 'money-collect'
    },
    {
      path: '/tenant/dashboard/repairs',
      label: 'Repairs',
      icon: 'tool'
    }
  ]

  constructor(public authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }

}
