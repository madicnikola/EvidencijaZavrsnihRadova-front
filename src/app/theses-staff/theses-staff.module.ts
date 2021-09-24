import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ThesesStaffComponent} from "./theses-staff.component";
import {ThesesListStaffComponent} from './theses-list-staff/theses-list-staff.component';
import {ThesesDetailsStaffComponent} from './theses-details-staff/theses-details-staff.component';
import {ThesesItemStaffComponent} from './theses-list-staff/theses-item-staff/theses-item-staff.component';
import {ThesesStaffRoutingModule} from "./theses-staff-routing.module";
import {RouterModule} from "@angular/router";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Ng2SearchPipeModule} from "ng2-search-filter";
import {SharedModule} from "../shared/shared.module";
import { ThesesStartStaffComponent } from './theses-start-staff/theses-start-staff.component';
import {MatInputModule} from "@angular/material/input";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatTabsModule} from "@angular/material/tabs";
import {MatAutocompleteModule} from "@angular/material/autocomplete";


@NgModule({
  declarations: [
    ThesesStaffComponent,
    ThesesListStaffComponent,
    ThesesDetailsStaffComponent,
    ThesesItemStaffComponent,
    ThesesStartStaffComponent
  ],
  exports: [RouterModule],
  imports: [
    SharedModule,
    ThesesStaffRoutingModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
    Ng2SearchPipeModule,
    MatButtonToggleModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatAutocompleteModule
  ]
})
export class ThesesStaffModule {
}
