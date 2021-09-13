import {PersonPayload} from "./person.payload";
import {AcademicRank, Title} from "../model/professor.model";

export interface ProfessorPayload extends PersonPayload {
  academicRank: AcademicRank;
  title: Title;
}
