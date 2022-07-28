import { TestBed } from '@angular/core/testing';
import {
  Ticket,
  TicketPriorityEnum,
  TicketStatusEnum,
} from '@tickets11131/ticket-tracker-common';
import { SortByEnum, SortDirectionEnum } from '../shared/types';

import { TicketSortService } from './ticket-sort.service';

describe('TicketSortService', () => {
  let service: TicketSortService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TicketSortService);
  });

  it('should sort correctly by title ascending', () => {
    const sortedTickets = service.sortTickets(tickets, [
      SortDirectionEnum.ASCENDING,
      SortByEnum.TITLE,
    ]);

    expect(sortedTickets[0].id).toBe('7890');
    expect(sortedTickets[1].id).toBe('4567');
    expect(sortedTickets[2].id).toBe('1234');
  });

  it('should sort correctly by title descending', () => {
    const sortedTickets = service.sortTickets(tickets, [
      SortDirectionEnum.DESCENDING,
      SortByEnum.TITLE,
    ]);

    expect(sortedTickets[2].id).toBe('1234');
    expect(sortedTickets[1].id).toBe('4567');
    expect(sortedTickets[0].id).toBe('7890');
  });

  it('should sort correctly by created date ascending', () => {
    const sortedTickets = service.sortTickets(tickets, [
      SortDirectionEnum.ASCENDING,
      SortByEnum.CREATED,
    ]);

    expect(sortedTickets[2].id).toBe('4567');
    expect(sortedTickets[1].id).toBe('7890');
    expect(sortedTickets[0].id).toBe('1237');
  });

  it('should sort correctly by created date descending', () => {
    const sortedTickets = service.sortTickets(tickets, [
      SortDirectionEnum.DESCENDING,
      SortByEnum.CREATED,
    ]);

    expect(sortedTickets[0].id).toBe('1237');
    expect(sortedTickets[1].id).toBe('7890');
    expect(sortedTickets[2].id).toBe('4567');
  });
});

const tickets: Ticket[] = [
  {
    id: '1234',
    title: 'Low priority ticket',
    description: 'description 1',
    status: TicketStatusEnum.ACTIVE,
    creationDate: new Date('2022-07-19T03:24:00'),
    closedDate: null,
    tags: ['server', ''],
    priority: TicketPriorityEnum.LOW,
    assigned: {
      id: '2',
      email: 'test@test.com',
      name: 'Bob Smith',
    },
  },
  {
    id: '4567',
    title: 'Medium priority ticket',
    description: 'description 2',
    status: TicketStatusEnum.ACTIVE,
    creationDate: new Date('2022-06-11T03:24:00'),
    closedDate: null,
    tags: ['server', ''],
    priority: TicketPriorityEnum.MEDIUM,
    assigned: {
      id: '2',
      email: 'test@test.com',
      name: 'Bob Smith',
    },
  },
  {
    id: '7890',
    title: 'High priority ticket',
    description: 'description 3',
    status: TicketStatusEnum.CLOSED,
    creationDate: new Date('2022-07-12T03:24:00'),
    closedDate: null,
    tags: ['server', ''],
    priority: TicketPriorityEnum.HIGH,
    assigned: {
      id: '2',
      email: 'test@test.com',
      name: 'Bob Smith',
    },
  },
];
