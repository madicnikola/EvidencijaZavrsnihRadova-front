import {EventEmitter, Injectable, Output} from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {RegisterRequestPayload} from "../shared/dto/register-request.payload";
import {LoginRequestPayload} from "../shared/dto/login-request.payload";
import {AuthenticationResponse} from "../shared/dto/authentication-response.payload";
import {map} from "rxjs/operators";

@Injectable()
export class AuthService {

  token : string;

  @Output() loggedIn: EventEmitter<boolean> = new EventEmitter();
  @Output() username: EventEmitter<string> = new EventEmitter();

  constructor(private router : Router, private client : HttpClient) {}

  login(loginRequestPayload: LoginRequestPayload): Observable<boolean> {
    return this.client.post<AuthenticationResponse>('http://localhost:8080/auth/login',
      loginRequestPayload).pipe(map(data => {
      this.loggedIn.emit(true);
      this.username.emit(data.username);
      this.token =  data.authenticationToken;
      this.router.navigate(['/']);
      return true;
    }));
  }

  register(registerRequestPayload : RegisterRequestPayload): Observable<any> {
    return this.client.post('http://localhost:8080/auth/signup', registerRequestPayload, { responseType: 'text' });
  }

  isUserLoggedIn(){
    if(this.token !=null)
      return true;
      return false;
  }

  logout() {
    this.token = null;
  }

  isAuthenticated() {
    return this.token != null;
  }

  getToken() {
    return this.token;
  }
}
