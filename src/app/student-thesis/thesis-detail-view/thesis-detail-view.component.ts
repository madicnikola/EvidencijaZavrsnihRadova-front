import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {DataService} from "../../shared/data.service";
import {ThesisPayload} from "../../shared/dto/thesis.payload";
import {ProfessorPayload} from "../../shared/dto/professor.payload";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-thesis-detail-view',
  templateUrl: './thesis-detail-view.component.html',
  styleUrls: ['./thesis-detail-view.component.css']
})
export class ThesisDetailViewComponent implements OnInit, OnChanges {
  @Input() thesis: ThesisPayload;
  mentor: ProfessorPayload;
  selectedIndex = 0;
  private registeredEventsSubscription: Subscription;

  constructor(private dataService: DataService) {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes): void {
    if (changes.thesis && this.thesis) {
      this.setMentor();
    }
  }

  private setMentor() {
    const mentorId = this.thesis.board.professors.find(value => {
      return value.function == "MENTOR" ? value : null;
    }).boardFunctionId.professorId;
    this.registeredEventsSubscription = this.dataService.getMentor(mentorId).subscribe(value => {
      this.mentor = value;
    });
  }

  // private patchValue() {
  //   const pipe = new DatePipe('en-GB short');
  //   this.thesisForm.patchValue({
  //     ...this.thesis,
  //     dateOfThesisDefence: pipe.transform(this.thesis.dateOfThesisDefence),
  //     dateOfReception: pipe.transform(this.thesis.dateOfReception),
  //     dateOfBoardFormation: pipe.transform(this.thesis.dateOfBoardFormation),
  //     dateOfSubmission: pipe.transform(this.thesis.dateOfSubmission),
  //   });
  // }

}
