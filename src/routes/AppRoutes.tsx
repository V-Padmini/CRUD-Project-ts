import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import type { IUser } from "../interfaces/IUser";
import { Login } from "../components/Login";
import { Register } from "../components/Register";
import { Dashboard } from "../components/Dashboard";

export const AppRoutes: React.FC = () => {
  const [user,setUser] = useState<IUser | null>(
    JSON.parse(localStorage.getItem("currentUser") || "null")
  );
  const handleLogout = () => setUser(null);

  return (
    <Routes>
      <Route path="/login" element={user?<Navigate to="/dashboard"/>:<Login onLogin={setUser}/>}/>
      <Route path="/register" element={user?<Navigate to="/dashboard"/>:<Register/>}/>
      <Route path="/dashboard" element={user?<Dashboard user={user} onLogout={handleLogout}/>:<Navigate to="/login"/>}/>
      <Route path="*" element={<Navigate to={user?"/dashboard":"/login"}/>}/>
    </Routes>
  );
};