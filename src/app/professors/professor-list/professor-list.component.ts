import {Component, OnDestroy, OnInit} from '@angular/core';
import {Professor} from "../../shared/model/professor.model";
import {Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {DataService} from "../../shared/data.service";
import {ProfessorService} from "../professor.service";
import {ProfessorPayload} from "../../shared/dto/professor.payload";

@Component({
  selector: 'app-professor-list',
  templateUrl: './professor-list.component.html',
  styleUrls: ['./professor-list.component.css']
})
export class ProfessorListComponent implements OnInit, OnDestroy {
  professors: ProfessorPayload[];
  subscription: Subscription;
  searchText: string;


  constructor(private router: Router,
              private route: ActivatedRoute,
              private dataService: DataService,
              private professorService: ProfessorService) {

  }


  ngOnInit(): void {
    this.fetchData();
    this.subscription = this.professorService.profChanged.subscribe(
      value => {
        this.professors = value;
      }
    );
    this.professors = this.professorService.getProfessors();
  }


  private fetchData() {
    this.dataService.getAllProfessors();
  }

  ngOnDestroy() {
  }
}
