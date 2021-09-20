import {Component, Input, OnInit} from '@angular/core';
import {ProfessorPayload} from "../../../shared/dto/professor.payload";

@Component({
  selector: 'app-professor-item',
  templateUrl: './professor-item.component.html',
  styleUrls: ['./professor-item.component.css']
})
export class ProfessorItemComponent implements OnInit {
  @Input() professor: ProfessorPayload;
  @Input() index: number;
  constructor() { }

  ngOnInit(): void {
  }

}
