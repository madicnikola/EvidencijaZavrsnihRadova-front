import {Injectable} from '@angular/core';
import {Subject} from "rxjs";
import {ThesisPayload} from "../shared/dto/thesis.payload";

@Injectable({
  providedIn: 'root'
})
export class ThesesService {
  thesesChanged = new Subject<ThesisPayload[]>();
  private theses: ThesisPayload[] = [];

  constructor() { }

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
}
