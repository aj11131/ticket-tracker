import {
  Ticket,
  TicketPriorityEnum,
  TicketStatusEnum,
} from '@tickets11131/ticket-tracker-common';

const date1 = new Date();
const date2 = new Date();
const date3 = new Date();

date2.setDate(date2.getDate() + 5);
date3.setMonth(date3.getMonth() - 2);

export const tickets: Ticket[] = [
  {
    id: '1234',
    title: 'Low priority ticket',
    description: 'I am a ticket',
    status: TicketStatusEnum.NEW,
    creationDate: new Date(),
    closedDate: null,
    tags: ['server', ''],
    priority: TicketPriorityEnum.LOW,
    assigned: {
      id: '891234790812',
      email: 'test@test.com',
      name: 'Bob Smith',
    },
  },
  {
    id: '4567',
    title: 'Medium priority ticket',
    description: 'I am a ticket',
    status: TicketStatusEnum.ACTIVE,
    creationDate: date2,
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
    description: 'I am a ticket',
    status: TicketStatusEnum.CLOSED,
    creationDate: date3,
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
