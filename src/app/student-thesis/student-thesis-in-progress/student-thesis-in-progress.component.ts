import {AfterContentInit, AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ThesisPayload} from "../../shared/dto/thesis.payload";
import {DatePipe} from "@angular/common";
import {DataService} from "../../shared/data.service";
import {StudentThesisService} from "../student-thesis.service";
import {ProfessorPayload} from "../../shared/dto/professor.payload";
import {Observable, Subject} from "rxjs";
import {FileUploadService} from "../../shared/file-upload/file-upload.service";

@Component({
  selector: 'app-student-thesis-in-progress',
  templateUrl: './student-thesis-in-progress.component.html',
  styleUrls: ['./student-thesis-in-progress.component.css']
})
export class StudentThesisInProgressComponent implements OnInit {
  thesisForm: FormGroup;
  @Input() thesis: ThesisPayload;
  mentor: ProfessorPayload;
  addPdf = false;
  addZip = false;
  addPptx = false;
  thesisSubject = new Subject<ThesisPayload>();
  changed = new Subject<string>();

  constructor(private dataService: DataService,
              private studentThesis: StudentThesisService,
              private fb: FormBuilder,
              private uploadService: FileUploadService) {
  }


  ngOnInit(): void {
    this.setMentor();
    this.uploadService.setThesis(this.thesis);
    this.thesisSubject.next(this.thesis);
  }

  // ngAfterViewInit(): void {
  //   this.thesisSubject.next(this.thesis);
  //   this.uploadService.setThesis(this.thesis);
  // }

  private setMentor() {
    const mentorId = this.thesis.board.professors.find(value => {
      return value.function == "MENTOR" ? value : null;
    }).boardFunctionId.professorId;
    this.dataService.getMentor(mentorId).subscribe(value => {
      this.mentor = value;
    });
  }

  // private patchValue() {
  //   const pipe = new DatePipe('en-GB short');
  //   this.thesisForm.patchValue({
  //     ...this.thesis,
  //     dateOfThesisDefence: pipe.transform(this.thesis.dateOfThesisDefence),
  //     dateOfReception: pipe.transform(this.thesis.dateOfReception),
  //     dateOfBoardFormation: pipe.transform(this.thesis.dateOfBoardFormation),
  //     dateOfSubmission: pipe.transform(this.thesis.dateOfSubmission),
  //   });
// }


// private
// buildForm()
// {
//   this.thesisForm = this.fb.group(
//     {
//       title: "",
//       grade: "",
//       dateOfThesisDefence: "",
//       dateOfReception: "",
//       dateOfBoardFormation: "",
//       dateThesisDefended: "",
//       dateOfSubmission: ""
//     });
// }

  onAddPdf() {
    this.addPdf = true;
    this.addZip = false;
    this.addPptx = false;
  }

  onAddZip() {
    this.addZip = true;
    this.addPdf = false;
    this.addPptx = false;
  }

  onAddPptx() {
    this.addPptx = true;
    this.addZip = false;
    this.addPdf = false;
  }

  onUpload($event: string) {
    this.changed.next($event)
    console.log($event);
  }

}
