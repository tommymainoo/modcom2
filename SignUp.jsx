import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";


const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [loading, setLoading] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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
      data.append("email", email);
      data.append("phone", phone);

      const response = await axios.post(
        "https://tommymainoo.pythonanywhere.com/api/sign_up",
        data
      );

      setLoading("");
      setSuccess(response.data.message || "Sign-up successful!");
      // Optionally redirect to sign-in page
      setTimeout(() => navigate("/signin"), 1500);
    } catch (err) {
      setLoading("");
      setError(err.response?.data?.error || "Failed to sign up.");
    }
  };

  return (
    <div className="signin-container">
      <div className="signin-card shadow">
        <h2 className="signin-title">Join TM Style Housing</h2>
        <p className="signin-subtitle">Create your account to get started</p>

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
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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

          <input
            type="text"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="form-input"
          />

          <button type="submit" className="btn btn-primary w-100">
            Sign Up
          </button>
        </form>

        <div className="signup-link">
          <p>
            Already have an account?{" "}
            <Link to="/signin" className="link">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
