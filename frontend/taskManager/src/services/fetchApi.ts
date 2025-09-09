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

export const createTasks = async (task: {
  title: string;
  priority: "low" | "medium" | "high";
  dueDate?: string;
}) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    });
    if (!response.ok) throw new Error("failed to create task");
    return await response.json();
  } catch (err) {
    console.log("failed to post", err);
  }
};

export const deleteTask = async (id: string) => {
  try {
    const response = await fetch(`${url}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) throw new Error("failed to create task");
    const result = await response.json();
    return result;
  } catch (err) {
    console.error("Failed to delete task:", err);
    throw err;
  }
};
