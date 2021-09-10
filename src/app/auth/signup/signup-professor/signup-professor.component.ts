import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../auth.service";
import {FormControl, NgForm} from "@angular/forms";
import {MatTabChangeEvent} from "@angular/material/tabs";
import {Observable} from "rxjs";
import {map, startWith} from "rxjs/operators";

@Component({
  selector: 'app-signup-professor',
  templateUrl: './signup-professor.component.html',
  styleUrls: ['./signup-professor.component.css']
})
export class SignupProfessorComponent implements OnInit {
  selectedIndex: number = 0;
  academicRankControl = new FormControl();
  titleControl = new FormControl();

  academicRankOptions: string[] = ['Asistent','Docent','Vanredni profesor', 'Redovni profesor'];
  titleOptions: string[] = ['prof dr', 'doc', ''];

  filteredOptionsRank: Observable<string[]>;
  filteredOptionsTitle: Observable<string[]>;

  constructor(private authService: AuthService) {
  }


  ngOnInit(): void {
    this.filteredOptionsRank = this.academicRankControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterDegree(value))
    );
    this.filteredOptionsTitle = this.titleControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterDepartment(value))
    );
  }

  onSignup(form: NgForm) {
    // const email = form.value.email;
    // const password = form.value.password;
    // const surname = "default";
    // const name = "default";
    // const address = "default";
    // const username = "default";
    // this.authService.register({
    //   name, surname, username,
    //   email,
    //   password
    // });
  }

  public tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    this.selectedIndex = tabChangeEvent.index;
  }

  nextStep() {
    if (this.selectedIndex != 3) {
      this.selectedIndex = this.selectedIndex + 1;
    }
  }

  previousStep() {
    if (this.selectedIndex != 0) {
      this.selectedIndex = this.selectedIndex - 1;
    }
  }
  private _filterDegree(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.academicRankOptions.filter(option => option.toLowerCase().includes(filterValue));
  }

  private _filterDepartment(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.titleOptions.filter(option => option.toLowerCase().includes(filterValue));
  }
}
