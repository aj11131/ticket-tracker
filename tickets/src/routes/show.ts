import express, { Request, Response } from "express";
import { NotFoundError } from "@tickets11131/common";
import { Ticket } from "../models/ticket";

const router = express.Router();

router.get("/api/tickets/:id", async (req: Request, res: Response) => {
  const ticket = await Ticket.findOne({ ticketId: req.params.id });
  if (!ticket) throw new NotFoundError();
  res.send(ticket);
});

export { router as showTicketRouter };
