import mongoose, { Schema } from "mongoose";

const SerialSchema = new mongoose.Schema({
  code: {
    type: String,
    unique: true,
    required: true
  }
});

export default mongoose.model("serial", SerialSchema);
