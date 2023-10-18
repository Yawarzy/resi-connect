import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../auth/data-access/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-landlord-dashboard',
  templateUrl: './landlord-dashboard.component.html',
  styleUrls: ['./landlord-dashboard.component.scss']
})
export class LandlordDashboardComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService) {
  }

  ngOnInit(): void {
  }

  logout() {
    this.authService.logout("landlord");
    this.router.navigate(['/']);
  }

}
