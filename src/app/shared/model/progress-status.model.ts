
export enum VisibilityStatus {
  PRIVATE = 'PRIVATE',
  BOARD_VIEW = 'BOARD_VIEW',
  PUBLISHED = 'PUBLISHED'
}

export enum ProgressStatus {
  INITIAL = 'INITIAL',
  TITLE_NOT_DEFINED = 'TITLE_NOT_DEFINED',
  IN_PROGRESS = 'IN_PROGRESS',
  THESIS_COMPLETED = 'THESIS_COMPLETED',
  BOARD_NOT_SELECTED = 'BOARD_NOT_SELECTED',
  THESIS_DEFENCE_APPOINTED = 'THESIS_DEFENCE_APPOINTED',
  THESIS_DEFENCE_SUCCESSFUL = 'THESIS_DEFENCE_SUCCESSFUL',
}

// export interface Thesis {
//   thesisId: bigint;
//   title: string;
//   faculty: string;
//   description: string;
//   dateOfReception: Date;
//   dateOfBoardFormation: Date;
//   dateOfThesisDefence: Date;
//   progressStatus: ProgressStatus;
//   visibilityStatus: VisibilityStatus;
//   student: Student;
//   board: Board;
//   grade: number;
//   dateOfSubmission: Date;
// }
