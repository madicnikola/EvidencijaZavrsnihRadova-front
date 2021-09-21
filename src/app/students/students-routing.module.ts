import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {StudentsComponent} from "./students.component";
import {StudentDetailsComponent} from "./student-details/student-details.component";


const studentRoutes: Routes = [
  {
    path: '', component: StudentsComponent, children: [
      {path: ':id', component: StudentDetailsComponent}
    ]
  },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(studentRoutes)
  ],
  exports: [RouterModule]
})
export class StudentsRoutingModule {
}
