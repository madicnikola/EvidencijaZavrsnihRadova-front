import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {DataService} from "../../shared/data.service";
import {StudentsService} from "../students.service";
import {StudentPayload} from "../../shared/dto/student.payload";

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit, OnDestroy {

  students: StudentPayload[];
  subscription: Subscription;
  searchText: string;


  constructor(private router: Router,
              private route: ActivatedRoute,
              private dataService: DataService,
              private studentService: StudentsService) {

  }


  ngOnInit(): void {
    this.fetchData();
    this.subscription = this.studentService.studentChanged.subscribe(
      value => {
        this.students = value;
      }
    );
    this.students = this.studentService.getStudents();
  }


  private fetchData() {
    this.dataService.getMyStudents();
  }

  ngOnDestroy() {
  }
}
