import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ThesesService} from "../../theses/theses.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ThesesStaffService} from "../theses-staff.service";
import {ThesisPayload} from "../../shared/dto/thesis.payload";
import {Subject, Subscription} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {take} from "rxjs/operators";
import {DatePipe} from "@angular/common";
import {DataService} from "../../shared/data.service";
import {ProfessorPayload} from "../../shared/dto/professor.payload";

@Component({
  selector: 'app-theses-details-staff',
  templateUrl: './theses-details-staff.component.html',
  styleUrls: ['./theses-details-staff.component.css']
})
export class ThesesDetailsStaffComponent implements OnInit, AfterViewInit {
  thesis: ThesisPayload;
  id: number;
  changed: Subject<string> = new Subject<string>();
  thesisSubject = new Subject<ThesisPayload>();
  private sub: Subscription;
  thesisForm: FormGroup;
  boardMembersForm: FormGroup;
  BoardMemberOptionsString: string[] = [];
  BoardMemberOptions: ProfessorPayload[];

  datePipe: DatePipe = new DatePipe('en-US');
  showNewMemberControl: boolean = false;


  constructor(private thesesStaffService: ThesesStaffService,
              private router: Router,
              private route: ActivatedRoute,
              private fb: FormBuilder,
              private dataService: DataService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(
      params => {
        this.id = +params['id'];
        this.thesis = this.thesesStaffService.getThesis(this.id);
        this.changed.next('next');
        this.thesisSubject.next(this.thesis);
        this.buildForm();
        this.buildBoardMembersForm();
        this.getBoardMembersOptions(this.thesis);

      });
    this.thesisSubject.next(this.thesis);
    this.thesesStaffService.thesisUpdated.subscribe(value => {
      this.thesis = this.thesesStaffService.getThesis(this.id);
    });

  }

  ngAfterViewInit(): void {
    this.thesisSubject.next(this.thesis);
    this.thesisSubject.pipe(take(1)).subscribe(value => {
      this.thesis = value;
      // this.buildForm();
    });
  }

  private buildForm() {
    let format = 'dd-MM-yyyy';
    this.thesisForm = this.fb.group(
      {
        graduateThesisId: this.thesis.graduateThesisId,
        title: this.thesis.title,
        grade: this.thesis.grade,
        dateOfThesisDefence: [this.datePipe.transform(this.thesis.dateOfThesisDefence, format)],
        dateOfReception: this.datePipe.transform(this.thesis.dateOfReception, format),
        dateOfBoardFormation: this.datePipe.transform(this.thesis.dateOfBoardFormation, format),
        dateThesisDefended: this.datePipe.transform(this.thesis.dateOfThesisDefence, format),
        dateOfThesisSubmission: this.datePipe.transform(this.thesis.dateOfThesisSubmission, format),
        faculty: this.thesis.faculty,
        progressStatus: this.thesis.progressStatus,
        visibilityStatus: this.thesis.visibilityStatus,
        studentName: this.thesis.student.name,
        studentSurname: this.thesis.student.surname,
        studentIndexNumber: this.thesis.student.indexNumber,
      });
  }

  private buildBoardMembersForm() {
    this.boardMembersForm = this.fb.group(
      {
        boardMember: "",
      });
  }


  onSubmit() {
    const update = {
      ...this.thesis, ...this.thesisForm.value,
      dateOfThesisDefence: Date.parse(this.thesisForm.value.dateOfThesisDefence),
      dateOfBoardFormation: Date.parse(this.thesisForm.value.dateOfBoardFormation),
      dateOfReception: Date.parse(this.thesisForm.value.dateOfReception),
      dateOfThesisSubmission: Date.parse(this.thesisForm.value.dateOfThesisSubmission)
    };
    delete update.studentIndexNumber;
    delete update.studentName;
    delete update.studentSurname;

    this.dataService.updateThesis(update, this.thesis.graduateThesisId);
  }

  onAddNewBoardMember() {
    this.showNewMemberControl = true;
  }

  onBoardMembersFormSubmit() {

  }

  private getBoardMembersOptions(thesis: ThesisPayload) {
    this.dataService.getBoardMembersOptions(thesis.graduateThesisId);
    this.thesesStaffService.boardMemberOptionsChanged.subscribe(value => {
      this.BoardMemberOptions = value;
      this.BoardMemberOptionsString = [];
      this.BoardMemberOptions.forEach(option => {
        let stringOption = option.title.name + " " + option.name + " " + option.surname;
        this.BoardMemberOptionsString.push(stringOption);
      })
    });
  }
}
