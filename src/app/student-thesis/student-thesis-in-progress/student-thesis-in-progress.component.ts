import {AfterContentInit, Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ThesisPayload} from "../../shared/dto/thesis.payload";
import {DatePipe} from "@angular/common";
import {DataService} from "../../shared/data.service";
import {StudentThesisService} from "../student-thesis.service";

@Component({
  selector: 'app-student-thesis-in-progress',
  templateUrl: './student-thesis-in-progress.component.html',
  styleUrls: ['./student-thesis-in-progress.component.css']
})
export class StudentThesisInProgressComponent implements OnInit,AfterContentInit {
  thesisForm: FormGroup;
  @Input() thesis: ThesisPayload;
  selectedIndex: number;

  constructor(private dataService: DataService,
              private studentThesis: StudentThesisService,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.buildForm();
  }

  ngAfterContentInit(): void {
    this.patchValue();
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


  private buildForm() {
    this.thesisForm = this.fb.group(
      {
        title: "",
        grade: "",
        dateOfThesisDefence: "",
        dateOfReception: "",
        dateOfBoardFormation: "",
        dateThesisDefended: "",
        dateOfSubmission: ""
      });
  }
}
