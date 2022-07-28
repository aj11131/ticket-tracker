import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Ticket, TicketStatusEnum } from '@tickets11131/ticket-tracker-common';

export interface TicketFilter {
  text: string;
  priority: string[] | null;
  assigned: string | null;
  status: string[] | null;
  tags: string[] | null;
  createdAfter: Date | null;
  createdBefore: Date | null;
}

@Injectable({
  providedIn: 'root',
})
export class TicketFilterService {
  ticketFilter = new BehaviorSubject<TicketFilter | null>(null);
  ticketFilter$ = this.ticketFilter.asObservable();

  constructor() {}

  filterTickets = (tickets: Ticket[], filterValue: TicketFilter | null) => {
    if (filterValue === null) return tickets;
    let filteredTickets = tickets.filter((ticket) => {
      const valid =
        this.filterByText(filterValue, ticket) &&
        this.filterByStatus(filterValue, ticket) &&
        this.filterByPriority(filterValue, ticket) &&
        this.filterByCreationDate(filterValue, ticket);
      return valid;
    });

    return filteredTickets;
  };

  filterByText = (filterValue: TicketFilter, ticket: Ticket): boolean => {
    const textFilterValue = filterValue.text?.toLowerCase() || '';
    return (
      ticket.id?.toLowerCase().includes(textFilterValue) ||
      ticket.title.toLowerCase().includes(textFilterValue) ||
      ticket.description.toLowerCase().includes(textFilterValue)
    );
  };

  filterByStatus = (filterValue: TicketFilter, ticket: Ticket): boolean => {
    const selectedStatus = filterValue.status || [];
    if (selectedStatus?.length === 0) return true;
    return selectedStatus?.includes(ticket.status) || false;
  };

  filterByPriority = (filterValue: TicketFilter, ticket: Ticket): boolean => {
    const selectedPriority = filterValue.priority || [];
    if (selectedPriority?.length === 0) return true;
    return selectedPriority?.includes(ticket.priority) || false;
  };

  filterByCreationDate = (
    filterValue: TicketFilter,
    ticket: Ticket
  ): boolean => {
    const createdAfter = filterValue.createdAfter?.getTime() || -Infinity;
    const createdBefore = filterValue.createdBefore?.getTime() || Infinity;
    if (!createdAfter && !createdBefore) return true;
    const created = ticket.creationDate?.getTime() as number;
    return created >= createdAfter && created <= createdBefore;
  };

  updateTicketFilter(value: any) {
    this.ticketFilter.next(value);
  }
}
