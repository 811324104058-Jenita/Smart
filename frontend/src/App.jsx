import { useState } from "react";
import "./App.css";

function App() {
  const [role, setRole] = useState("Resident");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (email === "" || password === "") {
      setMessage("Please enter email and password!");
      return;
    }

    setMessage(`Login Successful! Welcome ${role}`);
  };

  return (
    <div className="app">
      <div className="background"></div>

      <div className="container">

        <div className="left-section">
          <div className="logo">
            <div className="logo-icon">🏢</div>
            <h2>SmartSociety</h2>
          </div>

          <div className="hero">
            <span className="tag">SMART LIVING PLATFORM</span>

            <h1>
              Manage Your
              <span> Community</span>
              <br />
              Smarter.
            </h1>

            <p>
              A simple and secure platform to manage residents,
              visitors, complaints, maintenance payments and society
              activities.
            </p>

            <div className="features">
              <div className="feature">
                <span>🛡️</span>
                <div>
                  <h3>Secure Access</h3>
                  <p>Role-based authentication and authorization</p>
                </div>
              </div>

              <div className="feature">
                <span>👥</span>
                <div>
                  <h3>Easy Management</h3>
                  <p>Manage your society from one platform</p>
                </div>
              </div>

              <div className="feature">
                <span>⚡</span>
                <div>
                  <h3>Fast & Efficient</h3>
                  <p>Quick access to all important services</p>
                </div>
              </div>
            </div>
          </div>

          <div className="stats">
            <div>
              <h2>500+</h2>
              <p>Residents</p>
            </div>

            <div>
              <h2>24/7</h2>
              <p>Security</p>
            </div>

            <div>
              <h2>100%</h2>
              <p>Digital</p>
            </div>
          </div>
        </div>

        <div className="login-section">
          <div className="login-card">

            <div className="mobile-logo">
              <div className="logo-icon">🏢</div>
              <h2>SmartSociety</h2>
            </div>

            <div className="login-header">
              <h1>Welcome Back 👋</h1>
              <p>Sign in to access your society dashboard</p>
            </div>

            <div className="role-selection">
              <button
                className={role === "Resident" ? "role active" : "role"}
                onClick={() => setRole("Resident")}
              >
                <span>🏠</span>
                Resident
              </button>

              <button
                className={role === "Security Guard" ? "role active" : "role"}
                onClick={() => setRole("Security Guard")}
              >
                <span>🛡️</span>
                Security
              </button>

              <button
                className={role === "Admin" ? "role active" : "role"}
                onClick={() => setRole("Admin")}
              >
                <span>👨‍💼</span>
                Admin
              </button>
            </div>

            <form onSubmit={handleLogin}>

              <div className="input-group">
                <label>Email Address</label>
                <div className="input-box">
                  <span>✉️</span>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="input-group">
                <label>Password</label>
                <div className="input-box">
                  <span>🔒</span>
                  <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <div className="login-options">
                <label>
                  <input type="checkbox" />
                  Remember me
                </label>

                <a href="#forgot">Forgot Password?</a>
              </div>

              <button type="submit" className="login-btn">
                Login as {role} →
              </button>

            </form>

            {message && (
              <div className="message">
                {message}
              </div>
            )}

            <p className="register">
              New to SmartSociety?
              <a href="#register"> Create an Account</a>
            </p>

            <div className="security-text">
              🔐 Your information is protected and secure
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

export default App;