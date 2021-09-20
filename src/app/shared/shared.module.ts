import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DropdownDirective} from './dropdown.directive';
import {MatDialogModule} from "@angular/material/dialog";
import {DialogComponent} from "./dialog/dialog.component";
import {MatButtonModule} from "@angular/material/button";

@NgModule({
  declarations: [
    DropdownDirective,
    DialogComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule
  ],
  exports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    DropdownDirective,
    DialogComponent
  ]
})
export class SharedModule {
}
