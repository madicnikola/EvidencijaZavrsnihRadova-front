import {Component, OnDestroy, OnInit} from '@angular/core';
import {NotificationPayload} from "../../../shared/dto/Notification.payload";
import {ActivatedRoute, Router} from "@angular/router";
import {NotificationService} from "../../notification.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DataService} from "../../../shared/data.service";
import {DialogComponent} from "../../../shared/dialog/dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {Student} from "../../../shared/model/student.model";
import {Subscription} from "rxjs";
import {ThesisPayload} from "../../../shared/dto/thesis.payload";

@Component({
  selector: 'app-notification-details-professor',
  templateUrl: './notification-details-professor.component.html',
  styleUrls: ['./notification-details-professor.component.css']
})
export class NotificationDetailsProfessorComponent implements OnInit {

  notif: NotificationPayload;
  thesis: ThesisPayload;
  id: number;
  thesisTitleForm: FormGroup;
  student: Student;
  subscription: Subscription;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private notifService: NotificationService,
              private fb: FormBuilder,
              private dataService: DataService,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {

    this.route.params.subscribe(
      params => {
        this.id = +params['id'];
        this.notif = this.notifService.getNotification(this.id);
        this.fetchData();
      });
    this.thesisTitleForm = this.fb.group({
      title: ['', Validators.required]
    });
    this.notifService.studentChanged.subscribe(value => {
      this.student = value;
    });
    this.notifService.thesisChanged.subscribe(value => {
      this.thesis = value;
    });

    this.student = this.notifService.getStudent();
  }

  onTitleSubmit() {
    if (!this.thesisTitleForm.valid)
      return;
    const username = this.notif.sender.username;
    const title = this.thesisTitleForm.value.title;
    this.dataService.setTitle(username, title);
  }

  private fetchData() {
    this.dataService.getStudent(this.notif.sender.username);
    this.dataService.getThesisByStudentUserName(this.notif.sender.username);
  }

}
