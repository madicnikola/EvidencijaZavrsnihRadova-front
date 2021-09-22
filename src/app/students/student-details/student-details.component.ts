import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {StudentPayload} from "../../shared/dto/student.payload";
import {StudentsService} from "../students.service";
import {DataService} from "../../shared/data.service";
import {ThesisPayload} from "../../shared/dto/thesis.payload";
import {Subject} from "rxjs";

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent implements OnInit, AfterViewInit {
  student: StudentPayload;
  id: number;
  thesis: ThesisPayload;
  filesChanged: Subject<string> = new Subject<string>();
  thesisSubject = new Subject<ThesisPayload>();
  changed = new Subject<string>();

  constructor(private route: ActivatedRoute,
              public studentsService: StudentsService,
              private dataService: DataService) {
  }


  ngOnInit(): void {
    this.route.params
      .subscribe(
        params => {
          this.id = +params['id'];
          this.student = this.studentsService.getStudent(this.id);
          this.fetchData();
          this.filesChanged.next('changed');
          this.thesisSubject.next(this.thesis);
        });
    this.fetchData();
    this.studentsService.thesisChanged.subscribe(value => {
      this.thesis = value;
      this.thesisSubject.next(this.thesis);
    });
    this.thesis = this.studentsService.getThesis();

  }

  ngAfterViewInit(): void {
    this.thesisSubject.next(this.thesis);
  }

  private fetchData() {
    this.dataService.getThesisByStudentId(this.student.personId);
  }
}
