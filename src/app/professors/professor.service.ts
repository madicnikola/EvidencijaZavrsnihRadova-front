import {Injectable} from '@angular/core';
import {Professor} from "../shared/model/professor.model";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProfessorService {
  profChanged = new Subject<Professor[]>();
  private professors: Professor[] = [];

  constructor() {
  }

  setProfessors(professors: Professor[]) {
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
