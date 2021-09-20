import {UserProfilePayload} from "./userProfile.payload";

export interface NotificationPayload {
  notificationId: bigint;
  topic: string;
  message: string;
  createdAt: Date;
  isRead: boolean;
  sender: UserProfilePayload;
  user: UserProfilePayload;

}
