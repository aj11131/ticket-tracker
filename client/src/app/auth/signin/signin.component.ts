import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, EMPTY, map, take, throwError } from 'rxjs';
import { AuthService } from 'src/app/core/auth.service';
import { SnackbarService } from 'src/app/core/snackbar.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  hide = true;
  errors: { message: string }[] = [];

  signinForm = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    const credentials = this.signinForm.value as {
      email: string;
      password: string;
    };

    this.authService
      .signin(credentials)
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
