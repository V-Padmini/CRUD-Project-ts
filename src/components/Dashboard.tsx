import React, { useState, useEffect } from "react";
import type { IUser } from "../interfaces/IUser";
import { TaskController } from "../controllers/TaskController";

interface Props { user: IUser; onLogout: () => void; }

export const Dashboard: React.FC<Props> = ({ user, onLogout }) => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const fetchTasks = async () => {
    const data = await TaskController.getTasks();
    setTasks(data.filter(t => t.userId === user.id));
  };

  useEffect(() => { fetchTasks(); }, []);

  const addTask = async () => {
    if(!title||!desc) return;
    await TaskController.addTask({ title, description: desc, userId: user.id! });
    setTitle(""); setDesc(""); fetchTasks();
  };

  const editTask = async (id:number) => {
    const newTitle = prompt("Title", tasks.find(t=>t.id===id)?.title);
    const newDesc = prompt("Description", tasks.find(t=>t.id===id)?.description);
    if(!newTitle||!newDesc) return;
    await TaskController.updateTask(id, { title:newTitle, description:newDesc });
    fetchTasks();
  };

  const deleteTask = async (id:number) => {
    await TaskController.deleteTask(id);
    fetchTasks();
  };

  const logout = () => { onLogout(); localStorage.removeItem("currentUser"); }

  return (
    <div>
      <h2>Welcome, {user.name}</h2>
      <button onClick={logout}>Logout</button>
      <ul>
        {tasks.map(t=>(
          <li key={t.id}>{t.title} - {t.description}
            <button onClick={()=>editTask(t.id)}>Edit</button>
            <button onClick={()=>deleteTask(t.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <input value={title} placeholder="Title" onChange={e=>setTitle(e.target.value)}/>
      <input value={desc} placeholder="Description" onChange={e=>setDesc(e.target.value)}/>
      <button onClick={addTask}>Add Task</button>
    </div>
  );
};