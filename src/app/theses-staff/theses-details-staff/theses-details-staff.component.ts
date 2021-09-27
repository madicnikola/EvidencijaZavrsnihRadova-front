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
import {MatDialog} from "@angular/material/dialog";
import {DialogComponent} from "../../shared/dialog/dialog.component";
import {BigInteger} from "@angular/compiler/src/i18n/big_integer";

@Component({
  selector: 'app-theses-details-staff',
  templateUrl: './theses-details-staff.component.html',
  styleUrls: ['./theses-details-staff.component.css']
})
export class ThesesDetailsStaffComponent implements OnInit {
  thesis: ThesisPayload;
  id: number;
  thesisForm: FormGroup;
  boardMembersForm: FormGroup;
  BoardMemberOptions: ProfessorPayload[];
  boardMembers: ProfessorPayload[];
  boardMemberIds: number[];
  datePipe: DatePipe = new DatePipe('en-US');
  showNewMemberControl: boolean = true;

  constructor(private thesesStaffService: ThesesStaffService,
              private router: Router,
              private route: ActivatedRoute,
              private fb: FormBuilder,
              private dataService: DataService,
              private matDialog: MatDialog) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(
      params => {
        this.id = +params['id'];
        this.thesis = this.thesesStaffService.getThesis(this.id);
        this.buildForm();
        this.buildBoardMembersForm();
        this.getBoardMembersOptions(this.thesis);
        this.getBoardMembers();
        this.thesesStaffService.boardMembersSubject.subscribe(value => {
          this.boardMembers = value;
        });
      });
  }

  private getBoardMembers() {
    //   this.dataService.getBoardMembers(boardMemberIds).subscribe(value => {
    //   this.boardMembers = value;
    // });
    let boardFunctions = this.thesis.board.professors.filter(value => value.function == "BOARD_MEMBER");
    this.boardMemberIds = boardFunctions.map(value => {
      return value.boardFunctionId.professorId
    });
    this.dataService.getBoardMembers(this.boardMemberIds).subscribe();

  }

  // ngAfterViewInit(): void {
  //   this.thesisSubject.next(this.thesis);
  //   this.thesisSubject.pipe(take(1)).subscribe(value => {
  //     this.thesis = value;
  //     // this.buildForm();
  //   });
  // }

  displayFn(prof: ProfessorPayload): string {
    return prof && prof.name ? prof.title.name + ' ' + prof.name + ' ' + prof.surname : '';
  }

  private buildForm() {
    let format = 'yyyy-MM-dd';
    this.thesisForm = this.fb.group(
      {
        graduateThesisId: this.thesis.graduateThesisId,
        title: this.thesis.title,
        grade: this.thesis.grade == 0 ? '' : this.thesis.grade,
        dateOfThesisDefence: [this.datePipe.transform(this.thesis.dateOfThesisDefence, format)],
        dateOfReception: this.datePipe.transform(this.thesis.dateOfReception, format),
        dateOfBoardFormation: this.datePipe.transform(this.thesis.dateOfBoardFormation, format),
        dateThesisDefended: this.datePipe.transform(this.thesis.dateOfThesisDefence, format),
        dateOfThesisSubmission: this.datePipe.transform(this.thesis.dateOfThesisSubmission, format),
        faculty: this.thesis.faculty,
        studentName: this.thesis.student.name,
        studentSurname: this.thesis.student.surname,
        studentIndexNumber: this.thesis.student.indexNumber,
        visibilityStatus: this.thesis.visibilityStatus == 'PUBLISHED' ? 'OBJAVLJEN' : 'NEOBJAVLJEN',
        departmentName: this.thesis.student.department.name,
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
    update.visibilityStatus = this.thesis.visibilityStatus;

    delete update.studentIndexNumber;
    delete update.studentName;
    delete update.studentSurname;

    this.dataService.updateThesis(update, this.thesis.graduateThesisId);

  }

  onAddNewBoardMember() {
    const professor = this.boardMembersForm.value.boardMember;
    console.log(professor);
    if (this.boardMembers.find(value => value.personId == professor.personId)) {
      this.matDialog.open(DialogComponent, {
        data: {title: "Greška", message: "Član je već dodat u komisiju!"}
      });
      return;
    }
    this.dataService.setBoardMember(this.thesis.board.boardId + '', professor.personId + '').subscribe(value => {
      const professorPayloads = this.BoardMemberOptions.filter(value1 => value1.personId !== value.personId);
      this.thesesStaffService.setBoardMemberOptions(professorPayloads);
      this.thesis.board.professors.push({
        function: "BOARD_MEMBER",
        joinDate: new Date(),
        boardFunctionId: {professorId: Number(value.personId), boardId: Number(this.thesis.board.boardId)}
      });
      this.thesesStaffService.setUpdatedThesis(this.thesis);
    });
  }


  private getBoardMembersOptions(thesis: ThesisPayload) {
    this.dataService.getBoardMembersOptions(thesis.graduateThesisId);
    this.thesesStaffService.boardMemberOptionsChanged.subscribe(value => {
      this.BoardMemberOptions = value;
    });
  }
}
