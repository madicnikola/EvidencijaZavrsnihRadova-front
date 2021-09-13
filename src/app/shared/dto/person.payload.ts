import {UserProfilePayload} from "./userProfile.payload";

export interface PersonPayload {
  personId: bigint;
  name: string;
  surname: string;
  birthDate: Date;
  userProfile: UserProfilePayload
}
