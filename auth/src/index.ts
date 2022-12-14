import "express-async-errors";
import mongoose from "mongoose";
import { app } from "./app";
import AWS from "aws-sdk";

const start = async () => {
  console.log("auth starting...");

  try {
    if (!process.env.JWT_KEY) {
      throw new Error("JWT_KEY must be defined");
    }

    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI must be defined");
    }

    if (!process.env.AWS_ACCESS_KEY_ID) {
      throw new Error("AWS_ACCESS_KEY_ID must be defined");
    }

    if (!process.env.AWS_SECRET_ACCESS_KEY) {
      throw new Error("AWS_SECRET_ACCESS_KEY must be defined");
    }

    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to mongoDB");
  } catch (error) {
    console.error(error);
  }

  app.listen(3000, () => {
    console.log("Listening on port 3000!");
  });
};

start();
