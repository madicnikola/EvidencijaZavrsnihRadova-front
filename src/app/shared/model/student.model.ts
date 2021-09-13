import {Person} from "./person.model";

export interface Department {
  id: bigint;
  name: string;
}

export interface Student extends Person {
  indexNumber: string;
  department: Department;
  degreeOfStudy: string;
}
