import { useEffect, useState } from "react";
import { fetchTasks, deleteTask, updateTask } from "../services/fetchApi";
import {
  Button,
  TableContainer,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  TextField,
  MenuItem,
} from "@mui/material";
import type { Task } from "../types/task";
import AddTask from "./AddTask";

const TaskTable = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<Partial<Task>>({});

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchTasks();
        setTasks(data);
      } catch (err) {
        console.error("Failed to load tasks", err);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [[tasks]]);

  const addTask = (newTask: Task) => {
    setTasks((prevTask) => [newTask, ...prevTask]);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteTask(id);
      setTasks((prev) => prev.filter((task) => task._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const startEditing = (task: Task) => {
    setEditingId(task._id);
    setEditValues({
      title: task.title,
      priority: task.priority,
      dueDate: task.dueDate,
      status: task.status,
    });
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditValues({});
  };
  const handleUpdate = async (id: string) => {
    try {
      const updatedTask = await updateTask(id, editValues);

      setTasks((prevTasks) =>
        prevTasks.map((task) => (task._id === id ? updatedTask : task))
      );
      setEditingId(null);
    } catch (err) {
      console.error(err);
    }
  };
  if (loading) return <p>loading</p>;

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Task Manager
      </Typography>
      <AddTask onTaskAdded={addTask} />

      <TableContainer component={Paper} sx={{ mt: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Due Date</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Priority</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.map((task) => (
              <TableRow key={task._id}>
                <TableCell>
                  {editingId === task._id ? (
                    <TextField
                      type="date"
                      size="small"
                      value={
                        editValues.dueDate
                          ? editValues.dueDate.split("T")[0]
                          : ""
                      }
                      onChange={(e) =>
                        setEditValues({
                          ...editValues,
                          dueDate: e.target.value,
                        })
                      }
                    />
                  ) : (
                    task.dueDate || "No due date"
                  )}
                </TableCell>
                <TableCell>
                  {editingId === task._id ? (
                    <TextField
                      size="small"
                      value={editValues.title || ""}
                      onChange={(e) =>
                        setEditValues({ ...editValues, title: e.target.value })
                      }
                    />
                  ) : (
                    task.title
                  )}
                </TableCell>
                <TableCell>
                  {editingId === task._id ? (
                    <TextField
                      select
                      size="small"
                      value={editValues.status || "pending"}
                      onChange={(e) =>
                        setEditValues({
                          ...editValues,
                          status: e.target.value as
                            | "pending"
                            | "in-progress"
                            | "completed",
                        })
                      }
                    >
                      <MenuItem value="pending">Pending</MenuItem>
                      <MenuItem value="in_progress">In_Progress</MenuItem>
                      <MenuItem value="completed">Completed</MenuItem>
                    </TextField>
                  ) : (
                    task.status
                  )}
                </TableCell>

                <TableCell>
                  {editingId === task._id ? (
                    <TextField
                      select
                      size="small"
                      value={editValues.priority || "low"}
                      onChange={(e) =>
                        setEditValues({
                          ...editValues,
                          priority: e.target.value as "low" | "medium" | "high",
                        })
                      }
                    >
                      <MenuItem value="low">Low</MenuItem>
                      <MenuItem value="medium">Medium</MenuItem>
                      <MenuItem value="high">High</MenuItem>
                    </TextField>
                  ) : (
                    task.priority
                  )}
                </TableCell>

                <TableCell>
                  {editingId === task._id ? (
                    <>
                      <Button
                        onClick={() => handleUpdate(task._id)}
                        variant="contained"
                        size="small"
                        sx={{ mr: 1 }}
                      >
                        Save
                      </Button>
                      <Button
                        onClick={cancelEditing}
                        variant="outlined"
                        size="small"
                      >
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        onClick={() => startEditing(task)}
                        variant="outlined"
                        size="small"
                        sx={{ mr: 1 }}
                      >
                        Edit
                      </Button>
                      <Button
                        onClick={() => handleDelete(task._id)}
                        variant="contained"
                        color="error"
                        size="small"
                      >
                        Delete
                      </Button>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default TaskTable;
