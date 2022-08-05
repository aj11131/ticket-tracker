import {
  BadRequestError,
  currentUser,
  requireAuth,
} from "@tickets11131/ticket-tracker-common";
import express, { Request, Response } from "express";
import { Ticket } from "../models/ticket";

const router = express.Router();

router.get("/api/tickets", requireAuth, async (req: Request, res: Response) => {
  const accountId = req.currentUser!.accountId as string;

  if (!accountId) {
    throw new BadRequestError("No account ID provided");
  }

  const tickets = await Ticket.find({ accountId: accountId });

  res.send(tickets);
});

export { router as indexTicketRouter };
