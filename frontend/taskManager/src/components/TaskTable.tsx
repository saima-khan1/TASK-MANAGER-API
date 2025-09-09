import { useEffect, useState } from "react";
import { fetchTasks, deleteTask } from "../services/fetchApi";
import { Button, Typography } from "@mui/material";
import type { Task } from "../types/task";
import AddTask from "./AddTask";

const TaskTable = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

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
      await deleteTask(id); // call backend
      setTasks((prev) => prev.filter((task) => task._id !== id)); // remove from state
    } catch (err) {
      console.error(err);
    }
  };
  if (loading) return <p>loading</p>;

  return (
    <>
      <div>
        <Typography variant="h1">Task Manager</Typography>
        <AddTask onTaskAdded={addTask} />

        <ul>
          {tasks.map((task) => (
            <li key={task._id}>
              <strong>{task.title}</strong> — ({task.priority})
              <Button onClick={() => handleDelete(task._id)}>Delete</Button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default TaskTable;
