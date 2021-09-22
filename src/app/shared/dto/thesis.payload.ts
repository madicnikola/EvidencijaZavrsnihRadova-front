import {Student} from "../model/student.model";
import {ProgressStatus, VisibilityStatus} from "../model/progress-status.model";

export interface BoardFunction {
  boardFunctionId: { professorId: number, boardId: number };
  function: string;
  joinDate: Date;

}


export interface Board {
  numberOfMembers: number;
  dateOfFormation: Date;
  professors: BoardFunction[];
}

export interface ThesisPayload {
  thesisId: bigint;
  title: string;
  faculty: string;
  description: string;
  dateOfReception: Date;
  dateOfBoardFormation: Date;
  dateOfThesisDefence: Date;
  dateOfSubmission: Date;
  progressStatus: ProgressStatus;
  visibilityStatus: VisibilityStatus;
  grade: number;
  student: Student;
  board: Board;
}
