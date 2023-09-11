import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../auth/data-access/auth.service";
import {Router} from "@angular/router";
import {PerfectScrollbarConfigInterface} from "ngx-perfect-scrollbar";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  isCollapsed = true;
  config: PerfectScrollbarConfigInterface = {
    suppressScrollX: true
  }


  constructor(public authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }

}
