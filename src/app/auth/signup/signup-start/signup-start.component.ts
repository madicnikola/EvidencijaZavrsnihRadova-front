import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-signup-start',
  templateUrl: './signup-start.component.html',
  styleUrls: ['./signup-start.component.css']
})
export class SignupStartComponent implements OnInit {

  constructor(private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  onStudent() {
    this.router.navigate(['student'], {relativeTo: this.route});
  }

  onProfessor() {
    this.router.navigate(['professor'], {relativeTo: this.route});
  }
}
