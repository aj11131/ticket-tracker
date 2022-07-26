import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, shareReplay } from 'rxjs';
import { User } from '@tickets11131/ticket-tracker-common';

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
    return of(testUsers);
  }

  reloadUsers() {
    this.users$ = null;
  }
}

const testUsers: User[] = [
  {
    id: '891234790812',
    email: 'test@test.com',
    name: 'Bob Smith',
  },
  {
    id: '67465745674567',
    email: 'test2@test.com',
    name: 'Sally Jones',
  },
  {
    id: '7686786786785',
    email: 'test3@test.com',
    name: 'Robert Davis',
  },
  {
    id: '995634545122334',
    email: 'test4@test.com',
    name: 'Jessica Baker',
  },
  {
    id: '2445687456846576',
    email: 'test5@test.com',
    name: 'Tim Holiday',
  },
];
