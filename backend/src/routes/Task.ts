import express from "express";
import {
  createPost,
  deleteTask,
  getTask,
  getTaskId,
  updatingTask,
} from "../controllers/Task";

const router = express.Router();
router.get("/", getTask);
router.get("/:id", getTaskId);
router.post("/", createPost);
router.put("/:id", updatingTask);
router.delete("/:id", deleteTask);

export default router;
