import {Component, Input, OnInit} from '@angular/core';
import {ProfessorPayload} from "../../../shared/dto/professor.payload";
import {StudentPayload} from "../../../shared/dto/student.payload";

@Component({
  selector: 'app-student-item',
  templateUrl: './student-item.component.html',
  styleUrls: ['./student-item.component.css']
})
export class StudentItemComponent implements OnInit {
  @Input() student: StudentPayload;
  @Input() index: number;
  constructor() { }

  ngOnInit(): void {
  }

}
