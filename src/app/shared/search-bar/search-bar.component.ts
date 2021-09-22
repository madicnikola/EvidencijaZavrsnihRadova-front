import { Component, OnInit, ViewChild, ElementRef,EventEmitter,Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { DataService } from '../data.service';
import {ThesisPayload} from "../dto/thesis.payload";

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  myControl = new FormControl();
  filteredOptions: Observable<string[]>;
  allTheses: ThesisPayload[];
  autoCompleteList: any[]

  @ViewChild('autocompleteInput') autocompleteInput: ElementRef;
  @Output() onSelectedOption = new EventEmitter();

  constructor(
    public dataService: DataService
  ) { }

  ngOnInit() {
    this.dataService.getTheses().subscribe(theses => {
      this.allTheses = theses
    });

    this.myControl.valueChanges.subscribe(userInput => {
      this.autoCompleteExpenseList(userInput);
    })
  }

  private autoCompleteExpenseList(input) {
    let categoryList = this.filterCategoryList(input)
    this.autoCompleteList = categoryList;
  }

  filterCategoryList(val) {
    if (typeof val != "string") {
      return [];
    }
    if (val === '' || val === null) {
      return [];
    }
    return val ? this.allTheses.filter(s => s.title.toLowerCase().indexOf(val.toLowerCase()) != -1)
      : this.allTheses;
  }

  displayFn(t: ThesisPayload) {
    let k = t ? t.title: '';
    return k;
  }

  filterPostList(event) {
    var theses= event.source.value;
    if(!theses) {
      this.dataService.searchOption=[];
    }
    else {
      console.log("not")

      this.dataService.searchOption.push(theses);
      this.onSelectedOption.emit(this.dataService.searchOption)
    }

    this.focusOnPlaceInput();
  }


  removeOption(option) {

    let index = this.dataService.searchOption.indexOf(option);
    if (index >= 0)
      this.dataService.searchOption.splice(index, 1);
    this.focusOnPlaceInput();

    this.onSelectedOption.emit(this.dataService.searchOption)
  }

  focusOnPlaceInput() {
    this.autocompleteInput.nativeElement.focus();
    this.autocompleteInput.nativeElement.value = '';
  }

}
