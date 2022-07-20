import { Component, OnInit } from '@angular/core';
import { map, tap, withLatestFrom } from 'rxjs';
import { TicketFilterService } from 'src/app/core/ticket-filter.service';
import { TicketService } from 'src/app/core/ticket.service';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss'],
})
export class TicketsComponent implements OnInit {
  tickets$ = this.ticketService.tickets;

  ticketFilter$ = this.ticketFilterService.ticketFilter$;

  filteredTickets$ = this.ticketFilter$.pipe(
    withLatestFrom(this.tickets$),
    map(this.ticketFilterService.filterTickets)
  );

  constructor(
    private ticketService: TicketService,
    private ticketFilterService: TicketFilterService
  ) {}

  ngOnInit(): void {}
}
