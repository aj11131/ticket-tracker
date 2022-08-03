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

  signupForm = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
    first: ['', Validators.required],
    last: ['', Validators.required],
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
    };

    this.authService
      .signup(credentials)
      .pipe(
        take(1),
        catchError(
          (error: { errors: { message: string; field: string }[] }) => {
            this.errors = [];

            if (!error || !error.errors) {
              this.addError({ message: 'Unable to signin' });
              return EMPTY;
            }

            error.errors.forEach((error, i) => {
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
