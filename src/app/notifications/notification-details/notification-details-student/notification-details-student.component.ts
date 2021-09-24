import {AfterContentInit, Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ThesisPayload} from "../../../shared/dto/thesis.payload";
import {NotificationPayload} from "../../../shared/dto/Notification.payload";
import {DataService} from "../../../shared/data.service";
import {ActivatedRoute} from "@angular/router";
import {NotificationService} from "../../notification.service";
import {Subject} from "rxjs";
import {take} from "rxjs/operators";

@Component({
  selector: 'app-notification-details-student',
  templateUrl: './notification-details-student.component.html',
  styleUrls: ['./notification-details-student.component.css']
})
export class NotificationDetailsStudentComponent implements OnInit {
  notif: NotificationPayload;
  id: number;
  thesis: ThesisPayload;
  thesisSubject: Subject<ThesisPayload> = new Subject<ThesisPayload>();


  constructor(private fb: FormBuilder,
              private dataService: DataService,
              private route: ActivatedRoute,
              private notifService: NotificationService) {

  }

  ngOnInit(): void {
    this.route.params.subscribe(
      params => {
        this.id = +params['id'];
        this.notif = this.notifService.getNotification(this.id);
        this.thesisSubject.next(this.thesis);
        this.fetchData();
      });
    this.notifService.thesisChanged.subscribe(value => {
      this.thesis = value;
    });
  }


  private fetchData() {
    this.dataService.getThesisByStudentUserName(this.notif.user.username);
  }
}
