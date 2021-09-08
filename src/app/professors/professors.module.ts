import {NgModule} from '@angular/core';
import {SharedModule} from "../shared/shared.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ProfessorsRoutingModule} from "./professors-routing.module";
import {ProfessorsComponent} from "./professors.component";
import {ProfessorListComponent} from "./professor-list/professor-list.component";
import { ProfessorDetailComponent } from './professor-detail/professor-detail.component';
import { ProfessorItemComponent } from './professor-list/professor-item/professor-item.component';


@NgModule({
  declarations: [
    ProfessorsComponent,
    ProfessorDetailComponent,
    ProfessorListComponent,
    ProfessorItemComponent,
  ],
  exports: [
    ProfessorItemComponent
  ],
  imports: [
    SharedModule,
    ProfessorsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class ProfessorsModule {

}
