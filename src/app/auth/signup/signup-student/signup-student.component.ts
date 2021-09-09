import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../auth.service";
import {FormControl, NgForm} from "@angular/forms";
import {MatTabChangeEvent} from "@angular/material/tabs";
import {Observable} from "rxjs";
import {map, startWith} from "rxjs/operators";

@Component({
  selector: 'app-signup-student',
  templateUrl: './signup-student.component.html',
  styleUrls: ['./signup-student.component.css']
})
export class SignupStudentComponent implements OnInit {
  myControl = new FormControl();
  selectedIndex: number = 0;
  options: string[] = ['Osnovne Akademske Studije', 'Master Studije', 'Doktorske Studije'];
  filteredOptions: Observable<string[]>;
  constructor(private authService: AuthService) {
  }


  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  onSignup(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    const surname = "default";
    const name = "default";
    const address = "default";
    const username = "default";
    this.authService.register({
      name, surname, username,
      email,
      address,
      password
    });
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

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
}
