import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import {Thesis} from "../shared/model/thesis.model";

@Injectable({
  providedIn: 'root'
})
export class ThesesService {
  thesesChanged = new Subject<Thesis[]>();
  private theses: Thesis[] = [];

  constructor() { }

  setTheses(theses: Thesis[]) {
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
