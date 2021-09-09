import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../auth.service";
import {NgForm} from "@angular/forms";
import {MatTabChangeEvent} from "@angular/material/tabs";

@Component({
  selector: 'app-signup-student',
  templateUrl: './signup-student.component.html',
  styleUrls: ['./signup-student.component.css']
})
export class SignupStudentComponent implements OnInit {
  selectedIndex: number = 0;
  constructor(private authService: AuthService) {
  }


  ngOnInit(): void {
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
}
