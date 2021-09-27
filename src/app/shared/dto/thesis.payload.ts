import {Student} from "../model/student.model";
import {ProgressStatus, VisibilityStatus} from "../model/progress-status.model";

export interface BoardFunction {
  boardFunctionId: { professorId: number, boardId: number };
  function: string;
  joinDate: Date;

}


export interface Board {
  boardId: bigint;
  numberOfMembers: number;
  dateOfFormation: Date;
  professors: BoardFunction[];
}

export interface ThesisPayload {
  graduateThesisId: bigint;
  title: string;
  grade?: number;
  faculty: string;
  description: string;
  dateOfReception: Date;
  dateOfBoardFormation: Date;
  dateOfThesisDefence: Date;
  dateOfThesisSubmission: Date;
  progressStatus: ProgressStatus;
  visibilityStatus: VisibilityStatus;
  student: Student;
  board: Board;
}
