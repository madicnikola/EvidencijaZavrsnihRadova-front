import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SearchBarComponent} from "./search-bar.component";
import {MatChipsModule} from "@angular/material/chips";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {ReactiveFormsModule} from "@angular/forms";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";



@NgModule({
  declarations: [
    SearchBarComponent
  ],
  exports: [
    SearchBarComponent
  ],
  imports: [
    CommonModule,
    MatChipsModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatIconModule,
    MatInputModule
  ]
})
export class SearchBarModule { }
