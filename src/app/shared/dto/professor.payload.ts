import {PersonPayload} from "./person.payload";
import {AcademicRank, Title} from "../model/professor.model";

export class ProfessorPayload extends PersonPayload {
  academicRank: AcademicRank;
  title: Title;
  department: string;
  cabinet: string;
  phone: string;


  toString(): string {
    return this.title.name + ' ' + super.name + ' ' + super.surname;
  }

}
