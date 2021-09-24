import {Component, Input, OnInit} from '@angular/core';
import {ThesisPayload} from "../../../shared/dto/thesis.payload";
import {Subscription} from "rxjs";
import {ThesesService} from "../../../theses/theses.service";
import {DataService} from "../../../shared/data.service";

@Component({
  selector: 'app-theses-item-staff',
  templateUrl: './theses-item-staff.component.html',
  styleUrls: ['./theses-item-staff.component.css']
})
export class ThesesItemStaffComponent implements OnInit {
  @Input() thesis: ThesisPayload;
  @Input() index: number;

  constructor() { }

  ngOnInit(): void {

  }

}
