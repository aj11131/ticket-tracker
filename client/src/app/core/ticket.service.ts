import { Injectable } from '@angular/core';
import { map, Observable, of, shareReplay } from 'rxjs';
import { Ticket } from '@tickets11131/ticket-tracker-common';
import { tickets } from '../ticket/tickets/test-tickets';

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  private tickets$: Observable<Ticket[]> | null = null;

  constructor() {}

  get tickets() {
    if (!this.tickets$) {
      this.tickets$ = this.getTickets().pipe(shareReplay());
    }

    return this.tickets$;
  }

  getTickets(): Observable<Ticket[]> {
    return of(tickets);
  }

  getTicket(id: string) {
    return this.tickets.pipe(
      map((tickets) => tickets.find((ticket) => ticket.id === id))
    );
  }

  forceReload() {
    this.tickets$ = null;
  }
}
