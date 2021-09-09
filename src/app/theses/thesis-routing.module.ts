import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {ThesesComponent} from "./theses.component";
import {ThesisStartComponent} from "./thesis-start/thesis-start.component";


const thesisRoutes: Routes = [
  {path: '', component: ThesesComponent, children: [
      {path: '', component: ThesisStartComponent}
    ]}
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(thesisRoutes)
  ],
  exports:[RouterModule]
})
export class ThesisRoutingModule { }
