import mongoose from "mongoose";
import { loadData } from "../services/loadData";
import Product from "../models/products";
import uuid from "uuid";
import fs from "fs";
import path from "path";

export default async URI => {
  mongoose.connect(URI, { useNewUrlParser: true }, err => {
    if (err) {
      throw new Error(`Error while trying to connect MongoDB ${err}`);
    }
    console.log(`Connected to MongoDB on port ${URI}`);
  });
};
