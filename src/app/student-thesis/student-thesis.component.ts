import {Component, OnInit} from '@angular/core';
import {DataService} from "../shared/data.service";
import {StudentThesisService} from "./student-thesis.service";
import {Thesis} from "../shared/model/thesis.model";

@Component({
  selector: 'app-student-thesis',
  templateUrl: './student-thesis.component.html',
  styleUrls: ['./student-thesis.component.css']
})
export class StudentThesisComponent implements OnInit {
  thesis: Thesis;

  constructor(private stService: StudentThesisService,
              private dataService: DataService) {
  }

  ngOnInit(): void {
    this.dataService.getMyThesis();
  }

  isJustStarted() {
    this.thesis = this.stService.getThesis();
    return this.thesis.progressStatus == 'INITIAL';
  }
}
