import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {DataService} from "../shared/data.service";

@Component({
  selector: 'app-theses-staff',
  templateUrl: './theses-staff.component.html',
  styleUrls: ['./theses-staff.component.css']
})
export class ThesesStaffComponent implements OnInit {

  constructor(private router: Router,
              private dataService: DataService) { }

  ngOnInit(): void {
  }

  onFilterByYear(year: number) {
    this.router.navigate(['/theses-admin']);
    this.dataService.getThesesByYear(year);
  }

  onAll() {
    this.router.navigate(['/theses-admin']);
    this.dataService.getAllTheses();
  }
}
