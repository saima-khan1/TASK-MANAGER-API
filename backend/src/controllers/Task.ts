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
  }
};

export const createPost = async (req: Request, res: Response) => {
  try {
    const task = await Task.create(req.body);
    task.save();
    res.status(201).json({ sucess: true, data: task });
  } catch (err) {
    console.error("failed to post ");
  }
};
