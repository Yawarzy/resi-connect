import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {NAV_ITEMS, NavItem} from "../../../util";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  navItems: NavItem[] = NAV_ITEMS;
  activeItem: NavItem | undefined;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    const url = this.router.url;
    this.activeItem = this.navItems.find(item => item.path === url);
  }
}
