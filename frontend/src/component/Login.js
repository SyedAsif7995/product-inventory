import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";

function Login({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleLogin(e) {
    e.preventDefault();

    const stored = JSON.parse(localStorage.getItem("registeredUser"));

    if (!stored) {
      alert("No user registered! Please register first.");
      return;
    }

    if (email === stored.email && password === stored.password) {
      setUser({ email });
      navigate("/products");
    } else {
      alert("Invalid email or password");
    }
  }

  return (
    <div className="auth-container">
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          className="auth-input"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          className="auth-input"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />

        <button className="auth-btn" type="submit">
          Login
        </button>
      </form>

      <Link to="/register" className="auth-link">
        Create new account
      </Link>
    </div>
  );
}

export default Login;
