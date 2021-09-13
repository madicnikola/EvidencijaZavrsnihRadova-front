import {Person} from "./person.model";

export interface Title {
  id: bigint;
  name: string;
}

export interface AcademicRank {
  id: bigint;
  name: string;
}

export interface Professor extends Person {
  academicRank: AcademicRank;
  title: Title;
}
