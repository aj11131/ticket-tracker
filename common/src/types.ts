export interface ErrorOutput {
  message: string;
  field?: string;
}

export enum TicketStatusEnum {
  NEW = "new",
  ACTIVE = "active",
  CLOSED = "closed",
}

export enum TicketPriorityEnum {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
}

export interface Ticket {
  id?: string;
  ticketId?: number;
  accountId: string;
  title: string;
  description: string;
  priority: TicketPriorityEnum;
  assigned: User;
  creationDate: Date;
  closedDate: Date | null;
  tags: string[];
  status: TicketStatusEnum;
}

export interface User {
  id?: string;
  accountId: string;
  email: string;
  first: string;
  last: string;
}
