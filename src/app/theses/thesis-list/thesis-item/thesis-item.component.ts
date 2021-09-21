import {Component, Input, OnInit} from '@angular/core';
import {ThesisPayload} from "../../../shared/dto/thesis.payload";

@Component({
  selector: 'app-thesis-item',
  templateUrl: './thesis-item.component.html',
  styleUrls: ['./thesis-item.component.css']
})
export class ThesisItemComponent implements OnInit {
  @Input() thesis: ThesisPayload;
  @Input() index: number;

  constructor() { }

  ngOnInit(): void {

  }

}
