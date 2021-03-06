import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DropdownDirective} from './dropdown.directive';
import {MatDialogModule} from "@angular/material/dialog";
import {DialogComponent} from "./dialog/dialog.component";
import {MatButtonModule} from "@angular/material/button";
import {FileUploadComponent} from './file-upload/file-upload.component';
import {HttpClientModule} from "@angular/common/http";
import {FileListComponent} from './file-upload/file-list/file-list.component';
import {MatIconModule} from "@angular/material/icon";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    DropdownDirective,
    DialogComponent,
    FileUploadComponent,
    FileListComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatCheckboxModule,
    FormsModule,
  ],
    exports: [
        CommonModule,
        HttpClientModule,
        MatDialogModule,
        MatButtonModule,
        DropdownDirective,
        DialogComponent,
        FileUploadComponent,
        FileListComponent
    ]
})
export class SharedModule {
}
