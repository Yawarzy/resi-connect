import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable, of, switchMap, take} from "rxjs";

export interface LoginDto {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = environment.baseUrl + '/api/';

  public currentTenant$: Observable<any> | undefined;

  constructor(
    private http: HttpClient,
  ) {
  }


  login(loginDto: LoginDto, success?: () => void, error?: (err: any) => void) {
    this.http.post(this.baseUrl + 'login', loginDto, {
      headers: {
        'Accept': 'application/json',
      }
    }).subscribe((res: any) => {
      localStorage.setItem('token', res.token);
      this.currentTenant$ = of(res.tenant);
      localStorage.setItem('currentTenant', JSON.stringify(res.tenant[0]));
      success?.();
    }, err => {
      console.error(err);
      error?.(err);
    });
  }

  isLoggedIn() {
    return this.http.post(this.baseUrl + 'is-authenticated', {}, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      }
    }).pipe(
      switchMap((res: any) => {
        if (res && res.tenant) {
          localStorage.setItem('currentTenant', JSON.stringify(res.tenant));
          this.currentTenant$ = of(res.tenant);
        }
        return of(res);
      }),
      take(1)
    );
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
