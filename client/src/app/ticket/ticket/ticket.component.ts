import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Ticket, TicketStatusEnum, TicketPriorityEnum } from '../../types';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss'],
})
export class TicketComponent implements OnInit {
  @Input() ticket!: Ticket;
  TicketPriorityEnum = TicketPriorityEnum;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  onClick() {
    this.router.navigate(['/tickets', this.ticket.ticketId]);
  }

  getStatusClass(status: TicketStatusEnum) {
    switch (status) {
      case TicketStatusEnum.NEW:
        return 'top-row__status--new';
      case TicketStatusEnum.ACTIVE:
        return 'top-row__status--active';
      case TicketStatusEnum.CLOSED:
        return 'top-row__status--closed';
    }
  }
}
