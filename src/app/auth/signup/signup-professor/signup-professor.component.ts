import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../auth.service";
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, NgForm, Validators} from "@angular/forms";
import {MatTabChangeEvent} from "@angular/material/tabs";
import {Observable} from "rxjs";
import {map, startWith} from "rxjs/operators";
import {autocompleteStringValidator} from "../../../shared/validators";
import {STEPPER_GLOBAL_OPTIONS} from "@angular/cdk/stepper";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {DialogComponent} from "../../../shared/dialog/dialog.component";

@Component({
  selector: 'app-signup-professor',
  templateUrl: './signup-professor.component.html',
  styleUrls: ['./signup-professor.component.css'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {displayDefaultIndicatorType: false}
  }]
})
export class SignupProfessorComponent implements OnInit {
  academicRankControl = new FormControl();
  titleControl = new FormControl();
  isLinear = true;
  signUpProfessorForm: FormGroup;
  academicRankOptions: string[] = ['Asistent', 'Docent', 'Vanredni profesor', 'Redovni profesor'];
  titleOptions: string[] = ['prof dr','dr', 'doc','mr','-'];
  filteredOptionsRank: Observable<string[]>;
  filteredOptionsTitle: Observable<string[]>;

  validation_msgs = {
    'titleControl': [
      {type: 'invalidAutocompleteString', message: 'Please click one of the autocomplete options.'},
      {type: 'required', message: 'required'}
    ],
    'academicRankControl': [
      {type: 'invalidAutocompleteString', message: 'Please click one of the autocomplete options.'},
      {type: 'required', message: 'required'}
    ]
  }

  get formArray(): AbstractControl | null {
    return this.signUpProfessorForm.get('formArray');
  }

  constructor(private authService: AuthService,
              private formBuilder: FormBuilder,
              private router: Router,
              private matDialog: MatDialog) {

  }


  ngOnInit(): void {
    this.signUpProfessorForm = this.formBuilder.group({
      formArray: this.formBuilder.array([
        this.formBuilder.group({
          name: ['', Validators.required],
          surname: ['', Validators.required],
          birthDate: Date.now(),
        }),
        this.formBuilder.group({
          email: ['', [Validators.required, Validators.email]],
          username: ['', Validators.required],
          password: ['', [Validators.required, Validators.minLength(4)]],
        }),
        this.formBuilder.group({
          academicRank: ['', [Validators.required, autocompleteStringValidator(this.academicRankOptions)]],
          title: ['', [Validators.required, autocompleteStringValidator(this.titleOptions)]]
        })
      ])
    });
    this.filteredOptionsRank = this.academicRankControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterDegree(value))
    );
    this.filteredOptionsTitle = this.titleControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterDepartment(value))
    );

  }

  onSignup() {
    const data =
      {
        ...this.signUpProfessorForm.get('formArray.0').value,
        ...this.signUpProfessorForm.get('formArray.1').value,
        ...this.signUpProfessorForm.get('formArray.2').value,
      };
    this.authService.register(data)
      .subscribe(data => {
        this.router.navigate(['/signin']);
        this.matDialog.open(DialogComponent, {
          data: {title: "Obaveštenje", message: "Poslat Vam je email za verifikaciju naloga! Potrebno je da potvrdite email adresu kako biste se uspešno registrovali."}
        });
      }, error => console.log('Registration failed. Please try again'));
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
