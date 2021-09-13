import {EventEmitter, Injectable, Output} from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {LoginRequestPayload} from "../shared/dto/login-request.payload";
import {AuthenticationResponse} from "../shared/dto/authentication-response.payload";
import {map} from "rxjs/operators";
import {RegisterRequestPayload} from "../shared/dto/register-request.payload";
import {environment} from "../../environments/environment";

@Injectable()
export class AuthService {

  token: string;
  private userSubject: BehaviorSubject<AuthenticationResponse>;
  public user: Observable<AuthenticationResponse>;

  @Output() loggedIn: EventEmitter<boolean> = new EventEmitter();
  @Output() username: EventEmitter<string> = new EventEmitter();

  constructor(private router: Router, private client: HttpClient) {
    this.token = JSON.parse(localStorage.getItem('token'));
    this.userSubject = new BehaviorSubject<AuthenticationResponse>(JSON.parse(localStorage.getItem('user')));
    this.user = this.userSubject.asObservable();
  }

  login(loginRequestPayload: LoginRequestPayload): Observable<boolean> {
    return this.client.post<AuthenticationResponse>(`${environment.apiUrl}/auth/login`,
      loginRequestPayload).pipe(map(data => {
      this.loggedIn.emit(true);
      this.username.emit(data.username);
      this.token = data.authenticationToken;
      localStorage.setItem('token', JSON.stringify(data.authenticationToken));
      localStorage.setItem('user', JSON.stringify(data));
      this.userSubject.next(data);
      this.router.navigate(['/']);
      return true;
    }));
  }

  register(registerRequestPayload: RegisterRequestPayload): Observable<any> {
    return this.client.post(`${environment.apiUrl}/auth/signup`, registerRequestPayload, {responseType: 'text'});
  }

  public get userValue(): AuthenticationResponse {
    return this.userSubject.value;
  }

  logout() {
    this.token = null;
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.user = null;
    this.router.navigate(['/signin']);
  }

  isAuthenticated() {
    return this.token != null;
  }

  isAuthorized(role: string) {
    if(this.userValue){
      return this.userValue.role.toUpperCase() == role;
    }
    return false;
  }

  getToken() {
    return this.token;
  }
}
