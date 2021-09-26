import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ThesesService} from "../theses.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ThesisPayload} from "../../shared/dto/thesis.payload";
import {Subject, Subscription} from "rxjs";
import {FileUploadService} from "../../shared/file-upload/file-upload.service";

@Component({
  selector: 'app-thesis-detail',
  templateUrl: './thesis-detail.component.html',
  styleUrls: ['./thesis-detail.component.css']
})
export class ThesisDetailComponent implements OnInit, AfterViewInit {

  thesis: ThesisPayload;
  id: number;
  private sub: Subscription;

  constructor(private thesisService: ThesesService,
              private router: Router,
              private route: ActivatedRoute,
              private uploadService: FileUploadService) {

  }

  ngOnInit(): void {
    this.route.params.subscribe(
      params => {
        this.id = +params['id'];
        this.thesis = this.thesisService.getThesis(this.id);
        this.uploadService.setThesis(this.thesis);
      });
  }

  ngAfterViewInit(): void {
    this.uploadService.setThesis(this.thesis);
  }

}
