import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { combineLatest, map, tap, withLatestFrom } from 'rxjs';
import { TicketFilterService } from 'src/app/core/ticket-filter.service';
import { TicketSortService } from 'src/app/core/ticket-sort.service';
import { TicketService } from 'src/app/core/ticket.service';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss'],
})
export class TicketsComponent implements OnInit {
  tickets$ = this.ticketService.tickets;

  ticketFilter$ = this.ticketFilterService.ticketFilter$;
  ticketSort$ = this.ticketSortService.ticketSort$;

  processedTickets$ = combineLatest([
    this.tickets$,
    this.ticketFilter$,
    this.ticketSort$,
  ]).pipe(
    map((data) => {
      const [tickets, filterValue, sortParameters] = data;
      const filteredTickets = this.ticketFilterService.filterTickets(
        tickets,
        filterValue
      );
      const sortedTickets = this.ticketSortService.sortTickets(
        filteredTickets,
        sortParameters
      );
      return sortedTickets;
    }),
    tap(console.log)
  );

  constructor(
    private ticketService: TicketService,
    private ticketFilterService: TicketFilterService,
    private ticketSortService: TicketSortService,
    private router: Router
  ) {}

  ngOnInit(): void {}
}
