import {VisibilityStatus} from "../model/progress-status.model";
import {ThesisPayload} from "./thesis.payload";

export interface documentType {
  documentTypeId: bigint;
  name: string;
}


export interface DocumentPayload {
  documentId: number;
  name: string;
  description: string;
  status: VisibilityStatus;
  fileLocation: string;
  fileType: string;
  documentType: DocumentType;
  finalThesis: ThesisPayload;
}
