import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";


const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setLoading("Please wait...");
    setError("");
    setSuccess("");

    try {
      const data = new FormData();
      data.append("username", username);
      data.append("password", password);

      const response = await axios.post(
        "https://tommymainoo.pythonanywhere.com/api/signin",
        data
      );

      setLoading("");
      if (response.data.user) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
        setSuccess(response.data.welcome || "Login successful!");
        navigate("/");
      } else {
        setError(response.data.message || "Login failed.");
      }
    } catch (err) {
      setLoading("");
      setError(err.response?.data?.message || "An error occurred.");
    }
  };

  return (
    <div className="signin-container">
      <div className="signin-card shadow">
        <h2 className="signin-title">Welcome Back</h2>
        <p className="signin-subtitle">Sign in to access TM Style Housing</p>

        <form onSubmit={submit}>
          {success && <div className="alert alert-success">{success}</div>}
          {error && <div className="alert alert-danger">{error}</div>}
          {loading && <div className="loading">{loading}</div>}

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="form-input"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="form-input"
          />

          <button className="btn btn-primary w-100" type="submit">
            Sign In
          </button>
        </form>

        <div className="signup-link">
          <p>
            Don't have an account?{" "}
            <Link to="/signup" className="link">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
