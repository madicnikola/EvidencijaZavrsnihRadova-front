import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {DataService} from "../shared/data.service";
import {StudentThesisService} from "./student-thesis.service";
import {Thesis} from "../shared/model/thesis.model";
import {Subscription} from "rxjs";
import {ThesisPayload} from "../shared/dto/thesis.payload";

@Component({
  selector: 'app-student-thesis',
  templateUrl: './student-thesis.component.html',
  styleUrls: ['./student-thesis.component.css']
})
export class StudentThesisComponent implements OnInit {

  thesis: ThesisPayload;
  @Input() input: ThesisPayload;
  subscription: Subscription;


  constructor(private stService: StudentThesisService,
              private dataService: DataService) {
  }

  ngOnInit(): void {
    if (this.input) {
      this.thesis = this.input;
    } else {
      this.dataService.getMyThesis()
        .subscribe(thesis => {
          this.stService.setThesis(thesis);
          this.thesis = thesis;
        });
      this.thesis = this.stService.getThesis();
    }
  }


  isJustStarted() {
    if (this.thesis) {
      return this.thesis.progressStatus == 'INITIAL';
    }
    return false;
  }

  isInProgress() {
    if (this.thesis) {
      return this.thesis.progressStatus == 'IN_PROGRESS';
    }
    return false;

  }
}
