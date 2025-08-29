import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = 3002;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("hello");
});

app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});
