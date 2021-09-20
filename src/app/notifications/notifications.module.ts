import {NgModule} from '@angular/core';
import {NotificationListComponent} from "./notification-list/notification-list.component";
import {NotificationItemComponent} from "./notification-list/notification-item/notification-item.component";
import {SharedModule} from "../shared/shared.module";
import {NotificationsRoutingModule} from "./notifications-routing.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Ng2SearchPipeModule} from "ng2-search-filter";
import {NotificationsComponent} from "./notifications.component";
import {MatIconModule} from "@angular/material/icon";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {NotificationDetailsStudentComponent} from './notification-details/notification-details-student/notification-details-student.component';
import {NotificationDetailsProfessorComponent} from "./notification-details/notification-details-professor/notification-details-professor.component";
import {NotificationDetailsComponent} from "./notification-details/notification-details.component";
import {MatTabsModule} from "@angular/material/tabs";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {NgbDatepickerModule} from "@ng-bootstrap/ng-bootstrap";


@NgModule({
  declarations: [
    NotificationsComponent,
    NotificationListComponent,
    NotificationItemComponent,
    NotificationDetailsComponent,
    NotificationDetailsProfessorComponent,
    NotificationDetailsStudentComponent
  ],
  imports: [
    SharedModule,
    NotificationsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    Ng2SearchPipeModule,
    MatTabsModule,
    MatDatepickerModule,
    NgbDatepickerModule,
  ]
})
export class NotificationsModule {
}
