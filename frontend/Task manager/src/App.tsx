import { useEffect, useState } from "react";
import { fetchTasks } from "./services/fetchApi";
import type { Task } from "./types/task";
import { Button } from "@mui/material";

function App() {
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
  }, []);
  if (loading) return <p>loading</p>;
  return (
    <>
      <div>
        <h1>Tasks</h1>
        <Button>add</Button>
        <ul>
          {tasks.map((task) => (
            <li key={task._id}>
              <strong>{task.title}</strong> — {task.status} ({task.priority})
              <Button>delete</Button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
