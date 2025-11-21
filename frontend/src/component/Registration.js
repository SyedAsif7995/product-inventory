import { useState } from "react";
import { Link } from "react-router-dom";
import "./Auth.css";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleRegister(e) {
    e.preventDefault();

    const userData = { email, password };
    localStorage.setItem("registeredUser", JSON.stringify(userData));

    alert("Registration successful!");
  }

  return (
    <div className="auth-container">
      <h2>Register</h2>

      <form onSubmit={handleRegister}>
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
          Register
        </button>
      </form>

      <Link to="/login" className="auth-link">
        Already have an account? Login
      </Link>
    </div>
  );
}

export default Register;
