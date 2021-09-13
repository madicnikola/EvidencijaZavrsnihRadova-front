import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../auth.service";
import {FormBuilder, FormControl, FormGroup, NgForm, Validators} from "@angular/forms";
import {MatTabChangeEvent} from "@angular/material/tabs";
import {Observable} from "rxjs";
import {map, startWith} from "rxjs/operators";
import {autocompleteStringValidator} from "../../../shared/validators";
import {Router} from "@angular/router";

@Component({
  selector: 'app-signup-student',
  templateUrl: './signup-student.component.html',
  styleUrls: ['./signup-student.component.css']
})
export class SignupStudentComponent implements OnInit {
  selectedIndex: number = 0;

  degreeOfStudyOptions: string[] = ['Osnovne Akademske Studije', 'Master Studije', 'Doktorske Studije'];
  departmentOptions: string[] = ['Informacioni sistemi i tehnologije', 'Menadžment', 'Informacioni sistemi i tehnologije – studije na daljinu'];

  filteredOptionsDegree: Observable<string[]>;
  filteredOptionsDepartment: Observable<string[]>;
  studentSignupForm: FormGroup;

  validation_msgs = {
    'departmentControl': [
      { type: 'invalidAutocompleteString', message: 'Please click one of the autocomplete options.' },
      { type: 'required', message: 'required' }
    ],
    'degreeOfStudyControl': [
      { type: 'invalidAutocompleteString', message: 'Please click one of the autocomplete options.' },
      { type: 'required', message: 'required' }
    ]
  }

  constructor(private authService: AuthService,
              private fb: FormBuilder,
              private router: Router) {
  }


  ngOnInit() {
    this.studentSignupForm = this.fb.group({
      name: ['', Validators.required],
      surname:  ['', Validators.required],
      birthDate: Date.now(),

      email:  ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', [Validators.required,Validators.minLength(4)]],

      index: ['', Validators.required],
      degreeOfStudy: ['', [Validators.required, autocompleteStringValidator(this.degreeOfStudyOptions)]],
      department: ['', [Validators.required,autocompleteStringValidator(this.departmentOptions)]]
    });
    this.filteredOptionsDegree = this.studentSignupForm.controls['degreeOfStudy'].valueChanges.pipe(
      startWith(''),
      map(value => this._filterDegree(value))
    );
    this.filteredOptionsDepartment = this.studentSignupForm.controls['department'].valueChanges.pipe(
      startWith(''),
      map(value => this._filterDepartment(value))
    );

  }

  onSignup() {
      this.authService.register(this.studentSignupForm.value)
        .subscribe(data =>{
    this.router.navigate(['/signin']);
        }, error => console.log('Registration failed. Please try again'));

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

    return this.degreeOfStudyOptions.filter(option => option.toLowerCase().includes(filterValue));
  }

  private _filterDepartment(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.departmentOptions.filter(option => option.toLowerCase().includes(filterValue));
  }

}
