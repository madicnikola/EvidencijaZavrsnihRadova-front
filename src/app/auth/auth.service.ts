import {EventEmitter, Injectable, Output} from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {LoginRequestPayload} from "../shared/dto/login-request.payload";
import {AuthenticationResponse} from "../shared/dto/authentication-response.payload";
import {map, tap} from "rxjs/operators";
import {RegisterRequestPayload} from "../shared/dto/register-request.payload";
import {environment} from "../../environments/environment";


const loginUrl = `${environment.apiUrl}/auth/login`;
const signupUrl = `${environment.apiUrl}/auth/signup`;
const refreshTokenUrl = `${environment.apiUrl}/auth/refresh/token`;


@Injectable()
export class AuthService {

  token: string;
  private userSubject: BehaviorSubject<AuthenticationResponse>;
  public user: Observable<AuthenticationResponse>;
  refreshTokenPayload = {
    refreshToken: this.getRefreshToken(),
    username: this.getUserName()
  };

  @Output() loggedIn: EventEmitter<boolean> = new EventEmitter();
  @Output() username: EventEmitter<string> = new EventEmitter();

  constructor(private router: Router, private client: HttpClient) {
    this.token = JSON.parse(localStorage.getItem('token'));
    this.userSubject = new BehaviorSubject<AuthenticationResponse>(JSON.parse(localStorage.getItem('user')));
    this.user = this.userSubject.asObservable();
  }

  login(loginRequestPayload: LoginRequestPayload): Observable<boolean> {
    return this.client.post<AuthenticationResponse>(loginUrl,
      loginRequestPayload).pipe(map(data => {
      this.loggedIn.emit(true);
      this.username.emit(data.username);
      this.token = data.authenticationToken;
      localStorage.setItem('token', JSON.stringify(data.authenticationToken));
      localStorage.setItem('username', JSON.stringify(data.username));
      localStorage.setItem('user', JSON.stringify(data));
      localStorage.setItem('refreshToken', JSON.stringify(data.refreshToken));
      localStorage.setItem('expiresAt', JSON.stringify(data.expiresAt));
      this.userSubject.next(data);
      this.loggedIn.emit(true);
      this.username.emit(data.username);

      this.router.navigate(['/']);
      return true;
    }));
  }

  register(registerRequestPayload: RegisterRequestPayload): Observable<any> {
    return this.client.post(signupUrl, registerRequestPayload, {responseType: 'text'});
  }

  public get userValue(): AuthenticationResponse {
    return this.userSubject.value;
  }

  logout() {
    this.token = null;
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('expiresAt');
    this.userSubject.next(null);
    this.user = null;
    this.router.navigate(['/signin']);
  }

  isAuthenticated() {
    return this.token != null;
  }

  isAuthorized(role: string) {
    if (this.userValue) {
      return this.userValue.role.toUpperCase() == role.toUpperCase();
    } else if (localStorage.getItem('user')) {
      const user = JSON.parse(localStorage.getItem('user'));
      return user.role.toUpperCase() == role.toUpperCase();
    }
    return false;
  }

  getToken() {
    return this.token;
  }

  getJwtToken() {
    return JSON.parse(localStorage.getItem('token'));
  }

  refreshToken() {
    return this.client.post<AuthenticationResponse>(refreshTokenUrl,
      this.refreshTokenPayload)
      .pipe(tap(response => {
        localStorage.removeItem('authenticationToken');
        localStorage.removeItem('expiresAt');

        localStorage.setItem('authenticationToken',
          JSON.stringify(response.authenticationToken));
        localStorage.setItem('expiresAt', JSON.stringify(response.expiresAt));
      }));
  }


  getUserName() {
    return JSON.parse(localStorage.getItem('username'));
  }

  getRefreshToken() {
    return JSON.parse(localStorage.getItem('refreshToken'));
  }

}
