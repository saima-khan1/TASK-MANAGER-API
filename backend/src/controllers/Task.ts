import express from "express";
import Joi from "joi";
import Task from "../models/Task";
import { Request, Response, NextFunction } from "express";
import { Console, error } from "console";

const app = express();

app.use(express.json());
const schema = Joi.object({
  title: Joi.string().min(3).required(),
  description: Joi.string().min(3).required(),
});

export const getTask = async (req: Request, res: Response) => {
  try {
    const task = await Task.find({});
    res.status(200).json({ success: true, data: task });
  } catch (err) {
    console.error("error fetching data ", err);
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
};
export const getTaskId = async (req: Request, res: Response) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ success: false, error: "Task not found" });
    }
    res.status(200).json({ success: true, data: task });
  } catch (err) {
    console.error("error fetching data ", err);
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
};

export const createPost = async (req: Request, res: Response) => {
  try {
    const { error } = schema.validate(req.body);
    if (error) {
      return res
        .status(400)
        .json({ success: false, error: error.details[0].message });
    }
    const task = await Task.create(req.body);

    res.status(201).json({ success: true, data: task });
  } catch (err) {
    console.error("error creating task ");
    res.status(500).json({ error: "Failed to create task" });
  }
};

export const updatingTask = async (req: Request, res: Response) => {
  try {
    const { error } = schema.validate(req.body);
    if (error) {
      return res
        .status(400)
        .json({ success: false, error: error.details[0].message });
    }
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({ sucess: true, data: task });
    if (!task) {
      return res.status(404).json({ success: false, error: "not found " });
    }
    console.log(task, "task");
  } catch (error) {
    console.error("error  to update data", error);
    res.status(500).json({ error: "failed to update task" });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).json({ success: false, error: "Task not found" });
    }
    return res
      .status(200)
      .json({ success: true, message: "Task deleted successfully" });
  } catch (err) {
    console.error("error  to delete", err);
    res.status(500).json({ error: "failed to delete task" });
  }
};
