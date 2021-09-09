import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { HomeComponent } from './core/home/home.component';
import {AuthGuard} from "./auth/auth-guard.service";

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  {path:'professors', loadChildren: () => import('./professors/professors.module').then(m => m.ProfessorsModule), canLoad:[AuthGuard]},
  {path:'theses', loadChildren: () => import('./theses/thesis.module').then(m => m.ThesisModule)},

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
