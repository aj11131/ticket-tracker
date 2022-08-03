import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, shareReplay } from 'rxjs';
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

const testUsers: User[] = [
  {
    id: '891234790812',
    email: 'test@test.com',
    first: 'Bob',
    last: 'Smith',
  },
  {
    id: '67465745674567',
    email: 'test2@test.com',
    first: 'Brittany',
    last: 'Stevenson',
  },
  {
    id: '2',
    email: 'test3@test.com',
    first: 'Colin',
    last: 'Andrews',
  },
  {
    id: '995634545122334',
    email: 'test4@test.com',
    first: 'Marcella',
    last: 'James',
  },
  {
    id: '2445687456846576',
    email: 'test5@test.com',
    first: 'Howard',
    last: 'Mann',
  },
];
