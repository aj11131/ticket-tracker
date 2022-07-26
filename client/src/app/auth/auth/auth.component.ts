import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, EMPTY, take } from 'rxjs';
import { AuthService } from 'src/app/core/auth.service';

enum AuthMode {
  SIGNIN = 'signin',
  SIGNUP = 'signup',
}

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  hide = true;
  errors: { message: string }[] = [];
  currentAuthMode = AuthMode.SIGNIN;

  get AuthModeEnum() {
    return AuthMode;
  }

  set AuthMode(authMode: AuthMode) {
    this.currentAuthMode = authMode;
  }

  signinForm = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  switchMode(authMode: AuthMode) {
    this.currentAuthMode = authMode;
  }

  onSubmit() {
    const credentials = this.signinForm.value as {
      email: string;
      password: string;
    };

    let auth$;
    if (this.currentAuthMode === this.AuthModeEnum.SIGNUP) {
      auth$ = this.authService.signup(credentials);
    } else {
      auth$ = this.authService.signin(credentials);
    }

    auth$
      .pipe(
        take(1),
        catchError((error) => {
          console.log(error);
          return EMPTY;
        })
      )
      .subscribe(() => {
        this.router.navigate(['/tickets']);
      });
  }
}
