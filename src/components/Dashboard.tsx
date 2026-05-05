import React, { useState, useEffect } from "react";
import type { IUser } from "../interfaces/IUser"; // type-only import
import { TaskController } from "../controllers/TaskController";
import { useNavigate } from "react-router-dom"; // for logout navigation

interface Props {
  user: IUser;
  onLogout: () => void; // callback to log out
}

export const Dashboard: React.FC<Props> = ({ user, onLogout }) => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setTasks(TaskController.getTasks(user.id!));
  }, [user]);

  const addTask = () => {
    if (!title || !desc) return alert("Please enter both title and description");
    TaskController.addTask(title, desc, user.id!);
    setTasks(TaskController.getTasks(user.id!));
    setTitle(""); 
    setDesc("");
  };

  const deleteTask = (id: number) => {
    TaskController.deleteTask(id);
    setTasks(TaskController.getTasks(user.id!));
  };

  const editTask = (id: number) => {
    const newTitle = prompt("New Title", tasks.find(t => t.id === id)?.title);
    const newDesc = prompt("New Description", tasks.find(t => t.id === id)?.description);
    if (!newTitle || !newDesc) return;
    TaskController.updateTask(id, newTitle, newDesc);
    setTasks(TaskController.getTasks(user.id!));
  };

  const handleLogout = () => {
    onLogout();
    navigate("/login"); // redirect to login page
  };

  return (
    <div className="container">
      <h2>Welcome, {user.name}</h2>
      <button onClick={handleLogout} style={{ marginBottom: "20px" }}>Logout</button>
      
      <h3>Tasks</h3>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            <strong>{task.title}</strong> - {task.description}
            <button onClick={() => editTask(task.id)}>Edit</button>
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>

      <div style={{ marginTop: "20px" }}>
        <input 
          placeholder="Task Title" 
          value={title} 
          onChange={e => setTitle(e.target.value)} 
        />
        <input 
          placeholder="Task Description" 
          value={desc} 
          onChange={e => setDesc(e.target.value)} 
        />
        <button onClick={addTask}>Add Task</button>
      </div>
    </div>
  );
};