import { useState } from "react";
import "./App.css";

function App() {
  const [role, setRole] = useState("Resident");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError("");

    if (email === "" || password === "") {
      setLoginError("Please enter email and password");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      setLoggedIn(true);
    } catch (error) {
      setLoginError(error.message || "Unable to connect to the server");
    }
  };

  if (loggedIn) {
    return (
      <div className="dashboard">
        <aside className="sidebar">
          <h2>🏢 SmartSociety</h2>

          <div className="menu">
            <p className="active-menu">🏠 Dashboard</p>
            <p>👤 My Profile</p>
            <p>📝 Complaints</p>
            <p>💳 Payments</p>
            <p>📅 Amenity Booking</p>
            <p>📢 Notices</p>
            <p>🚪 Visitors</p>
          </div>

          <button
            className="logout-btn"
            onClick={() => setLoggedIn(false)}
          >
            Logout
          </button>
        </aside>

        <main className="dashboard-main">
          <div className="dashboard-header">
            <div>
              <h1>Welcome, {role}! 👋</h1>
              <p>Here's what's happening in your society today.</p>
            </div>

            <div className="profile">
              🔔 <span>{role}</span> 👤
            </div>
          </div>

          <div className="cards">
            <div className="dashboard-card">
              <div className="card-icon">👥</div>
              <div>
                <p>Total Residents</p>
                <h2>248</h2>
              </div>
            </div>

            <div className="dashboard-card">
              <div className="card-icon">📝</div>
              <div>
                <p>Open Complaints</p>
                <h2>12</h2>
              </div>
            </div>

            <div className="dashboard-card">
              <div className="card-icon">🚪</div>
              <div>
                <p>Visitors Today</p>
                <h2>36</h2>
              </div>
            </div>

            <div className="dashboard-card">
              <div className="card-icon">💳</div>
              <div>
                <p>Maintenance Due</p>
                <h2>₹2,500</h2>
              </div>
            </div>
          </div>

          <div className="dashboard-content">
            <div className="recent-section">
              <h2>Recent Activities</h2>

              <div className="activity">
                <span>📝</span>
                <div>
                  <h4>New Complaint</h4>
                  <p>Water supply issue reported.</p>
                </div>
              </div>

              <div className="activity">
                <span>💳</span>
                <div>
                  <h4>Payment Received</h4>
                  <p>Maintenance payment completed.</p>
                </div>
              </div>

              <div className="activity">
                <span>🚪</span>
                <div>
                  <h4>Visitor Entry</h4>
                  <p>A visitor entered the society.</p>
                </div>
              </div>
            </div>

            <div className="notice-section">
              <h2>📢 Latest Notices</h2>

              <div className="notice">
                <h4>Water Maintenance</h4>
                <p>Water supply maintenance on Sunday.</p>
              </div>

              <div className="notice">
                <h4>Community Meeting</h4>
                <p>Monthly society meeting this weekend.</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="app">
      <div className="container">

        <div className="left-section">
          <div className="logo">
            <div className="logo-icon">🏢</div>
            <h2>SmartSociety</h2>
          </div>

          <div className="hero">
            <span className="tag">SMART LIVING PLATFORM</span>

            <h1>
              Manage Your <span>Community</span> Smarter.
            </h1>

            <p>
              A secure platform to manage residents, visitors,
              complaints, maintenance payments and society activities.
            </p>
          </div>
        </div>

        <div className="login-section">
          <div className="login-card">

            <div className="login-header">
              <h1>Welcome Back 👋</h1>
              <p>Sign in to access your society dashboard</p>
            </div>

            <div className="role-selection">
              <button
                className={role === "Resident" ? "role active" : "role"}
                onClick={() => setRole("Resident")}
              >
                🏠 Resident
              </button>

              <button
                className={role === "Security Guard" ? "role active" : "role"}
                onClick={() => setRole("Security Guard")}
              >
                🛡️ Security
              </button>

              <button
                className={role === "Admin" ? "role active" : "role"}
                onClick={() => setRole("Admin")}
              >
                👨‍💼 Admin
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

              {loginError && <p className="login-error">{loginError}</p>}

              <button type="submit" className="login-btn">
                Login as {role} →
              </button>
            </form>

          </div>
        </div>

      </div>
    </div>
  );
}

export default App;