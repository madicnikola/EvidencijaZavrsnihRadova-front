import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from "@angular/router";
import {ThesisStartComponent} from "../theses/thesis-start/thesis-start.component";
import {ThesesStaffComponent} from "./theses-staff.component";
import {ThesesDetailsStaffComponent} from "./theses-details-staff/theses-details-staff.component";
import {ThesesStartStaffComponent} from "./theses-start-staff/theses-start-staff.component";

const routes: Routes = [{
  path: '', component: ThesesStaffComponent, children: [
    {path: '', component: ThesesStartStaffComponent},
    {path: ':id', component: ThesesDetailsStaffComponent}
  ]
}];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
})
export class ThesesStaffRoutingModule {
}
