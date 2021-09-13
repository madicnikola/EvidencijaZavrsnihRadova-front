import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, NgForm} from '@angular/forms';
import {AuthService} from "../auth.service";
import {LoginRequestPayload} from "../../shared/dto/login-request.payload";
import {throwError} from "rxjs";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  loginForm: FormGroup;
  loginRequestPayload: LoginRequestPayload;
  private isError: boolean;

  constructor(private authService: AuthService,
              private router: Router,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group(
      {
        username: '',
        password: '',
      });
  }


  onSignin() {
    this.loginRequestPayload = this.loginForm.value;

    this.authService.login(this.loginRequestPayload).subscribe(data => {
      this.isError = false;
      this.router.navigateByUrl('');
    }, error => {
      this.isError = true;
      throwError(error);
    });
  }

}
