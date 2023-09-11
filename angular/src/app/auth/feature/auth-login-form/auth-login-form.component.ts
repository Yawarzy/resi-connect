import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../data-access/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-auth-login-form',
  templateUrl: './auth-login-form.component.html',
  styleUrls: ['./auth-login-form.component.scss']
})
export class AuthLoginFormComponent implements OnInit {
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  })
  loading = false;

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
  }

  submit() {
    this.loading = true;
    const {email, password} = this.form.value;
    if (email && password) {
      this.authService.login({email, password}, () => {
        this.loading = false;
        this.router.navigate(['/tenant/dashboard/overview']);
      });
    }
  }
}
