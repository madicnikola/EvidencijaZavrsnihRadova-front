import {Component, OnInit} from '@angular/core';
import {DataService} from "../../shared/data.service";
import {Professor} from "../../shared/model/professor.model";
import {ProfessorService} from "../professor.service";
import {ActivatedRoute} from "@angular/router";
import {Observable, Subject} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {DialogComponent} from "../../shared/dialog/dialog.component";
import {ProfessorPayload} from "../../shared/dto/professor.payload";

@Component({
  selector: 'app-professor-detail',
  templateUrl: './professor-detail.component.html',
  styleUrls: ['./professor-detail.component.css']
})
export class ProfessorDetailComponent implements OnInit {
  professor: ProfessorPayload;
  message: string;
  messageSubject: Subject<string> = new Subject<string>();
  id: number
  messageReceived: boolean;

  constructor(private dataService: DataService,
              private professorService: ProfessorService,
              private route: ActivatedRoute,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.route.params
      .subscribe(
        params => {
          this.id = +params['id'];
          this.professor = this.professorService.getProfessor(this.id);
        });

  }

  onRequest() {
    this.dataService.sendTitleRequest(this.professor.personId).subscribe(
      value => {
        this.message = value;
        this.messageReceived = true;

        this.messageSubject.next(value);
        this.dialog.open(DialogComponent, {
          data: {title: "Success", message: value}
        });
      });
  }
}
