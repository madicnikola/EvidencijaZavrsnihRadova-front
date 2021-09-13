import { NgModule } from '@angular/core';
import {StudentThesisRoutingModule} from "./student-thesis-routing.module";
import {StudentThesisComponent} from "./student-thesis.component";
import { StudentThesisStartComponent } from './student-thesis-start/student-thesis-start.component';
import {SharedModule} from "../shared/shared.module";
import {ProfessorsModule} from "../professors/professors.module";



@NgModule({
  declarations: [
    StudentThesisComponent,
    StudentThesisStartComponent
  ],
  imports: [
    SharedModule,
    StudentThesisRoutingModule,
    ProfessorsModule
  ]
})
export class StudentThesisModule {

}
