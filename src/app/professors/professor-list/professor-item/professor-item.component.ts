import {Component, Input, OnInit} from '@angular/core';
import {Professor} from "../../../shared/model/professor.model";

@Component({
  selector: 'app-professor-item',
  templateUrl: './professor-item.component.html',
  styleUrls: ['./professor-item.component.css']
})
export class ProfessorItemComponent implements OnInit {
  @Input() professor: Professor;
  @Input() index: number;
  constructor() { }

  ngOnInit(): void {
  }

}
