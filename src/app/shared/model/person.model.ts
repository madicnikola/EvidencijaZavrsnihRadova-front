import {UserProfile} from "./user.model";

export interface Person {
  personId: bigint;
  name: string;
  surname: string;
  birthDate: Date;
  userProfile: UserProfile;
}
