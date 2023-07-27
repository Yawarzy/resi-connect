import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {NAV_ITEMS, NavItem} from "../../constants";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  navItems: NavItem[] = NAV_ITEMS;
  activeItem: NavItem | undefined;

  constructor(private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute.url.subscribe(url => {
      if (url.length === 0) {
        this.activeItem = this.navItems[0];
        return;
      }
      console.log(url);
      const path = '/' + url[0].path;
      this.activeItem = this.navItems.find(item => item.path === path);
    });
  }
}
