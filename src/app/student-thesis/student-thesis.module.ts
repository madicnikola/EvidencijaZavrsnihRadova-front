import {NgModule} from '@angular/core';
import {StudentThesisRoutingModule} from "./student-thesis-routing.module";
import {StudentThesisComponent} from "./student-thesis.component";
import {StudentThesisStartComponent} from './student-thesis-start/student-thesis-start.component';
import {SharedModule} from "../shared/shared.module";
import {ProfessorsModule} from "../professors/professors.module";
import {StudentThesisInProgressComponent} from './student-thesis-in-progress/student-thesis-in-progress.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatTabsModule} from "@angular/material/tabs";
import {MatInputModule} from "@angular/material/input";
import {ThesisDetailViewComponent} from './thesis-detail-view/thesis-detail-view.component';
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";


@NgModule({
  declarations: [
    StudentThesisComponent,
    StudentThesisStartComponent,
    StudentThesisInProgressComponent,
    ThesisDetailViewComponent
  ],
  exports: [
    StudentThesisComponent,
    ThesisDetailViewComponent
  ],
  imports: [
    SharedModule,
    StudentThesisRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    ProfessorsModule,
    MatTabsModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
  ]
})
export class StudentThesisModule {

}
