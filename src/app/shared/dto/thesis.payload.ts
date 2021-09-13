import {Student} from "../model/student.model";
import {ProgressStatus, VisibilityStatus} from "../model/thesis.model";

export interface ThesisPayload {
  thesisId: bigint;
  title: string;
  faculty: string;
  description: string;
  dateOfReception: Date;
  dateOfBoardFormation: Date;
  dateOfThesisDefence: Date;
  progressStatus: ProgressStatus;
  visibilityStatus: VisibilityStatus;
  student: Student;
}
