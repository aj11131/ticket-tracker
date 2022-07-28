import mongoose from "mongoose";

interface ICounter {
  _id: string;
  seq: number;
}

const counterSchema = new mongoose.Schema<ICounter>({
  _id: { type: String, required: true },
  seq: { type: Number, default: 1000 },
});

export const Counter = mongoose.model<ICounter>("Counter", counterSchema);
