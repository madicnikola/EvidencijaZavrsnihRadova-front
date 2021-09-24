import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

import {HomeComponent} from './core/home/home.component';
import {AuthGuard} from "./auth/auth-guard.service";
import {Role} from "./shared/model/role";

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  {path:'professors', loadChildren: () => import('./professors/professors.module').then(m => m.ProfessorsModule), canLoad:[AuthGuard]},
  {path:'students', loadChildren: () => import('./students/students.module').then(m => m.StudentsModule), canActivate:[AuthGuard], data: {roles: [Role.Professor, Role.Staff]}},
  {path:'theses', loadChildren: () => import('./theses/thesis.module').then(m => m.ThesisModule)},
  {path:'thesis', loadChildren: () => import('./student-thesis/student-thesis.module').then(m => m.StudentThesisModule), canActivate:[AuthGuard], data: {roles: [Role.Student]}},
  {path:'notifications', loadChildren: () => import('./notifications/notifications.module').then(m => m.NotificationsModule)}
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})
  ],
  exports: [RouterModule],
  providers: [
    AuthGuard
  ]
})
export class AppRoutingModule {

}
