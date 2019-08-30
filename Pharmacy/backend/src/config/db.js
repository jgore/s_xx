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
  // await Product.deleteMany({});
  // const data = await loadData([
  //   "mockData/products.json"
  // ]);

  // const products = data[0];
  
  // for (let i = 0; i < 10000; i++) {
  //   products[0].serials.push(uuid())
  // }
  // for (let i = 0; i < 10000; i++) {
  //   products[1].serials.push(uuid())
  // }

  // for (let i = 0; i < 20; i++) {
  //   products[2].serials.push(uuid())
  // }

  // const serials = products[0].serials.concat(products[1].serials,products[2].serials)
  // Product.insertMany(products)
  // fs.writeFileSync(
  //   path.join(__dirname, "./query.json"),
  //   JSON.stringify(serials, null, 3)
  // );
};
