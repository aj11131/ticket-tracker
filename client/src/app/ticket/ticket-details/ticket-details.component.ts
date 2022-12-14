import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, EMPTY, firstValueFrom, Observable, take, tap } from 'rxjs';
import { TicketService } from 'src/app/core/ticket.service';
import { UserService } from 'src/app/core/user.service';
import {
  Ticket,
  TicketPriorityEnum,
  TicketStatusEnum,
  User,
} from '../../types';
import { SnackbarService } from 'src/app/core/snackbar.service';

enum Mode {
  CREATE = 'create',
  UPDATE = 'update',
}

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
  mode!: string;

  users$ = this.userService.users;

  get invalid() {
    return !this.ticketForm.valid;
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private ticketService: TicketService,
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private snackbarService: SnackbarService
  ) {}

  async ngOnInit() {
    const params = await firstValueFrom(
      this.activatedRoute.params.pipe(take(1))
    );
    const id = params['id'];

    if (id === 'new') {
      this.ticket = emptyTicket as Ticket;
      this.mode = Mode.CREATE;
    } else {
      this.ticket = await firstValueFrom(this.ticketService.getTicket(id));
      this.mode = Mode.UPDATE;
    }

    this.ticketForm = this.fb.group({
      id: [this.ticket?.id],
      ticketId: [this.ticket?.ticketId],
      title: [this.ticket?.title, Validators.required],
      description: [this.ticket?.description],
      priority: [this.ticket?.priority],
      status: [this.ticket?.status],
      assigned: [this.ticket?.assigned],
      creationDate: [this.ticket?.creationDate],
      closedDate: [this.ticket?.closedDate],
      tags: [this.ticket?.tags],
    });
  }

  compareUsers(user1: User, user2: User): boolean {
    return user1 && user2 ? user1.id === user2.id : false;
  }

  onSave() {
    const ticket = this.ticketForm.value;

    let ticket$: Observable<Ticket>;

    if (this.mode === Mode.CREATE) {
      ticket$ = this.ticketService.createTicket(ticket);
    } else {
      ticket$ = this.ticketService.updateTicket(ticket);
    }

    ticket$
      .pipe(
        take(1),
        catchError(() => {
          return EMPTY;
        })
      )
      .subscribe(() => {
        if (this.mode === Mode.CREATE) {
          this.snackbarService.openSnackBarSuccess('Ticket saved!');
        } else {
          this.snackbarService.openSnackBarSuccess('Ticket updated!');
        }

        this.router.navigate(['tickets']);
        this.ticketService.forceReload();
      });
  }
}

const emptyTicket: Partial<Ticket> = {
  title: '',
  description: '',
  priority: TicketPriorityEnum.LOW,
  creationDate: new Date(),
  closedDate: null,
  tags: [],
  status: TicketStatusEnum.NEW,
};
