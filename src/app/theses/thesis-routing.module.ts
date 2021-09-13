import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {ThesesComponent} from "./theses.component";
import {ThesisStartComponent} from "./thesis-start/thesis-start.component";
import {ThesisDetailComponent} from "./thesis-detail/thesis-detail.component";


const thesesRoutes: Routes = [
  {path: '', component: ThesesComponent, children: [
      {path: '', component: ThesisStartComponent},
      {path: ':id', component: ThesisDetailComponent}
    ]}
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(thesesRoutes)
  ],
  exports:[RouterModule]
})
export class ThesisRoutingModule { }
