import mongoose from "mongoose";
import { loadData } from "../services/loadData";
import Product from "../models/products";
import Serial from "../models/serial";
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

  await Product.deleteMany({});
  await Serial.deleteMany({});
  const data = await loadData([
    "mockData/products.json",
    "mockData/serial.json"
  ]);

  const products = await Product.insertMany(data[0]);
  const unSavedSerials = data[1];
  for (let i = 0; i < products.length; i++) {
    for (let k = 0; k < unSavedSerials.length; k++) {
      if (unSavedSerials[k].name === products[i].name) {
        unSavedSerials[k].product = products[i]._id;
      }
    }
  }

  const generatedSerials = [];
  for (let i = 0; i < 10000; i++) {
    generatedSerials.push({
      serial: uuid(),
      product: products[0]._id
    });
  }

  const serials = await Serial.insertMany([
    ...unSavedSerials,
    ...generatedSerials
  ]);

  const onlyIDS = serials.map((value) => {
    return value.serial
  })

  fs.writeFileSync(
    path.join(__dirname, "./query.json"),
    JSON.stringify(onlyIDS, null, 3)
  );
};
