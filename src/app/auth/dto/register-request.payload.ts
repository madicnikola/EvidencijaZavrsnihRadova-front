export interface RegisterRequestPayload {
  name: string;
  surname: string;
  birthDate: Date;

  email: string;
  username: string;
  password: string;

  role: string;
}
