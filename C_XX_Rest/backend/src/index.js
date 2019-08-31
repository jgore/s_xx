import express from "express";
import mongodbConnection from "./config/db";
import productsRoutes from "./routes/products";
import dotenv from "dotenv/config";
import redisClient from "./config/redis";

const PORT = process.env.PORT || 5001,
  MONGO_DB_URL = process.env.MONGO_DB_URL || "mongodb://localhost:27018/pharmacy",
  app = express();
mongodbConnection(MONGO_DB_URL);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/products", productsRoutes());

app.listen(PORT, () => {
  console.log(`Application is running on port ${PORT}`);
});

export default app;
