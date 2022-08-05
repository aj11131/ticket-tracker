export enum TicketStatusEnum {
  NEW = 'new',
  ACTIVE = 'active',
  CLOSED = 'closed',
}

export enum TicketPriorityEnum {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
}

export interface Ticket {
  id?: string;
  ticketId?: number;
  title: string;
  description: string;
  priority: TicketPriorityEnum;
  assigned: User | null;
  creationDate: Date;
  closedDate: Date | null;
  tags: string[];
  status: TicketStatusEnum;
}

export interface User {
  id?: string;
  email: string;
  first: string;
  last: string;
}
