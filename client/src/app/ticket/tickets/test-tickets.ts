import {
  Ticket,
  TicketPriority,
  TicketStatus,
} from '../../../../../common/src/types';

export const tickets: Ticket[] = [
  {
    id: '1234',
    title: 'Low priority ticket',
    description: 'I am a ticket',
    status: TicketStatus.ACTIVE,
    creationDate: new Date(),
    closedDate: null,
    tags: ['server', ''],
    priority: TicketPriority.LOW,
    assigned: {
      id: '2',
      username: 'test123',
    },
  },
  {
    id: '4567',
    title: 'Medium priority ticket',
    description: 'I am a ticket',
    status: TicketStatus.ACTIVE,
    creationDate: new Date(),
    closedDate: null,
    tags: ['server', ''],
    priority: TicketPriority.MEDIUM,
    assigned: {
      id: '2',
      username: 'test123',
    },
  },
  {
    id: '7890',
    title: 'High priority ticket',
    description: 'I am a ticket',
    status: TicketStatus.CLOSED,
    creationDate: new Date(),
    closedDate: null,
    tags: ['server', ''],
    priority: TicketPriority.HIGH,
    assigned: {
      id: '2',
      username: 'test123',
    },
  },
];
