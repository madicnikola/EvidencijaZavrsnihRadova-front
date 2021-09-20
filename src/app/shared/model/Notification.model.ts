import {UserProfile} from "./user.model";

export interface AppNotification {
   notificationId: bigint;
   topic: string;
   message: string;
   createdAt: Date;
   isRead: boolean;
   user: UserProfile;

}
