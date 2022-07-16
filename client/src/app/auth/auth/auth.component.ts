import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { take } from 'rxjs';
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
  currentAuthMode = AuthMode.SIGNIN;

  get AuthModeEnum() {
    return AuthMode;
  }

  set AuthMode(authMode: AuthMode) {
    this.currentAuthMode = authMode;
  }

  signinForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {}

  switchMode(authMode: AuthMode) {
    this.currentAuthMode = authMode;
  }

  onSubmit() {
    const credentials = this.signinForm.value as {
      username: string;
      password: string;
    };

    if (this.currentAuthMode === this.AuthModeEnum.SIGNUP) {
      this.authService.signup(credentials).pipe(take(1)).subscribe();
    } else {
      this.authService.signin(credentials).pipe(take(1)).subscribe();
    }
  }
}
