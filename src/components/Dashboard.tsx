import React, { useState, useEffect } from "react";
import type { IUser } from "../interfaces/IUser";
import { TaskController } from "../controllers/TaskController";

interface Props { 
  user: IUser; 
  onLogout: () => void; 
}

export const Dashboard: React.FC<Props> = ({ user, onLogout }) => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  // Fetch tasks synchronously
  const fetchTasks = () => {
    const data = TaskController.getTasks();
    setTasks(data.filter(t => t.userId === user.id));
  };

  // On component mount
  useEffect(() => { 
    fetchTasks(); 
  }, []);

  // Add a new task
  const addTask = () => {
    if (!title || !desc) return;
    TaskController.addTask({ title, description: desc, userId: user.id! });
    setTitle("");
    setDesc("");
    fetchTasks();
  };

  // Edit a task
  const editTask = (id: number | string) => {
    const task = tasks.find(t => t.id === id);
    if (!task) return;

    const newTitle = prompt("Title", task.title);
    const newDesc = prompt("Description", task.description);
    if (!newTitle || !newDesc) return;

    TaskController.updateTask(id, { title: newTitle, description: newDesc });
    fetchTasks();
  };

  // Delete a task
  const deleteTask = (id: number | string) => {
    TaskController.deleteTask(id);
    fetchTasks();
  };

  // Logout
  const logout = () => {
    onLogout();
    localStorage.removeItem("currentUser");
  };

  return (
    <div>
      <h2>Welcome, {user.name}</h2>
      <button onClick={logout}>Logout</button>

      <ul>
        {tasks.map(t => (
          <li key={t.id}>
            {t.title} - {t.description}{" "}
            <button onClick={() => editTask(t.id)}>Edit</button>
            <button onClick={() => deleteTask(t.id)}>Delete</button>
          </li>
        ))}
      </ul>

      <input 
        value={title} 
        placeholder="Title" 
        onChange={e => setTitle(e.target.value)}
      />
      <input 
        value={desc} 
        placeholder="Description" 
        onChange={e => setDesc(e.target.value)}
      />
      <button onClick={addTask}>Add Task</button>
    </div>
  );
};