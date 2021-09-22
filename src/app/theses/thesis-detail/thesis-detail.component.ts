import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ThesesService} from "../theses.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ThesisPayload} from "../../shared/dto/thesis.payload";
import {Subject, Subscription} from "rxjs";

@Component({
  selector: 'app-thesis-detail',
  templateUrl: './thesis-detail.component.html',
  styleUrls: ['./thesis-detail.component.css']
})
export class ThesisDetailComponent implements OnInit, AfterViewInit {

  thesis: ThesisPayload;
  id: number;
  changed: Subject<string> = new Subject<string>();
  thesisSubject = new Subject<ThesisPayload>();
  private sub: Subscription;

  constructor(private thesisService: ThesesService,
              private router: Router,
              private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.route.params.subscribe(
      params => {
        this.id = +params['id'];
        this.thesis = this.thesisService.getThesis(this.id);
        this.changed.next('next');
        this.thesisSubject.next(this.thesis);
      });
    this.thesisSubject.next(this.thesis);

  }

  ngAfterViewInit(): void {
    this.thesisSubject.next(this.thesis);
  }

}
