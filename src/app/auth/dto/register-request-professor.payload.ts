import {RegisterRequestPayload} from "./register-request.payload";

export interface RegisterRequestProfessorPayload  extends RegisterRequestPayload{
  academicRank: string;
  title: string;
}
