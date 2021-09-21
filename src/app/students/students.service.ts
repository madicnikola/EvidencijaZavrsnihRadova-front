import {Injectable} from '@angular/core';
import {Subject} from "rxjs";
import {ProfessorPayload} from "../shared/dto/professor.payload";
import {StudentPayload} from "../shared/dto/student.payload";
import {Student} from "../shared/model/student.model";

@Injectable({
  providedIn: 'root'
})
export class StudentsService {
  studentChanged = new Subject<StudentPayload[]>();
  private students: StudentPayload[] = [];

  constructor() {
  }

  setstudents(students: StudentPayload[]) {
    this.students = students;
    this.studentChanged.next(students.slice());
  }

  getstudents() {
    return this.students.slice();
  }

  getStudent(index: number) {
    return this.students[index];
  }
}
