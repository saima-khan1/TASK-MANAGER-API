import { useState } from "react";
import {
  Box,
  Button,
  InputBase,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
} from "@mui/material";

import type { Task } from "../types/task";
import { createTasks } from "../services/fetchApi";

const AddTask = ({ onTaskAdded }: { onTaskAdded: (task: Task) => void }) => {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<"low" | "medium" | "high">("medium");
  const [dueDate, setDueDate] = useState("");

  const handleAddTask = async () => {
    if (!title) return alert("Please enter a task title");

    try {
      const newTask = await createTasks({ title, priority, dueDate });

      onTaskAdded(newTask);
      setTitle("");
      setPriority("medium");
      setDueDate("");
    } catch (err) {
      console.error("Error adding task:", err);
    }
  };
  return (
    <Box sx={{ display: "flex", gap: 2, alignItems: "center", mb: 3 }}>
      <InputBase
        sx={{
          flex: 1,
          padding: "8px",
          fontSize: "18px",
          border: "1px solid #ccc",
          borderRadius: "6px",
        }}
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <FormControl sx={{ minWidth: 120 }}>
        <InputLabel>Priority</InputLabel>
        <Select
          value={priority}
          onChange={(e) =>
            setPriority(e.target.value as "low" | "medium" | "high")
          }
        >
          <MenuItem value="high">High</MenuItem>
          <MenuItem value="medium">Medium</MenuItem>
          <MenuItem value="low">Low</MenuItem>
        </Select>
      </FormControl>

      <TextField
        type="date"
        label="Due Date"
        InputLabelProps={{ shrink: true }}
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />

      <Button variant="contained" color="info" onClick={handleAddTask}>
        Add Task
      </Button>
    </Box>
  );
};

export default AddTask;
