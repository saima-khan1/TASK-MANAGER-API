import {
  Box,
  Button,
  FormControl,
  InputBase,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useState } from "react";
import type { Task } from "../types/task";

const AddTask = () => {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState([""]);
  const [dueDate, setDueDate] = useState("");

  const handleChange = (e: any) => {
    setTitle(e.target.value);
  };

  const handleSelect = (e: any) => {
    setPriority(e.target.value);
  };
  //   const handleAddTask=async()=>{
  //     try{
  //         const AddTask=await
  //     }

  //   }

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          border: "1px solid #ccc",
          borderRadius: "8px",
          overflow: "hidden",
          width: { md: 850, sm: 600, xs: 300 },
          p: 1,
          gap: 1,
        }}
      >
        <InputBase
          sx={{ flex: 1, padding: "8px", fontSize: "18px" }}
          placeholder="Task title"
          value={title}
          onChange={handleChange}
        />
      </Box>
      <TextField
        type="date"
        label="Due Date"
        InputLabelProps={{ shrink: true }}
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />
      <FormControl sx={{ minWidth: 120 }} size="small">
        <InputLabel id="priority-label">Priority</InputLabel>
        <Select
          labelId="priority-label"
          value={priority}
          onChange={handleSelect}
        >
          <MenuItem value="high">High</MenuItem>
          <MenuItem value="medium">Medium</MenuItem>
          <MenuItem value="low">Low</MenuItem>
        </Select>
      </FormControl>
      <Button
        variant="contained"
        color="info"
        sx={{ borderRadius: 1, lineHeight: 2.75 }}
        // onClick={handleAddTask}
      >
        Add Task
      </Button>
    </>
  );
};

export default AddTask;
