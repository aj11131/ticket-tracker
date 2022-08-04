import { Injectable } from '@angular/core';
import { map, Observable, of, shareReplay, tap } from 'rxjs';
import { Ticket } from '../types';
import { tickets } from '../ticket/tickets/test-tickets';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  private tickets$: Observable<Ticket[]> | null = null;

  constructor(private http: HttpClient) {}

  get tickets() {
    if (!this.tickets$) {
      this.tickets$ = this.getTickets().pipe(shareReplay());
    }

    return this.tickets$;
  }

  getTickets(): Observable<Ticket[]> {
    const endpoint = environment.apiEndpoint + 'tickets';

    // return of(tickets);

    return this.http.get<Ticket[]>(endpoint).pipe(
      map((tickets: Ticket[]) =>
        tickets.map((ticket) => ({
          ...ticket,
          creationDate: new Date(ticket.creationDate),
        }))
      )
    );
  }

  getTicket(id: string) {
    return this.tickets.pipe(
      map((tickets) => {
        return tickets.find((ticket) => ticket.ticketId?.toString() === id);
      })
    );
  }

  createTicket(ticket: Ticket) {
    const endpoint = environment.apiEndpoint + 'tickets';
    return this.http.post<Ticket>(endpoint, ticket);
  }

  updateTicket(ticket: Ticket) {
    const endpoint = environment.apiEndpoint + `tickets/${ticket.ticketId}`;
    return this.http.put<Ticket>(endpoint, ticket);
  }

  forceReload() {
    this.tickets$ = null;
  }
}
