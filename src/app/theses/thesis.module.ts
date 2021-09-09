import {NgModule} from '@angular/core';
import {ThesisStartComponent} from "./thesis-start/thesis-start.component";
import {ThesisListComponent} from './thesis-list/thesis-list.component';
import {ThesisDetailComponent} from './thesis-detail/thesis-detail.component';
import {ThesisEditComponent} from './thesis-edit/thesis-edit.component';
import {ThesisItemComponent} from './thesis-list/thesis-item/thesis-item.component';
import {SharedModule} from "../shared/shared.module";
import {ReactiveFormsModule} from "@angular/forms";
import {ThesisRoutingModule} from "./thesis-routing.module";
import {MatTabsModule} from "@angular/material/tabs";
import {ThesesComponent} from "./theses.component";


@NgModule({
  declarations: [
    ThesesComponent,
    ThesisStartComponent,
    ThesisDetailComponent,
    ThesisEditComponent,
    ThesisListComponent,
    ThesisItemComponent,
  ],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    MatTabsModule,
    ThesisRoutingModule,
  ]
})
export class ThesisModule {

}
