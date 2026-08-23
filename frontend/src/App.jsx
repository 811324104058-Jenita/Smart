import { useState } from "react";
import "./App.css";

function App() {
  const [role, setRole] = useState("RESIDENT");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    alert("Login successful as " + role);
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Smart Society</h1>
        <p>Management System</p>

        <form onSubmit={login}>
          <label>Role</label>

          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="RESIDENT">Resident</option>
            <option value="SECURITY_GUARD">Security Guard</option>
            <option value="ADMIN">Admin</option>
          </select>

          <label>Email</label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Password</label>

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default App;