import express from "express";
import bodyParser from "body-parser";
import "dotenv/config";
import authRoutes from "./routes/authRoutes";
import models, { sequelize } from "./config/dbConfig";
import redis from "./config/redisConfig";
import cors from "cors";

const app = express(),
  PORT = process.env.PORT || 3000,
  POSTGRES_DATABASE = process.env.POSTGRES_DATABASE,
  POSTGRES_USERNAME = process.env.POSTGRES_USERNAME,
  POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD;

const router = express.Router();

if (!PORT || !POSTGRES_DATABASE || !POSTGRES_USERNAME || !POSTGRES_PASSWORD) {
  throw new Error("There is no env variable !!!");
}

sequelize
  .sync({ force: true })
  .then(() => {
    console.log(
      "[POSTGRESQL] Connection has been successful established"
    );
  })
  .catch(err => {
    console.log("[POSTGRESQL] Problem with established connection");
  });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use("/auth", authRoutes(router));

app.listen(PORT, () => {
  console.log(`Application is running on port: ${PORT}`.green);
});
