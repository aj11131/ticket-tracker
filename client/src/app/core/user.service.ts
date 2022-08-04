import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, shareReplay, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../types';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  users$: Observable<User[]> | null = null;

  constructor(private http: HttpClient) {}

  get users() {
    if (!this.users$) {
      this.users$ = this.getUsers().pipe(shareReplay());
    }

    return this.users$;
  }

  private getUsers() {
    const endpoint = environment.apiEndpoint + 'users';

    return this.http.get<User[]>(endpoint, {
      withCredentials: true,
    });
  }

  reloadUsers() {
    this.users$ = null;
  }
}
