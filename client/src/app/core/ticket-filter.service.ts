import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Ticket } from '../../../../common/src/types';

export interface TicketFilter {
  text: string;
  priority: number | null;
  assigned: string | null;
  status: string | null;
  tags: string[] | null;
}

@Injectable({
  providedIn: 'root',
})
export class TicketFilterService {
  ticketFilter = new BehaviorSubject<TicketFilter | null>(null);
  ticketFilter$ = this.ticketFilter.asObservable();

  constructor() {}

  filterTickets(data: [TicketFilter | null, Ticket[]]) {
    const [filterValue, tickets] = data;
    if (filterValue === null) return tickets;

    const filteredTickets = tickets.filter((ticket) => {
      return (
        ticket.id.includes(filterValue.text) ||
        ticket.title.includes(filterValue.text) ||
        ticket.description.includes(filterValue.text)
      );
    });

    return filteredTickets;
  }

  updateTicketFilter(value: any) {
    this.ticketFilter.next(value);
  }
}
