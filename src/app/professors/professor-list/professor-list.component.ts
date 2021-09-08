import { Component, OnInit } from '@angular/core';
import {Professor} from "../../shared/model/professor.model";
import {Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-professor-list',
  templateUrl: './professor-list.component.html',
  styleUrls: ['./professor-list.component.css']
})
export class ProfessorListComponent implements OnInit {
  professors: Professor[];
  subscription: Subscription;


  constructor(private router: Router,
              private route: ActivatedRoute) {
  }


  ngOnInit(): void {

  }

}
