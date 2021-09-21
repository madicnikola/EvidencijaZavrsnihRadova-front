import {Component, OnInit} from '@angular/core';
import {ThesesService} from "../theses.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ThesisPayload} from "../../shared/dto/thesis.payload";

@Component({
  selector: 'app-thesis-detail',
  templateUrl: './thesis-detail.component.html',
  styleUrls: ['./thesis-detail.component.css']
})
export class ThesisDetailComponent implements OnInit {
  thesis: ThesisPayload;
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
