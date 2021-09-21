import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DropdownDirective} from './dropdown.directive';
import {MatDialogModule} from "@angular/material/dialog";
import {DialogComponent} from "./dialog/dialog.component";
import {MatButtonModule} from "@angular/material/button";
import { FileUploadComponent } from './file-upload/file-upload.component';
import {BrowserModule} from "@angular/platform-browser";
import {HttpClient, HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    DropdownDirective,
    DialogComponent,
    FileUploadComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MatDialogModule,
    MatButtonModule,
  ],
  exports: [
    CommonModule,
    HttpClientModule,
    MatDialogModule,
    MatButtonModule,
    DropdownDirective,
    DialogComponent,
    FileUploadComponent
  ]
})
export class SharedModule {
}
