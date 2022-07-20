import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom, Observable, take } from 'rxjs';
import { TicketService } from 'src/app/core/ticket.service';
import { UserService } from 'src/app/core/user.service';
import {
  Ticket,
  TicketPriorityEnum,
  TicketStatusEnum,
  User,
} from '../../../../../common/src/types';

@Component({
  selector: 'app-ticket-details',
  templateUrl: './ticket-details.component.html',
  styleUrls: ['./ticket-details.component.scss'],
})
export class TicketDetailsComponent implements OnInit {
  ticket: Ticket | undefined;
  ticketForm!: FormGroup;
  TicketPriorityEnum = TicketPriorityEnum;
  TicketStatusEnum = TicketStatusEnum;

  users$ = this.userService.users;

  constructor(
    private activatedRoute: ActivatedRoute,
    private ticketService: TicketService,
    private fb: FormBuilder,
    private userService: UserService
  ) {}

  async ngOnInit() {
    const params = await firstValueFrom(
      this.activatedRoute.params.pipe(take(1))
    );
    const id = params['id'];

    this.ticket = await firstValueFrom(this.ticketService.getTicket(id));

    this.ticketForm = this.fb.group({
      title: [this.ticket?.title],
      description: [this.ticket?.description],
      priority: [this.ticket?.priority],
      status: [this.ticket?.status],
      assigned: [this.ticket?.assigned],
    });

    console.log(this.ticketForm.value);
  }

  compareUsers(user1: User, user2: User): boolean {
    return user1.id === user2.id;
  }
}
