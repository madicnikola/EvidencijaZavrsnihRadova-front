import {Injectable} from '@angular/core';
import {Subject} from "rxjs";
import {NotificationPayload} from "../shared/dto/Notification.payload";
import {Student} from "../shared/model/student.model";
import {ThesisPayload} from "../shared/dto/thesis.payload";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  notifChanged = new Subject<NotificationPayload[]>();
  private notifications: NotificationPayload[] = [];
  studentChanged = new Subject<Student>();
  private student: Student;
  thesisChanged = new Subject<ThesisPayload>();
  private thesis: ThesisPayload;


  constructor() {
  }

  setNotifications(notifications: NotificationPayload[]) {
    this.notifications = notifications;
    this.notifChanged.next(this.notifications.slice());
  }

  getNotifications() {
    return this.notifications.slice();
  }

  getNotification(index: number) {
    return this.notifications[index];
  }

  setStudent(student: Student) {
    this.student = student;
    this.studentChanged.next(this.student);
  }

  getStudent() {
    return this.student;
  }

  setThesis(thesis: ThesisPayload) {
    this.thesis = thesis;
    this.thesisChanged.next(this.thesis);
  }

  getThesis() {
    return this.thesis;
  }


}
