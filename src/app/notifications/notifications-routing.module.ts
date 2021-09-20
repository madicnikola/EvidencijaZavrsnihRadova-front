import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {NotificationsComponent} from "./notifications.component";
import {AuthGuard} from "../auth/auth-guard.service";
import {NotificationDetailsComponent} from "./notification-details/notification-details.component";


const notificationRoutes: Routes = [{
  path: '', component: NotificationsComponent, children: [
    {path: ':id', component: NotificationDetailsComponent, canActivate:[AuthGuard]},
  ]
},
];


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(notificationRoutes)
  ],
  exports: [RouterModule]
})
export class NotificationsRoutingModule {

}
