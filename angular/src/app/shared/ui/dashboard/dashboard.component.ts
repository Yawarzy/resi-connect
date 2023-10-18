import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PerfectScrollbarConfigInterface} from "ngx-perfect-scrollbar";
import {NavItem} from "../../util";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @Input() navTitleExpanded = 'Resiconncect'

  @Input() navTitleCollapsed = 'RC';

  @Input() navItems: NavItem[] = [];

  @Output() onLogout = new EventEmitter();

  isCollapsed = true;
  config: PerfectScrollbarConfigInterface = {
    suppressScrollX: true
  }


  constructor() {
  }

  ngOnInit(): void {
  }

  onLogoutClicked() {
    this.onLogout.emit();
  }

}
