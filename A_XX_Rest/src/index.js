import express from "express";
import dotenv from "dotenv/config";

const PORT = process.env.PORT || 5002;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/api/check", (req, res) => {
  const { code } = req.body;
  setTimeout(() => {
    res.send({ isValid: true, code });
  }, 200);
});

app.listen(PORT, () => {
  console.log(`Application is running on port ${PORT}`);
});

export default app;
