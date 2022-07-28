import express, { Request, Response } from "express";
import { body } from "express-validator";
import { requireAuth, validateRequest } from "@tickets11131/common";
import { Ticket } from "../models/ticket";

const router = express.Router();

router.post(
  "/api/tickets",
  requireAuth,
  [body("title").not().isEmpty().withMessage("Title is required")],
  validateRequest,
  async (req: Request, res: Response) => {
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
    });

    await ticket.save();

    res.status(201).send(ticket);
  }
);

export { router as createTicketRouter };
