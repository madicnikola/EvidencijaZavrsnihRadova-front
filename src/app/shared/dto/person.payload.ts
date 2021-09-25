import {UserProfilePayload} from "./userProfile.payload";

export class PersonPayload {
  personId: bigint;
  name: string;
  surname: string;
  birthDate: Date;
  userProfile: UserProfilePayload
}
