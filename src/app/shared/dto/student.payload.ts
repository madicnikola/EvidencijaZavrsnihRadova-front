import {PersonPayload} from "./person.payload";

export interface Department {
  id: bigint;
  name: string;
}

export interface StudentPayload extends PersonPayload {
  indexNumber: string;
  department: Department;
  degreeOfStudy: string;
}
