import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from './../environments/environment';

import { JwtHelperService } from '@auth0/angular-jwt';

const helper = new JwtHelperService();

import {User} from './User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor( private http: HttpClient) {}

  getToken(): String { return localStorage.getItem('access_token'); }

  readToken(): User {
    const token = localStorage.getItem('access_token');
    return helper.decodeToken(token);
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('access_token');
    return token ? true : false;
  }

  login(user): Observable<any> { return this.http.post<any>(`${environment.userAPIBase}/login`, user); }

  logout(): void { localStorage.removeItem('access_token'); }

  register(registerUser): Observable<any> { return this.http.post<any>(`${environment.userAPIBase}/register`, registerUser); }
}