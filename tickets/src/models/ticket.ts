import mongoose from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";
import {
  TicketStatusEnum,
  TicketPriorityEnum,
  User,
} from "@tickets11131/ticket-tracker-common";
import { Counter } from "./counter";

export interface ITicket {
  _id?: string;
  ticketId: number;
  accountId: string;
  title: string;
  description: string;
  status: TicketStatusEnum;
  creationDate: Date;
  closedDate: Date | null;
  tags: string[];
  priority: TicketPriorityEnum;
  assigned: User;
}

const ticketSchema = new mongoose.Schema<ITicket>(
  {
    ticketId: {
      type: Number,
    },
    accountId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: String,
    status: {
      type: String,
      required: true,
    },
    creationDate: {
      type: Date,
      required: true,
    },
    closedDate: Date,
    tags: Object,
    priority: {
      type: String,
      required: true,
    },
    assigned: Object,
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

ticketSchema.pre("save", async function () {
  if (!this.ticketId) {
    let counter = await Counter.findById("ticketId");
    if (!counter) {
      counter = new Counter({
        _id: `ticketId-${this.accountId}`,
        seq: 1000,
      });

      await counter.save();
    }
    await counter.updateOne({ $inc: { seq: 1 } });
    this.ticketId = counter.seq;
  }
});

ticketSchema.set("versionKey", "version");
ticketSchema.plugin(updateIfCurrentPlugin);

const Ticket = mongoose.model<ITicket>("Ticket", ticketSchema);

export { Ticket };
