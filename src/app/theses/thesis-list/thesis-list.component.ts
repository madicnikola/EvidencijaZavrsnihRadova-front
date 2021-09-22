import {Component, OnInit} from '@angular/core';
import {DataService} from "../../shared/data.service";
import {Subscription} from "rxjs";
import {ThesesService} from "../theses.service";
import {ThesisPayload} from "../../shared/dto/thesis.payload";

@Component({
  selector: 'app-thesis-list',
  templateUrl: './thesis-list.component.html',
  styleUrls: ['./thesis-list.component.css']
})
export class ThesisListComponent implements OnInit {
  theses: ThesisPayload[];
  subscription: Subscription;
  searchText: string;

  constructor(private thesesService: ThesesService,
              private dataService: DataService) {

  }

  ngOnInit(): void {
    this.fetchPublished();
    this.subscription = this.thesesService.thesesChanged
      .subscribe(value => {
        this.theses = value;
      });
    this.theses = this.thesesService.getTheses();
  }

  fetchPublished() {
    this.dataService.getPublishedTheses();
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
  items: string[] = ["1","2","3"];

  setSearchText($event) {
    this.searchText = $event;
    console.log($event);
  }
}
