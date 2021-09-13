import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent implements OnInit {
  searchText: string;
  @Output() searchTextEvent = new EventEmitter<string>();

  constructor() {
  }

  ngOnInit(): void {
  }

  onValueChange() {
    this.searchTextEvent.emit(this.searchText);
  }
}
