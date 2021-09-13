import {UserProfilePayload} from "../dto/userProfile.payload";

export interface UserProfile {
  userProfileId: bigint,
  "username": string,
  "email": string,
}

export interface Person {
  personId: bigint;
  name: string;
  surname: string;
  birthDate: Date;
  userProfile: UserProfile;
}
