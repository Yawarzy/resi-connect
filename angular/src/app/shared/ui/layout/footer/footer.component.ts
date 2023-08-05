import {Component, OnInit} from '@angular/core';
import {NAV_ITEMS, NavItem} from "../../../util";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  navItems: NavItem[] = NAV_ITEMS;

  constructor() {
  }

  ngOnInit(): void {
  }

}
