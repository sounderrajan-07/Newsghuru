import React, { useState } from "react";
import API from "../config/api";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await API.post("/api/login", {
        email,
        password,
      });

      const token = res.data?.token;

      if (!token) {
        throw new Error("Token not received");
      }

      // store token
      localStorage.setItem("token", token);

      alert("Login successful 🎉");

      navigate("/");

    } catch (error) {
      console.error("Login Error:", error);
      alert("Invalid email or password ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">

      <form className="login-form" onSubmit={handleLogin}>

        <h2>Admin Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

      </form>

    </div>
  );
}

export default Login;