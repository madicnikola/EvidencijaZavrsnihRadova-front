import {Component, Input, OnInit} from '@angular/core';
import {NotificationPayload} from "../../../shared/dto/Notification.payload";

@Component({
  selector: 'app-notification-item',
  templateUrl: './notification-item.component.html',
  styleUrls: ['./notification-item.component.css']
})
export class NotificationItemComponent implements OnInit {
  @Input() notification: NotificationPayload;
  @Input() index: number;

  constructor() {
  }

  ngOnInit(): void {
  }

}
