import { TestBed } from '@angular/core/testing';
import { Ticket, TicketPriorityEnum, TicketStatusEnum } from '../types';

import { TicketFilterService } from './ticket-filter.service';

fdescribe('TicketFilterService', () => {
  let service: TicketFilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TicketFilterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should correctly filter by text', () => {
    let filterValue = {
      text: '1234',
      priority: [],
      assigned: null,
      status: [],
      tags: null,
      createdAfter: null,
      createdBefore: null,
    };

    let valid = service.filterByText(filterValue, tickets[0]);

    expect(valid).toBe(true);

    valid = service.filterByText(filterValue, tickets[1]);

    expect(valid).toBe(false);

    filterValue = {
      text: 'low priority ticket',
      priority: [],
      assigned: null,
      status: [],
      tags: null,
      createdAfter: null,
      createdBefore: null,
    };

    valid = service.filterByText(filterValue, tickets[0]);

    expect(valid).toBe(true);

    valid = service.filterByText(filterValue, tickets[1]);

    expect(valid).toBe(false);

    filterValue = {
      text: 'description 1',
      priority: [],
      assigned: null,
      status: [],
      tags: null,
      createdAfter: null,
      createdBefore: null,
    };

    valid = service.filterByText(filterValue, tickets[0]);

    expect(valid).toBe(true);

    valid = service.filterByText(filterValue, tickets[1]);

    expect(valid).toBe(false);
  });

  it('should correctly filter by status', () => {
    let filterValue = {
      text: '',
      priority: [],
      assigned: null,
      status: ['active'],
      tags: null,
      createdAfter: null,
      createdBefore: null,
    };

    let valid = service.filterByStatus(filterValue, tickets[0]);

    expect(valid).toBe(true);

    valid = service.filterByStatus(filterValue, tickets[2]);

    expect(valid).toBe(false);
  });

  it('should correctly filter by priority', () => {
    let filterValue = {
      text: '',
      priority: ['low'],
      assigned: null,
      status: [],
      tags: null,
      createdAfter: null,
      createdBefore: null,
    };

    let valid = service.filterByPriority(filterValue, tickets[0]);

    expect(valid).toBe(true);

    valid = service.filterByPriority(filterValue, tickets[1]);

    expect(valid).toBe(false);
  });

  it('should correcly filter by date', () => {
    let dateAfter = new Date('2022-07-18T03:24:00');
    let dateBefore = new Date('2022-07-21T03:24:00');

    let filterValue = {
      text: '',
      priority: ['low'],
      assigned: null,
      status: [],
      tags: null,
      createdAfter: dateAfter,
      createdBefore: dateBefore,
    };

    let valid = service.filterByCreationDate(filterValue, tickets[0]);

    expect(valid).toBe(true);

    valid = service.filterByCreationDate(filterValue, tickets[1]);

    expect(valid).toBe(false);
  });
});

const date1 = new Date();
const date2 = new Date();
const date3 = new Date();

date2.setDate(date2.getDate() + 5);
date3.setMonth(date3.getMonth() - 2);

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
      first: 'Bob',
      last: 'Smith',
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
      first: 'Brittany',
      last: 'Stevenson',
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
      first: 'Colin',
      last: 'Andrews',
    },
  },
];
