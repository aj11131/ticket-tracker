import {
  BadRequestError,
  NotAuthorizedError,
  NotFoundError,
  requireAuth,
  validateRequest,
} from "@tickets11131/ticket-tracker-common";
import express, { Request, Response } from "express";
import { body } from "express-validator";
import { Ticket } from "../models/ticket";

const router = express.Router();

router.put(
  "/api/tickets/:id",
  requireAuth,
  [body("title").not().isEmpty().withMessage("Title is required")],
  validateRequest,
  async (req: Request, res: Response) => {
    const accountId = req.currentUser?.accountId as string;

    if (!accountId) {
      throw new BadRequestError("No account ID provided");
    }

    const ticket = await Ticket.findOne({ ticketId: req.params.id, accountId });
    if (!ticket) throw new NotFoundError();

    const {
      title,
      description,
      status,
      creationDate,
      closedDate,
      tags,
      priority,
      assigned,
    } = req.body;

    ticket.set({
      title,
      description,
      status,
      creationDate,
      closedDate,
      tags,
      priority,
      assigned,
    });

    await ticket.save();

    res.send(ticket);
  }
);

export { router as updateTicketRouter };
