import express, { Request, Response } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";
import {
  BadRequestError,
  validateRequest,
} from "@tickets11131/ticket-tracker-common";
import { User } from "../models/user";
import mongoose from "mongoose";
import { saveDefaultUsers } from "../default-users";
import { AccountCreatedPublisher } from "../events/publishers/account-created-publisher";

const router = express.Router();

router.post(
  "/api/users/signup",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 and 20 characters"),
    body("first").trim().notEmpty().withMessage("Please provide a first name"),
    body("last").trim().notEmpty().withMessage("Please provide a last name"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password, first, last, demo } = req.body;
    const accountId = new mongoose.Types.ObjectId().toHexString();

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new BadRequestError("Email in use");
    }

    const user = new User({ email, accountId, password, first, last });
    await user.save();

    if (demo === true) {
      const users = await saveDefaultUsers(accountId);

      new AccountCreatedPublisher().publishMessage({ accountId, users });
    }

    // Generate JWT
    const userJwt = jwt.sign(
      {
        id: user.id,
        accountId,
        email: user.email,
      },
      process.env.JWT_KEY!
    );

    // Store it on session object
    req.session = {
      jwt: userJwt,
    };

    res.status(201).send(user);
  }
);

export { router as signupRouter };
