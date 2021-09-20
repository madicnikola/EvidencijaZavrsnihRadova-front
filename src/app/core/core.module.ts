import {NgModule} from '@angular/core';
import {HeaderComponent} from './header/header.component';
import {HomeComponent} from './home/home.component';
import {AppRoutingModule} from '../app-routing.module';
import {SharedModule} from '../shared/shared.module';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthInterceptor} from '../shared/auth.interceptor';
import {AuthService} from "../auth/auth.service";
import {LoggingInterceptor} from "../shared/logging.interceptor";
import {ErrorInterceptor} from "../shared/error.interceptor";
import {MAT_DATE_LOCALE} from "@angular/material/core";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {ThesisModule} from "../theses/thesis.module";
import {DataService} from "../shared/data.service";
import {DatePipe} from "@angular/common";

@NgModule({
  declarations: [
    HeaderComponent,
    HomeComponent,
  ],
  imports: [
    SharedModule,
    AppRoutingModule,
    NgbModule,
    ThesisModule,
  ],
  exports: [
    AppRoutingModule,
    HeaderComponent,
  ],
  providers: [
    DataService,
    AuthService,
    DatePipe,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'}
  ]
})
export class CoreModule {

}
