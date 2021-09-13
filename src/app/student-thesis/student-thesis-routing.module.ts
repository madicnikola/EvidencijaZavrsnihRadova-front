
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {ThesesComponent} from "../theses/theses.component";
import {ThesisStartComponent} from "../theses/thesis-start/thesis-start.component";
import {ThesisDetailComponent} from "../theses/thesis-detail/thesis-detail.component";
import {StudentThesisComponent} from "./student-thesis.component";

const thesisRoutes: Routes = [
  {path: '', component: StudentThesisComponent,
    // children: [
      // {path: '', component: ThesisStartComponent},
      // {path: ':id', component: ThesisDetailComponent}]
      }
]

@NgModule({
  declarations: [
  ],
  imports: [
    RouterModule.forChild(thesisRoutes)
  ],
  exports:[
    RouterModule
  ]
})
export class StudentThesisRoutingModule { }
