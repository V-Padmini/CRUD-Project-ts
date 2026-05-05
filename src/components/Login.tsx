import React, { useState } from "react";
import { AuthController } from "../controllers/AuthController";
import type { IUser } from "../interfaces/IUser";
import { useNavigate, Link } from "react-router-dom";

interface Props {
  onLogin: (user: IUser) => void;
}

export const Login: React.FC<Props> = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    const user = AuthController.login(email, password);
    if (!user) return alert("Invalid email or password");

    // Save user in localStorage (optional, for persistence)
    localStorage.setItem("currentUser", JSON.stringify(user));
    onLogin(user);

    // Redirect to Dashboard
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

      <p style={{ marginTop: "10px" }}>
        New user? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
};