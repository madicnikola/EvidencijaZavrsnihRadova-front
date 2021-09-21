import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {StudentPayload} from "../../shared/dto/student.payload";
import {StudentsService} from "../students.service";
import {DataService} from "../../shared/data.service";
import {ThesisPayload} from "../../shared/dto/thesis.payload";

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent implements OnInit {
  student: StudentPayload;
  id: number;
  thesis: ThesisPayload;
  constructor(private route: ActivatedRoute,
              private studentsService: StudentsService,
              private dataService: DataService) {
  }

  ngOnInit(): void {
    this.route.params
      .subscribe(
        params => {
          this.id = +params['id'];
          this.student = this.studentsService.getStudent(this.id);
          this.fetchData();
        });
    this.studentsService.thesisChanged.subscribe(value => {
      this.thesis = value;
    });
    this.thesis = this.studentsService.getThesis();

  }

  private fetchData() {
    this.dataService.getThesisByStudentId(this.student.personId);
  }
}
