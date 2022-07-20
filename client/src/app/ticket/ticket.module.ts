import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketsComponent } from './tickets/tickets.component';
import { MaterialModule } from '../material.module';
import { TicketComponent } from './ticket/ticket.component';
import { TicketFilterComponent } from './ticket-filter/ticket-filter.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { TicketDetailsComponent } from './ticket-details/ticket-details.component';
import { AuthGuard } from '../core/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: TicketsComponent,
  },
  {
    path: ':id',
    canActivate: [AuthGuard],
    component: TicketDetailsComponent,
  },
];

@NgModule({
  declarations: [
    TicketsComponent,
    TicketComponent,
    TicketFilterComponent,
    TicketDetailsComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
})
export class TicketModule {}
