import {AfterContentInit, AfterViewInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {StudentPayload} from "../../shared/dto/student.payload";
import {StudentsService} from "../students.service";
import {DataService} from "../../shared/data.service";
import {ThesisPayload} from "../../shared/dto/thesis.payload";
import {AuthService} from "../../auth/auth.service";
import {VisibilityStatus} from "../../shared/model/progress-status.model";
import {FileUploadService} from "../../shared/file-upload/file-upload.service";


@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent implements OnInit, AfterContentInit {
  student: StudentPayload;
  id: number;
  thesis: ThesisPayload;

  constructor(private route: ActivatedRoute,
              public studentsService: StudentsService,
              private dataService: DataService,
              private authService: AuthService,
              private uploadService: FileUploadService) {
  }


  ngOnInit(): void {
    this.route.params
      .subscribe(
        params => {
          this.id = +params['id'];
          this.student = this.studentsService.getStudent(this.id);
          this.fetchThesisData();
          this.initThesis();
        });
    // this.fetchData();
    this.studentsService.thesisChanged.subscribe(value => {
      this.thesis = value;
    });
    this.thesis = this.studentsService.getThesis();
    this.uploadService.setThesis(this.thesis);
  }

  ngAfterContentInit(): void {
    this.uploadService.setThesis(this.thesis);
  }

  private fetchThesisData() {
    this.dataService.getThesisByStudentId(this.student.personId);
  }

  isMentor() {
    return this.student.mentor.userProfile.username == this.authService.getUserName();
  }

  onPublish() {
    this.thesis.visibilityStatus = VisibilityStatus.PUBLISHED;
    this.dataService.publishThesis(this.thesis).subscribe(value => {
      this.thesis = value;
    });
  }


  onUnpublish() {
    this.thesis.visibilityStatus = VisibilityStatus.PRIVATE;
    this.dataService.publishThesis(this.thesis).subscribe(value => {
      this.thesis = value;
    });
  }

  private initThesis() {
    if (this.thesis)
      this.uploadService.setThesis(this.thesis);
  }
}
