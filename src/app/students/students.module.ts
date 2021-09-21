import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StudentsComponent} from "./students.component";
import { StudentDetailsComponent } from './student-details/student-details.component';
import { StudentListComponent } from './student-list/student-list.component';
import { StudentItemComponent } from './student-list/student-item/student-item.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {Ng2SearchPipeModule} from "ng2-search-filter";
import {StudentsRoutingModule} from "./students-routing.module";
import {SharedModule} from "../shared/shared.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";


@NgModule({
  declarations: [
    StudentsComponent,
    StudentDetailsComponent,
    StudentListComponent,
    StudentItemComponent
  ],
  imports: [
    SharedModule,
    StudentsRoutingModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    Ng2SearchPipeModule
  ]
})
export class StudentsModule {
}
