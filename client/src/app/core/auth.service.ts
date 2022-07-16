import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  signup(credentials: { username: string; password: string }) {
    const endpoint = 'http://localhost:3000/signup';

    return this.http.post(endpoint, credentials);
  }

  signin(credentials: { username: string; password: string }) {
    return of(null);
  }
}
