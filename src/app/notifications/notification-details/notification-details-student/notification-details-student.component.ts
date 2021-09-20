import {AfterContentInit, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ThesisPayload} from "../../../shared/dto/thesis.payload";
import {NotificationPayload} from "../../../shared/dto/Notification.payload";
import {DataService} from "../../../shared/data.service";
import {ActivatedRoute} from "@angular/router";
import {NotificationService} from "../../notification.service";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-notification-details-student',
  templateUrl: './notification-details-student.component.html',
  styleUrls: ['./notification-details-student.component.css']
})
export class NotificationDetailsStudentComponent implements OnInit, AfterContentInit {
  notif: NotificationPayload;
  id: number;
  thesisForm: FormGroup;
  thesis: ThesisPayload;
  selectedIndex: number;

  constructor(private fb: FormBuilder,
              private dataService: DataService,
              private route: ActivatedRoute,
              private notifService: NotificationService) {

  }


  ngOnInit(): void {
    this.buildForm();
    this.route.params.subscribe(
      params => {
        this.id = +params['id'];
        this.notif = this.notifService.getNotification(this.id);
        this.fetchThesisData();
        this.setThesis();
        this.patchValue();
      });
    this.setThesis();
  }

  ngAfterContentInit(): void {
    this.patchValue();
  }


  private fetchThesisData() {
    this.dataService.getThesis();
  }


  private setThesis() {
    this.notifService.thesisChanged.subscribe(value => {
      this.thesis = value;
    });
    this.thesis = this.notifService.getThesis();
  }

  private buildForm() {
    this.thesisForm = this.fb.group(
      {
        title: "",
        grade: "",
        dateOfThesisDefence: "",
        dateOfReception: "",
        dateOfBoardFormation: "",
        dateThesisDefended: "",
        dateOfSubmission: ""
      });
  }

  private patchValue() {
    const pipe = new DatePipe('en-GB short');
    this.thesisForm.patchValue({
      ...this.thesis,
      dateOfThesisDefence: pipe.transform(this.thesis.dateOfThesisDefence),
      dateOfReception: pipe.transform(this.thesis.dateOfReception),
      dateOfBoardFormation: pipe.transform(this.thesis.dateOfBoardFormation),
      dateOfSubmission: pipe.transform(this.thesis.dateOfSubmission),
    });
  }
}
