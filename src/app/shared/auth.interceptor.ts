import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, throwError} from "rxjs";
import {AuthService} from "../auth/auth.service";
import {AuthenticationResponse} from "./dto/authentication-response.payload";
import {catchError, filter, map, take} from "rxjs/operators";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  isTokenRefreshing = false;
  refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(private authService: AuthService) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // console.log('Intercepted!', req);

    let jwtToken = 'Bearer '.concat(this.authService.getToken());
    if (this.authService.isAuthenticated()) {
      const copiedReq = req.clone({headers: req.headers.set('Authorization', jwtToken)});
      console.log(copiedReq);
      return next.handle(copiedReq).pipe(catchError(err => {
          if (err instanceof HttpErrorResponse && err.status === 403) {
            return this.handleAuthErrors(req, next);
          } else {
            return throwError(err);
          }
        }
      ));
    } else {
      return next.handle(req);
    }

  }

  private handleAuthErrors(req: HttpRequest<any>, next: HttpHandler)
    : Observable<any> {
    if (!this.isTokenRefreshing) {
      this.isTokenRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.authService.refreshToken().pipe(
        map((refreshTokenResponse: AuthenticationResponse) => {
          this.isTokenRefreshing = false;
          this.refreshTokenSubject
            .next(refreshTokenResponse.authenticationToken);
          return next.handle(this.addToken(req,
            refreshTokenResponse.authenticationToken));
        }))
    } else {
      return this.refreshTokenSubject.pipe(
        filter(result => result !== null),
        take(1),
        map((res) => {
          return next.handle(this.addToken(req,
            this.authService.getJwtToken()))
        })
      );
    }
  }

  addToken(req: HttpRequest<any>, jwtToken: any) {
    return req.clone({
      headers: req.headers.set('Authorization',
        'Bearer ' + jwtToken)
    });
  }

}










