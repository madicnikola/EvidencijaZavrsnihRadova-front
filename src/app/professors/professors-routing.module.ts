import {RouterModule, Routes} from "@angular/router";
import {ProfessorsComponent} from "./professors.component";
import {NgModule} from "@angular/core";

const professorRoutes: Routes = [
  {
    path: '', component: ProfessorsComponent
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
