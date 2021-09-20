import {Component, OnDestroy, OnInit} from '@angular/core';
import {ThesesService} from "../theses.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Thesis} from "../../shared/model/thesis.model";

@Component({
  selector: 'app-thesis-detail',
  templateUrl: './thesis-detail.component.html',
  styleUrls: ['./thesis-detail.component.css']
})
export class ThesisDetailComponent implements OnInit {
  thesis: Thesis;
  id: number;

  constructor(private thesisService: ThesesService,
              private router: Router,
              private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(
      params => {
        this.id = +params['id'];
        this.thesis = this.thesisService.getThesis(this.id);
      });

  }

}
