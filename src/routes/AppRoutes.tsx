import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import type { IUser } from "../interfaces/IUser";
import { Login } from "../components/Login";
import { Register } from "../components/Register";
import { Dashboard } from "../components/Dashboard";

export const AppRoutes: React.FC = () => {
  const [user, setUser] = useState<IUser | null>(
    JSON.parse(localStorage.getItem("currentUser") || "null")
  );

  const handleLogin = (u: IUser) => {
    setUser(u);
    localStorage.setItem("currentUser", JSON.stringify(u));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("currentUser");
  };

  return (
    <Routes>
      {/* If user is logged in, redirect from /login or /register to /dashboard */}
      <Route
        path="/login"
        element={user ? <Navigate to="/dashboard" /> : <Login onLogin={handleLogin} />}
      />
      <Route
        path="/register"
        element={user ? <Navigate to="/dashboard" /> : <Register />}
      />
      <Route
        path="/dashboard"
        element={user ? <Dashboard user={user} onLogout={handleLogout} /> : <Navigate to="/login" />}
      />
      <Route path="*" element={<Navigate to={user ? "/dashboard" : "/login"} />} />
    </Routes>
  );
};