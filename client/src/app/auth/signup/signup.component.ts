import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, EMPTY, take } from 'rxjs';
import { AuthService } from 'src/app/core/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  hide = true;
  errors: { message: string }[] = [];

  get demo() {
    return this.signupForm.controls['demo'].value;
  }

  signupForm = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
    first: ['', Validators.required],
    last: ['', Validators.required],
    demo: [false],
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    const credentials = this.signupForm.value as {
      email: string;
      password: string;
      first: string;
      last: string;
      demo: boolean;
    };

    this.authService
      .signup(credentials)
      .pipe(
        take(1),
        catchError(
          (error: {
            error: { errors: { message: string; field: string }[] };
          }) => {
            this.errors = [];
            console.log(error);
            if (
              !error ||
              !error.error ||
              !error.error.errors ||
              error.error.errors.length === 0
            ) {
              this.addError({ message: 'Unable to signin' });
              return EMPTY;
            }

            error.error.errors.forEach((error, i) => {
              this.errors.push({ ...error });
            });

            return EMPTY;
          }
        )
      )
      .subscribe(() => {
        this.router.navigate(['/tickets']);
      });
  }

  addError(error: { message: string }) {
    this.errors.push(error);
  }
}
