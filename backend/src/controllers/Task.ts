import express from "express";
import mongoose from "mongoose";
import Task from "../models/Task";
import { Request, Response, NextFunction } from "express";

const app = express();

app.use(express.json());

export const getTask = async (req: Request, res: Response) => {
  try {
    const task = await Task.find({});
    res.status(200).json({ sucess: true, data: task });
  } catch (err) {
    console.error("failed to get data ");
    res.status(500).json({ error: "Failed to fetch data" });
  }
};
export const getTaskId = async (req: Request, res: Response) => {
  try {
    const task = await Task.findById(req.params.id);
    res.status(200).json({ sucess: true, data: task });
  } catch (err) {
    console.error("failed to get data ");
    res.status(500).json({ error: "Failed to fetch data" });
  }
};

export const createPost = async (req: Request, res: Response) => {
  try {
    const task = await Task.create(req.body);
    task.save();
    res.status(201).json({ sucess: true, data: task });
    console.log(task, "task");
  } catch (err) {
    console.error("failed to post ");
    res.status(500).json({ error: "Failed to fetch data" });
  }
};

export const updatingTask = async (req: Request, res: Response) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(201).json({ sucess: true, data: task });
    console.log(task, "task");
  } catch (error) {
    console.error("failed to update");
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    res.status(200).json({ sucess: true, data: task });
  } catch (err) {
    console.error("failed to update");
  }
};
