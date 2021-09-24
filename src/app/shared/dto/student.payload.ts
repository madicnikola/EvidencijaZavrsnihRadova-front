import {PersonPayload} from "./person.payload";
import {ProfessorPayload} from "./professor.payload";

export interface Department {
  id: bigint;
  name: string;
}

export interface StudentPayload extends PersonPayload {
  indexNumber: string;
  department: Department;
  degreeOfStudy: string;
  mentor: ProfessorPayload;
}
