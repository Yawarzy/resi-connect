import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable, of} from "rxjs";

export interface LoginDto {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = environment.baseUrl + '/api/';

  private currentTenant$: Observable<any> | undefined;

  constructor(
    private http: HttpClient,
  ) {
  }


  login(loginDto: LoginDto, success?: () => void, error?: () => void) {
    this.http.post(this.baseUrl + 'login', loginDto, {
      headers: {
        'Accept': 'application/json',
      }
    }).subscribe((res: any) => {
      localStorage.setItem('token', res.token);
      this.currentTenant$ = of(res.tenant);
      localStorage.setItem('currentTenant', JSON.stringify(res.tenant));
      success?.();
    }, error => {
      console.error(error);
      error?.();
    });
  }

  isLoggedIn() {
    return !!localStorage.getItem('token');
  }

  logout() {
    this.http.post(this.baseUrl + 'logout', {}, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
        'Accept': 'application/json'
      }
    }).subscribe(res => {
      // remove the token and currentTenant from LS
      localStorage.removeItem('token');
      localStorage.removeItem('currentTenant');
    })
  }

  getCurrentTenant$() {
    this.currentTenant$?.subscribe(user => {
    })
    return this.currentTenant$;
  }
}
