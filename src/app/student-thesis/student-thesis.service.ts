import {Injectable} from '@angular/core';
import {DataService} from "../shared/data.service";
import {Subject} from "rxjs";
import {Thesis} from "../shared/model/thesis.model";

@Injectable({
  providedIn: 'root'
})
export class StudentThesisService {
  thesisChanged = new Subject<Thesis>();
  private thesis: Thesis;

  constructor() {
  }


  setThesis(thesis: Thesis) {
    this.thesis = thesis;
    this.thesisChanged.next(thesis);
  }

  getThesis() {
    return this.thesis;
  }
}
