import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Ticket } from '../../../../common/src/types';
import { tickets } from '../ticket/tickets/test-tickets';

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  constructor() {}

  getTickets(): Observable<Ticket[]> {
    return of(tickets);
  }
}
