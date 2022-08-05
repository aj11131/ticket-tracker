import express, { Request, Response } from "express";
import {
  BadRequestError,
  NotFoundError,
  requireAuth,
} from "@tickets11131/ticket-tracker-common";
import { Ticket } from "../models/ticket";

const router = express.Router();

router.get(
  "/api/tickets/:id",
  requireAuth,
  async (req: Request, res: Response) => {
    const accountId = req.currentUser?.accountId as string;

    if (!accountId) {
      throw new BadRequestError("No account ID provided");
    }

    const ticket = await Ticket.findOne({ ticketId: req.params.id, accountId });
    if (!ticket) throw new NotFoundError();
    res.send(ticket);
  }
);

export { router as showTicketRouter };
