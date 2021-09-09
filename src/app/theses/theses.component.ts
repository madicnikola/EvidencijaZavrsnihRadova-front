import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-theses',
  templateUrl: './theses.component.html',
  styleUrls: ['./theses.component.css']
})
export class ThesesComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

}
