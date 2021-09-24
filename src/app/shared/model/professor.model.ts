import {Person} from "./person.model";

export interface Title {
  titleId: bigint;
  name: string;
}

export interface AcademicRank {
  academicRankId: bigint;
  name: string;
}

export interface Professor extends Person {
  academicRank: AcademicRank;
  title: Title;
}
