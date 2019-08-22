import mongoose, { Schema } from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  producer: {
    type: String,
    required: true
  },
  dose: {
    type: String,
    required: true
  },
  form: {
    type: String,
    required: true
  }
});

export default mongoose.model("product", ProductSchema);
