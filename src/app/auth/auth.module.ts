import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { AuthRoutingModule } from './auth-routing.module';
import { SignupStartComponent } from './signup/signup-start/signup-start.component';
import { SignupStudentComponent } from './signup/signup-student/signup-student.component';
import { SignupProfessorComponent } from './signup/signup-professor/signup-professor.component';
import {MatButtonModule} from "@angular/material/button";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatMomentDateModule} from "@angular/material-moment-adapter";
import {MatTabsModule} from "@angular/material/tabs";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatOptionModule} from "@angular/material/core";
import {SharedModule} from "../shared/shared.module";

@NgModule({
  declarations: [
    SigninComponent,
    SignupComponent,
    SignupStartComponent,
    SignupStudentComponent,
    SignupProfessorComponent
  ],
  imports: [
    SharedModule,
    FormsModule,
    AuthRoutingModule,
    MatButtonModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatTabsModule,
    MatAutocompleteModule,
    MatOptionModule,
    ReactiveFormsModule
  ]
})
export class AuthModule {}
