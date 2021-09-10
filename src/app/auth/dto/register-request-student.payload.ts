import {RegisterRequestPayload} from "./register-request.payload";

export interface RegisterRequestStudentPayload extends RegisterRequestPayload{
  degreeOfStudy: string;
  department: string;
  index: string;
}
