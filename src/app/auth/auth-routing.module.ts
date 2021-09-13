import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SigninComponent } from './signin/signin.component';
import {SignupStartComponent} from "./signup/signup-start/signup-start.component";
import {SignupStudentComponent} from "./signup/signup-student/signup-student.component";
import {SignupProfessorComponent} from "./signup/signup-professor/signup-professor.component";

const authRoutes: Routes = [
  { path: 'signup', children:[
      {path:'', component: SignupStartComponent},
      {path:'student', component: SignupStudentComponent},
      {path:'professor', component: SignupProfessorComponent}
    ] },
  { path: 'signin', component: SigninComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(authRoutes)
  ],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
