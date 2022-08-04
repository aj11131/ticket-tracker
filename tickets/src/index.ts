import "express-async-errors";
import mongoose from "mongoose";
import { app } from "./app";
import { saveDefaultTickets } from "./default-tickets";

const start = async () => {
  console.log("tickets starting...");
  try {
    if (!process.env.JWT_KEY) {
      throw new Error("JWT_KEY must be defined");
    }
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI must be defined");
    }

    await mongoose.connect(process.env.MONGO_URI);

    console.log("Connected to mongoDB");
  } catch (error) {
    console.error(error);
  }

  await saveDefaultTickets();

  app.listen(3000, () => {
    console.log("Listening on port 3000!");
  });
};

start();
