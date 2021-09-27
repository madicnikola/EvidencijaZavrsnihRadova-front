import {Injectable} from '@angular/core';
import {BehaviorSubject, Subject} from "rxjs";
import {ThesisPayload} from "../shared/dto/thesis.payload";
import {ProfessorPayload} from "../shared/dto/professor.payload";
import {take, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ThesesStaffService {
  thesesChanged = new Subject<ThesisPayload[]>();
  private theses: ThesisPayload[] = [];
  thesisUpdated = new Subject<ThesisPayload>();
  private boardMemberOptions: ProfessorPayload[];
  boardMemberOptionsChanged = new Subject<ProfessorPayload[]>();
  boardMembersSubject = new Subject<ProfessorPayload[]>();
  boardMembers: ProfessorPayload[] = [];


  constructor() {
  }

  setTheses(theses: ThesisPayload[]) {
    this.theses = theses;
    this.thesesChanged.next(this.theses.slice());
  }

  getTheses() {
    return this.theses.slice();
  }

  getThesis(index: number) {
    return this.theses[index];
  }


  setUpdatedThesis(thesis: ThesisPayload) {
    this.theses = this.theses.map(value => {
      if (value.graduateThesisId == thesis.graduateThesisId) {
        return thesis;
      } else {
        return value;
      }
    });
    this.thesisUpdated.next(thesis);
    this.thesesChanged.next(this.theses);

  }

  setBoardMemberOptions(professors: ProfessorPayload[]) {
    this.boardMemberOptions = professors;
    this.boardMemberOptionsChanged.next(this.boardMemberOptions.slice());
  }


  getBoardMemberOptions() {
    return this.boardMemberOptions.slice();
  }

  getBoardMemberOption(index: number) {
    return this.boardMemberOptions[index];
  }

  setNewBoardMember(professor: ProfessorPayload) {
    let professors = this.getBoardMembers();
    professors.push(professor);
    this.setBoardMembers(professors);
    console.log(professors);
    // this.boardMembersSubject.pipe(take(1),tap(x => {
    //   professors = x;
    //   professors.push(professor);
    //   console.log(professors);
    //   this.boardMembersSubject.next(professors);
    // }));
  }

  setBoardMembers(professors: ProfessorPayload[]) {
    this.boardMembers = professors;
    this.boardMembersSubject.next(this.boardMembers.slice());
  }

  getBoardMembers() {
    return this.boardMembers.slice();
  }
}
