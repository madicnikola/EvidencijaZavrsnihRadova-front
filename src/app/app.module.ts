import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {AppRoutingModule} from "./app-routing.module";
import {SharedModule} from "./shared/shared.module";
import {AuthModule} from "./auth/auth.module";
import {CoreModule} from "./core/core.module";
import {ProfessorsModule} from "./professors/professors.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {StudentThesisModule} from "./student-thesis/student-thesis.module";
import {StudentsModule} from "./students/students.module";
import {NotificationsModule} from "./notifications/notifications.module";


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    AuthModule,
    CoreModule,
    ProfessorsModule,
    StudentsModule,
    StudentThesisModule,
    NotificationsModule,

  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
