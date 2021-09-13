import {Component, Input, OnInit} from '@angular/core';
import {Thesis} from "../../../shared/model/thesis.model";

@Component({
  selector: 'app-thesis-item',
  templateUrl: './thesis-item.component.html',
  styleUrls: ['./thesis-item.component.css']
})
export class ThesisItemComponent implements OnInit {
  @Input() thesis: Thesis;
  @Input() index: number;

  constructor() { }

  ngOnInit(): void {

  }

}
