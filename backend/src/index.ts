import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import mongoose from "mongoose";

import router from "./routes/Task";
dotenv.config();
const app = express();
const PORT = 3002;

app.use(express.json());
app.use(cors());
app.use("/api/task", router);

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect(process.env.MONGODB_URL as string);
    console.log("connected to mongoDB");
  } catch (err) {
    console.error("❌ Failed to connect MongoDB:", err);
  }
};

app.get("/", (req, res) => {
  res.send("hello");
});

app.listen(PORT, async () => {
  console.log(`Backend running at http://localhost:${PORT}`);
  await connectDB();
});
