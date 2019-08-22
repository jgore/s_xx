import mongoose, { Schema } from "mongoose";

const SerialSchema = new mongoose.Schema({
  serial: {
    type: String,
    unique: true,
    required: true
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "product",
    required: true
  }
});

export default mongoose.model("serial", SerialSchema);
