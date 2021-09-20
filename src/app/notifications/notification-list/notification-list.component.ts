import {Component, OnDestroy, OnInit} from '@angular/core';
import {NotificationPayload} from "../../shared/dto/Notification.payload";
import {Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {DataService} from "../../shared/data.service";
import {NotificationService} from "../notification.service";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.css']
})
export class NotificationListComponent implements OnInit, OnDestroy {
  notifications: NotificationPayload[];
  subscription: Subscription;
  searchText: string;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private dataService: DataService,
              private notificationService: NotificationService,
              private datePipe: DatePipe) {

  }

  ngOnInit(): void {
    this.fetchData();
    this.subscription = this.notificationService.notifChanged.subscribe(value => {
      this.notifications = value;
    });
    this.notifications = this.notificationService.getNotifications();
  }

  private fetchData() {
    this.dataService.getAllNotifs();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
