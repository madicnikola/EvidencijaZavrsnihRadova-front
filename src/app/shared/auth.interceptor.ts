import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {AuthService} from "../auth/auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('Intercepted!', req);

    let jwtToken = 'Bearer '.concat(this.authService.getToken());
    if (this.authService.isAuthenticated()) {
      const copiedReq = req.clone({headers: req.headers.set('Authorization', jwtToken).append('Content-Type', 'application/json')});
      console.log(copiedReq);
      return next.handle(copiedReq);
    }else{
      return next.handle(req);
    }
  }
}
