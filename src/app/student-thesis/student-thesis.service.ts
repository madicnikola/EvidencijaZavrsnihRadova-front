import {Injectable} from '@angular/core';
import {Subject} from "rxjs";
import {ThesisPayload} from "../shared/dto/thesis.payload";

@Injectable({
  providedIn: 'root'
})
export class StudentThesisService {
  thesisChanged = new Subject<ThesisPayload>();
  private thesis: ThesisPayload;
  messageChanged = new Subject<string>();
  private message: string = '';

  constructor() {
  }


  setThesis(thesis: ThesisPayload) {
    this.thesis = thesis;
    this.thesisChanged.next(thesis);
  }

  getThesis() {
    return this.thesis;
  }

  setMessage(message: string) {
    this.message = message;
    this.messageChanged.next(message);
  }

  getMessage(){
    return this.message;
  }
}
