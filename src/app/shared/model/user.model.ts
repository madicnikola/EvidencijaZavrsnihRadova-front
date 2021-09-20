import {Role} from "./role";

export interface UserProfile {
  userProfileId: bigint;
  username: string;
  email: string;
  role: Role;
  token?: string;
}
