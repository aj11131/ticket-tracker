import express from "express";
import { currentUser } from "@tickets11131/common";
import { User } from "../models/user";

const router = express.Router();

router.get("/api/users", currentUser, async (req, res) => {
  const users = await User.find({});
  res.send(users);
});

export { router as getUsersRouter };
