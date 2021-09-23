import {Injectable} from '@angular/core';
import {Subject, throwError} from "rxjs";
import {StudentPayload} from "../shared/dto/student.payload";
import {ThesisPayload} from "../shared/dto/thesis.payload";
import {DataService} from "../shared/data.service";
import {AuthService} from "../auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class StudentsService {
  studentChanged = new Subject<StudentPayload[]>();
  private students: StudentPayload[] = [];
  thesisChanged = new Subject<ThesisPayload>();
  private thesis: ThesisPayload;

  constructor(private authService: AuthService) {
  }

  setStudents(students: StudentPayload[]) {
    this.students = students;
    this.studentChanged.next(students.slice());
  }

  getStudents() {
    return this.students.slice();
  }

  getStudent(index: number) {
    return this.students[index];
  }

  setThesis(thesis: ThesisPayload) {
    this.thesis = thesis;
    this.thesisChanged.next(this.thesis);
  }

  getThesis() {
    return this.thesis;
  }
}
