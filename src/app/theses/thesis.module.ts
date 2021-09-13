import {NgModule} from '@angular/core';
import {ThesisStartComponent} from "./thesis-start/thesis-start.component";
import {ThesisListComponent} from './thesis-list/thesis-list.component';
import {ThesisDetailComponent} from './thesis-detail/thesis-detail.component';
import {ThesisEditComponent} from './thesis-edit/thesis-edit.component';
import {ThesisItemComponent} from './thesis-list/thesis-item/thesis-item.component';
import {SharedModule} from "../shared/shared.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ThesisRoutingModule} from "./thesis-routing.module";
import {MatTabsModule} from "@angular/material/tabs";
import {ThesesComponent} from "./theses.component";
import {SearchBarModule} from "../shared/search-bar/search-bar.module";
import {SearchBoxModule} from "../shared/search-box/search-box.module";
import {Ng2SearchPipeModule} from "ng2-search-filter";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";


@NgModule({
    declarations: [
        ThesesComponent,
        ThesisStartComponent,
        ThesisDetailComponent,
        ThesisEditComponent,
        ThesisListComponent,
        ThesisItemComponent,
    ],
  exports: [
    ThesisListComponent,
    ThesesComponent
  ],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    MatTabsModule,
    ThesisRoutingModule,
    SearchBarModule,
    SearchBoxModule,
    Ng2SearchPipeModule,
    MatInputModule,
    FormsModule,
    MatIconModule,
  ]
})
export class ThesisModule {

}
