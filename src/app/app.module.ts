import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {AppRoutingModule} from "./app-routing.module";
import {SharedModule} from "./shared/shared.module";
import {AuthModule} from "./auth/auth.module";
import {CoreModule} from "./core/core.module";
import { ProfessorsComponent } from './professors/professors.component';
import { StudentsComponent } from './students/students.component';
import { ThesesComponent } from './theses/theses.component';
import { ProfessorListComponent } from './professors/professor-list/professor-list.component';
import {ProfessorsModule} from "./professors/professors.module";

@NgModule({
  declarations: [
    AppComponent,
    StudentsComponent,
    ThesesComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    AuthModule,
    CoreModule,
    ProfessorsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
