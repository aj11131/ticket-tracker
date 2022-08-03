import { Ticket, TicketPriorityEnum, TicketStatusEnum } from '../../types';

const date1 = new Date();
const date2 = new Date();
const date3 = new Date();

date2.setDate(date2.getDate() + 5);
date3.setMonth(date3.getMonth() - 2);

export const tickets: Ticket[] = [
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
