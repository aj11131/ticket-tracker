import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketsComponent } from './tickets/tickets.component';
import { MaterialModule } from '../material.module';
import { TicketComponent } from './ticket/ticket.component';
import { TicketFilterComponent } from './ticket-filter/ticket-filter.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [TicketsComponent, TicketComponent, TicketFilterComponent],
  imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule],
})
export class TicketModule {}
