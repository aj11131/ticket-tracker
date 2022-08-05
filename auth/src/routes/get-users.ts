import express from "express";
import {
  BadRequestError,
  currentUser,
  requireAuth,
} from "@tickets11131/ticket-tracker-common";
import { User } from "../models/user";

const router = express.Router();

router.get("/api/users", requireAuth, async (req, res) => {
  const accountId = req.currentUser?.accountId as string;

  if (!accountId) {
    throw new BadRequestError("No account ID provided");
  }

  const users = await User.find({ accountId: accountId });

  res.send(users);
});

export { router as getUsersRouter };
