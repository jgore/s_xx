import express from "express";
import mongodbConnection from "./config/db";
import dotenv from "dotenv/config";
import actionRoutes from "./routes/actions";

const PORT = process.env.PORT || 5000,
  MONGO_DB_URL =
    process.env.MONGO_DB_URL || "mongodb://localhost:27018/pharmacy",
  app = express();
mongodbConnection(MONGO_DB_URL);

const requireVariables = ["A_XX_URL", "C_XX_URL"];

for (let i = 0; i < requireVariables.length; i++) {
  if (!Object.keys(process.env).includes(requireVariables[i])) {
    throw new Error(`Error: you have to provide ${requireVariables[i]}`);
  }
}

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api/actions", actionRoutes());

app.listen(PORT, () => {
  console.log(`Application is running on port ${PORT}`);
});

export default app;
