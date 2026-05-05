import React, { useState } from "react";
import { AuthController } from "../controllers/AuthController";
import { useNavigate, Link } from "react-router-dom";

export const Register: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = () => {
    if (!name || !email || !password) return alert("Please fill all fields");

    const user = AuthController.register({ name, email, password });
    if (!user) return alert("User already exists");

    alert("Registration successful! Please login.");
    setName(""); setEmail(""); setPassword("");

    // Redirect to login page
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

      <p style={{ marginTop: "10px" }}>
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
};