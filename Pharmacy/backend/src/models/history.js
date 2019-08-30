import mongoose, { Schema } from "mongoose";
import { actions, statuses } from "../statuses/actions";

const historySchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true
    },
    status: {
      type: String,
      required: true,
      enum: statuses,
      default: "waiting"
    },
    action: {
      type: String,
      required: true,
      default: "verify",
      enum: actions
    },
    operation_at: {
      type: Date,
      default: new Date()
    }
  },
  { strict: false }
);

export default mongoose.model("history", historySchema);
