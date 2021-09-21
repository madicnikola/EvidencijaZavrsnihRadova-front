import {AfterContentInit, Component, Input, OnInit} from '@angular/core';
import {DataService} from "../../shared/data.service";
import {StudentThesisService} from "../student-thesis.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ThesisPayload} from "../../shared/dto/thesis.payload";
import {ProfessorPayload} from "../../shared/dto/professor.payload";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-thesis-detail-view',
  templateUrl: './thesis-detail-view.component.html',
  styleUrls: ['./thesis-detail-view.component.css']
})
export class ThesisDetailViewComponent implements OnInit, AfterContentInit {
  thesisForm: FormGroup;
  @Input() thesis: ThesisPayload;
  mentor: ProfessorPayload;
  selectedIndex = 0;

  constructor(private dataService: DataService,
              private studentThesis: StudentThesisService,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.setMentor();
  }

  private setMentor() {
    const mentorId = this.thesis.board.professors.find(value => {
      return value.function == "MENTOR" ? value : null;
    }).boardFunctionId.professorId;
    this.dataService.getMentor(mentorId).subscribe(value => {
      this.mentor = value;
    });
  }

  ngAfterContentInit(): void {
  }

  private patchValue() {
    const pipe = new DatePipe('en-GB short');
    this.thesisForm.patchValue({
      ...this.thesis,
      dateOfThesisDefence: pipe.transform(this.thesis.dateOfThesisDefence),
      dateOfReception: pipe.transform(this.thesis.dateOfReception),
      dateOfBoardFormation: pipe.transform(this.thesis.dateOfBoardFormation),
      dateOfSubmission: pipe.transform(this.thesis.dateOfSubmission),
    });
  }


  // private buildForm() {
  //   this.thesisForm = this.fb.group(
  //     {
  //       title: this.thesis.title,
  //       grade: this.thesis.grade ? this.thesis.grade : 0,
  //       dateOfThesisDefence: this.thesis.dateOfThesisDefence ?this.thesis.dateOfThesisDefence : '' ,
  //       dateOfReception: this.thesis.dateOfReception ? this.thesis.dateOfReception : '' ,
  //       dateOfBoardFormation: this.thesis.dateOfReception ? this.thesis.dateOfReception : '' ,
  //       dateThesisDefended:this.thesis.dateOfReception ? this.thesis.dateOfReception : '' ,
  //       dateOfSubmission: this.thesis.dateOfReception ? this.thesis.dateOfReception : '' ,
  //     });
  // }


}
