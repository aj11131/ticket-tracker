import { Injectable } from '@angular/core';
import { map, Observable, of, shareReplay } from 'rxjs';
import { Ticket } from '@tickets11131/ticket-tracker-common';
import { tickets } from '../ticket/tickets/test-tickets';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { tick } from '@angular/core/testing';

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

    return this.http.get<Ticket[]>(endpoint);
  }

  getTicket(id: string) {
    return this.tickets.pipe(
      map((tickets) => {
        return tickets.find((ticket) => ticket.id === id);
      })
    );
  }

  createTicket(ticket: Ticket) {
    const endpoint = environment.apiEndpoint + 'tickets';
    return this.http.post<Ticket>(endpoint, ticket);
  }

  updateTicket(ticket: Ticket) {
    const endpoint = environment.apiEndpoint + `tickets/${ticket.id}`;
    return this.http.put<Ticket>(endpoint, ticket);
  }

  forceReload() {
    this.tickets$ = null;
  }
}