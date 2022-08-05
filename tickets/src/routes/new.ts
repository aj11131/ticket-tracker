import express, { Request, Response } from "express";
import { body } from "express-validator";
import {
  BadRequestError,
  requireAuth,
  validateRequest,
} from "@tickets11131/ticket-tracker-common";
import { Ticket } from "../models/ticket";

const router = express.Router();

router.post(
  "/api/tickets",
  requireAuth,
  [body("title").not().isEmpty().withMessage("Title is required")],
  validateRequest,
  async (req: Request, res: Response) => {
    const accountId = req.currentUser?.accountId as string;

    if (!accountId) {
      throw new BadRequestError("No account ID provided");
    }

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

    const ticket = new Ticket({
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

    await ticket.save();

    res.status(201).send(ticket);
  }
);

export { router as createTicketRouter };
