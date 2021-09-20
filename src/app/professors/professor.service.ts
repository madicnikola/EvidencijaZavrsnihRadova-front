import {Injectable} from '@angular/core';
import {Professor} from "../shared/model/professor.model";
import {Subject} from "rxjs";
import {ProfessorPayload} from "../shared/dto/professor.payload";

@Injectable({
  providedIn: 'root'
})
export class ProfessorService {
  profChanged = new Subject<ProfessorPayload[]>();
  private professors: ProfessorPayload[] = [];

  constructor() {
  }

  setProfessors(professors: ProfessorPayload[]) {
    this.professors = professors;
    this.profChanged.next(professors.slice());
  }

  getProfessors() {
    return this.professors.slice();
  }

  getProfessor(index: number) {
    return this.professors[index];
  }
}
