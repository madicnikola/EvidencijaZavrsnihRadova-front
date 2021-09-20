import {NgModule} from '@angular/core';
import {SharedModule} from "../shared/shared.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ProfessorsRoutingModule} from "./professors-routing.module";
import {ProfessorsComponent} from "./professors.component";
import {ProfessorListComponent} from "./professor-list/professor-list.component";
import {ProfessorDetailComponent} from './professor-detail/professor-detail.component';
import {ProfessorItemComponent} from './professor-list/professor-item/professor-item.component';
import {SearchBarModule} from "../shared/search-bar/search-bar.module";
import {Ng2SearchPipeModule} from "ng2-search-filter";
import {MatIconModule} from "@angular/material/icon";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";


@NgModule({
  declarations: [
    ProfessorsComponent,
    ProfessorDetailComponent,
    ProfessorListComponent,
    ProfessorItemComponent,
  ],
  exports: [
    ProfessorItemComponent,
    ProfessorsComponent
  ],
  imports: [
    SharedModule,
    ProfessorsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SearchBarModule,
    Ng2SearchPipeModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class ProfessorsModule {

}
