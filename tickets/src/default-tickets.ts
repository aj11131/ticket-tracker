import {
  TicketPriorityEnum,
  TicketStatusEnum,
} from "@tickets11131/ticket-tracker-common/build/types";
import { ITicket, Ticket } from "./models/ticket";

const tickets: Partial<ITicket>[] = [
  {
    title: "Laptop Issues",
    description: "Jim is having trouble logging into his laptop again.",
    status: TicketStatusEnum.ACTIVE,
    creationDate: new Date("2022-05-19T03:24:00"),
    closedDate: null,
    tags: ["server", ""],
    priority: TicketPriorityEnum.LOW,
    assigned: {
      id: "",
      accountId: "",
      email: "",
      first: "",
      last: "",
    },
  },
  {
    title: "Bug In Invoicing App",
    description:
      "Hello, the accounting department is having trouble with the invoicing application. Whenever an invoice is created for a purchasing account type, the invoice is send to the wrong recipient.",
    status: TicketStatusEnum.ACTIVE,
    creationDate: new Date("2022-06-11T03:24:00"),
    closedDate: null,
    tags: ["server", ""],
    priority: TicketPriorityEnum.MEDIUM,
    assigned: {
      id: "",
      accountId: "",
      email: "",
      first: "",
      last: "",
    },
  },
  {
    title: "Production Server Down",
    description:
      "Our production mongoDB server has been down since lunch on Tuesday.",
    status: TicketStatusEnum.CLOSED,
    creationDate: new Date("2022-06-19T03:24:00"),
    closedDate: null,
    tags: ["server", ""],
    priority: TicketPriorityEnum.HIGH,
    assigned: {
      id: "",
      accountId: "",
      email: "",
      first: "",
      last: "",
    },
  },
  {
    title: "End User Troubleshooting",
    description:
      "Can someone call Dave with XYZ inc.? His number is 123-456-7890. Thanks!",
    status: TicketStatusEnum.NEW,
    creationDate: new Date("2022-07-19T03:24:00"),
    closedDate: null,
    tags: ["server", ""],
    priority: TicketPriorityEnum.LOW,
    assigned: {
      id: "",
      accountId: "",
      email: "",
      first: "",
      last: "",
    },
  },
  {
    title: "Strange Error",
    description: `A notice recently appeared on our site that says: "A fatal error has occured when processing a recent subscription payment with Paypal". It then tells me to open up a support ticket. The last recorded error was "Uncaught error: Call to a member function get_order_number() on boolean". I have created a temporary admin login for the site. The user name is "tempUser". Please someone check this out when you can.`,
    status: TicketStatusEnum.NEW,
    creationDate: new Date("2022-07-22T03:24:00"),
    closedDate: null,
    tags: ["server", ""],
    priority: TicketPriorityEnum.LOW,
    assigned: {
      id: "",
      accountId: "",
      email: "",
      first: "",
      last: "",
    },
  },
];

export const saveDefaultTickets = async (
  accountId: string,
  users: {
    _id: string;
    accountId: string;
    email: string;
    first: string;
    last: string;
  }[]
) => {
  const ticketsWithAccountId = tickets.map((ticket) => {
    const user = users[Math.floor(Math.random() * users.length)];
    return {
      ...ticket,
      accountId,
      assigned: { ...user, id: user._id },
    };
  });

  for await (let ticket of ticketsWithAccountId) {
    const {
      title,
      description,
      status,
      creationDate,
      closedDate,
      tags,
      priority,
      assigned,
    } = ticket;

    const ticketDoc = new Ticket({
      title,
      description,
      status,
      creationDate,
      closedDate,
      tags,
      priority,
      assigned,
      accountId,
    });

    await ticketDoc.save();
  }
};
