import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from "../../auth/auth.service";
import {ThesisPayload} from "../../shared/dto/thesis.payload";
import {DataService} from "../../shared/data.service";
import {NotificationService} from "../notification.service";

@Component({
  selector: 'app-notification-details',
  templateUrl: './notification-details.component.html',
  styleUrls: ['./notification-details.component.css']
})
export class NotificationDetailsComponent implements OnInit {
  thesis: ThesisPayload;

  constructor(public authService: AuthService,
              private dataService: DataService,
              private notifService: NotificationService
  ) {
  }

  ngOnInit(): void {
    if (this.authService.isAuthorized(['student'])) {
      this.fetchThesisData();
    }
    this.notifService.thesisChanged.subscribe(value => {
      this.thesis = value;
    });

  }


  private fetchThesisData() {
    this.dataService.getThesis();
    this.thesis = this.notifService.getThesis();
  }

}
