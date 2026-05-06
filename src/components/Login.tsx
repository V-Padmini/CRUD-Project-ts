import React, { useState } from "react";
import type { IUser } from "../interfaces/IUser";
import { AuthController } from "../controllers/AuthController";
import { useNavigate, Link } from "react-router-dom";

interface Props { onLogin: (user: IUser) => void; }

export const Login: React.FC<Props> = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Handle login
  const handleLogin = () => {
    const user = AuthController.login({ email, password });  // synchronous now
    if (!user) return alert("Invalid email or password");

    // Save user to localStorage
    localStorage.setItem("currentUser", JSON.stringify(user));
    onLogin(user);

    // Navigate to dashboard
    navigate("/dashboard");
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      <input 
        type="email" 
        value={email} 
        onChange={e => setEmail(e.target.value)} 
        placeholder="Email"
      />
      <input 
        type="password" 
        value={password} 
        onChange={e => setPassword(e.target.value)} 
        placeholder="Password"
      />
      <button onClick={handleLogin}>Login</button>
      <p>New user? <Link to="/register">Register here</Link></p>
    </div>
  );
};