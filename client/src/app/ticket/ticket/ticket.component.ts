import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Ticket } from '../../../../../common/src/types';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss'],
})
export class TicketComponent implements OnInit {
  @Input() ticket!: Ticket;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  onClick() {
    console.log(`/${this.ticket.id}`);
    // this.router.navigate([`${this.ticket.id}`]);
    this.router.navigate(['/tickets', this.ticket.id]);
  }
}
