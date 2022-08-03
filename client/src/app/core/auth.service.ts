import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../types';
import { of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  currentUser() {
    const endpoint = environment.apiEndpoint + 'users/currentuser';

    return this.http.get<{ currentUser: string | null }>(endpoint, {
      withCredentials: true,
    });
  }

  signup(credentials: {
    email: string;
    password: string;
    first: string;
    last: string;
  }) {
    const endpoint = environment.apiEndpoint + 'users/signup';

    return this.http.post(endpoint, credentials);
  }

  signin(credentials: { email: string; password: string }) {
    const endpoint = environment.apiEndpoint + 'users/signin';

    return this.http.post(endpoint, credentials);
  }
}
