import React, { useState } from "react";
import { AuthController } from "../controllers/AuthController";
import { useNavigate, Link } from "react-router-dom";

export const Register: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Handle register
  const handleRegister = () => {
    if (!name || !email || !password) return alert("Fill all fields");

    const user = AuthController.register({ name, email, password }); // synchronous call
    if (!user) return alert("User already exists");

    alert("Registered! Please login.");

    // Clear form
    setName("");
    setEmail("");
    setPassword("");

    // Navigate to login page
    navigate("/login");
  };

  return (
    <div className="form-container">
      <h2>Register</h2>
      <input
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Name"
      />
      <input
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
      <button onClick={handleRegister}>Register</button>
      <p>Already have account? <Link to="/login">Login here</Link></p>
    </div>
  );
};