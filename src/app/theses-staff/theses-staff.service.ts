import {Injectable} from '@angular/core';
import {Subject} from "rxjs";
import {ThesisPayload} from "../shared/dto/thesis.payload";
import {ProfessorPayload} from "../shared/dto/professor.payload";

@Injectable({
  providedIn: 'root'
})
export class ThesesStaffService {
  thesesChanged = new Subject<ThesisPayload[]>();
  private theses: ThesisPayload[] = [];
  thesisUpdated = new Subject<ThesisPayload>();
  private boardMemberOptions: ProfessorPayload[];
  boardMemberOptionsChanged = new Subject<ProfessorPayload[]>();


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
}
