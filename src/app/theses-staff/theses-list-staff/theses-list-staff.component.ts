import {Component, OnInit} from '@angular/core';
import {ThesisPayload} from "../../shared/dto/thesis.payload";
import {Subscription} from "rxjs";
import {ThesesService} from "../../theses/theses.service";
import {DataService} from "../../shared/data.service";
import {ThesesStaffService} from "../theses-staff.service";

@Component({
  selector: 'app-theses-list-staff',
  templateUrl: './theses-list-staff.component.html',
  styleUrls: ['./theses-list-staff.component.css']
})
export class ThesesListStaffComponent implements OnInit {
  theses: ThesisPayload[];
  subscription: Subscription;
  searchText: string;

  constructor(private thesesStaffService: ThesesStaffService,
              private dataService: DataService) {

  }

  ngOnInit(): void {
    this.subscription = this.thesesStaffService.thesesChanged
      .subscribe(value => {
        this.theses = value;
      });
    this.theses = this.thesesStaffService.getTheses();
  }

  fetchPublished() {
    // this.dataService.getThesesByYear(2021);
  }

  // onSelectedOption(e) {
  //   this.getFilteredExpenseList();
  // }

  // getFilteredExpenseList() {
  //   if (this.dataService.searchOption.length > 0)
  //     this.theses = this.dataService.filteredListOptions();
  //   else {
  //     this.theses = this.thesesService.getTheses();
  //   }
  // }
  items: string[] = ["1", "2", "3"];

  setSearchText($event) {
    this.searchText = $event;
    console.log($event);
  }

}
