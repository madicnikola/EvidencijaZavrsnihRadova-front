import {RouterModule, Routes} from "@angular/router";
import {ProfessorsComponent} from "./professors.component";
import {NgModule} from "@angular/core";
import {ProfessorDetailComponent} from "./professor-detail/professor-detail.component";

const professorRoutes: Routes = [
  {
    path: '', component: ProfessorsComponent, children:[
      {path: ':id', component: ProfessorDetailComponent}
    ]
  },
];

@NgModule({
  declarations:[],
  imports: [
    RouterModule.forChild(professorRoutes)
  ],
  exports: [RouterModule]
})
export class ProfessorsRoutingModule{

}
