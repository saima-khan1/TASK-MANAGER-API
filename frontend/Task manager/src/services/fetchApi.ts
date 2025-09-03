import type { Task } from "../types/task";

const url = import.meta.env.VITE_BASE_URL;

export const fetchTasks = async (): Promise<Task[]> => {
  try {
    const response = await fetch(`${url}`);
    if (!response.ok) {
      throw new Error("failed to fetch task");
    }
    const json = await response.json();
    return json.data as Task[];
  } catch (err) {
    console.error("Error fetching data ", err);
    throw err;
  }
};

fetchTasks();
