import {Component, Input, OnChanges, OnDestroy, OnInit} from '@angular/core';
import {DataService} from "../../shared/data.service";
import {ThesisPayload} from "../../shared/dto/thesis.payload";
import {ProfessorPayload} from "../../shared/dto/professor.payload";
import {Subscription} from "rxjs";
import {ThesesStaffService} from "../../theses-staff/theses-staff.service";

@Component({
  selector: 'app-thesis-detail-view',
  templateUrl: './thesis-detail-view.component.html',
  styleUrls: ['./thesis-detail-view.component.css']
})
export class ThesisDetailViewComponent implements OnInit, OnChanges, OnDestroy {
  @Input() thesis: ThesisPayload;
  mentor: ProfessorPayload;
  boardMembers: ProfessorPayload[];
  selectedIndex = 0;
  private registeredEventsSubscription: Subscription;
  private boardMembersSub: Subscription;

  constructor(private dataService: DataService,
              private thesesStaffService: ThesesStaffService) {
  }

  ngOnInit(): void {
   this.boardMembersSub =  this.thesesStaffService.boardMembersSubject.subscribe(value => {
      this.boardMembers = value;
    })
  }

  ngOnChanges(changes): void {
    if (changes.thesis && this.thesis) {
      this.setMentor();
    }
  }

  private setMentor() {
    const mentorId = this.thesis.board.professors.find(value => {
      return value.function == "MENTOR" ? value : null;
    }).boardFunctionId.professorId;
    let boardFunctions = this.thesis.board.professors.filter(value => value.function == "BOARD_MEMBER");
    let boardMemberIds = boardFunctions.map(value => {
      return value.boardFunctionId.professorId
    });
    this.boardMembersSub =
    //   this.dataService.getBoardMembers(boardMemberIds).subscribe(value => {
    //   this.boardMembers = value;
    // });
      this.dataService.getBoardMembers(boardMemberIds);
    this.registeredEventsSubscription = this.dataService.getMentor(mentorId).subscribe(value => {
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
  ngOnDestroy(): void {
    if(this.boardMembersSub){
      this.boardMembersSub.unsubscribe();
    }
  }
}
