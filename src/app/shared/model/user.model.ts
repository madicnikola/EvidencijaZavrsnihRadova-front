import {Role} from "./role";

export class User {
  userProfileId: bigint;
  username: string;
  email: string;
  role: Role;
  token?: string;
}
