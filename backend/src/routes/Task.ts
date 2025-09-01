import express from "express";
import { createPost, getTask } from "../controllers/Task";

const router = express.Router();
router.get("/", getTask);
router.post("/", createPost);

export default router;
