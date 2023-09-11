import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {NAV_ITEMS, NavItem} from "../../../util";
import {AuthService} from "../../../../auth/data-access/auth.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  navItems: NavItem[] = NAV_ITEMS;
  activeItem: NavItem | undefined;

  @Input() showNavItems: boolean = true;

  constructor(private router: Router, public authService: AuthService) {
  }

  ngOnInit(): void {
    const url = this.router.url;
    this.activeItem = this.navItems.find(item => item.path === url);
  }

  navigateToLogin() {
    this.router.navigate(['/auth/login']);
  }

  logout() {
    this.authService.logout()

  }
}
