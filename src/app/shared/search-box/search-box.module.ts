import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatChipsModule} from "@angular/material/chips";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {SearchBoxComponent} from "./search-box.component";
import {Ng2SearchPipeModule} from "ng2-search-filter";


@NgModule({
  declarations: [
    SearchBoxComponent

  ],
  exports: [
    SearchBoxComponent
  ],
  imports: [
    CommonModule,
    MatChipsModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
    Ng2SearchPipeModule
  ]
})
export class SearchBoxModule {
}
