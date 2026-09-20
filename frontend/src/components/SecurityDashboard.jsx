import { useState } from "react";
import "./Dashboard.css";
import SecurityVisitorPage from "./SecurityVisitorPage";

function SecurityDashboard({ email, onLogout }) {
  const [currentPage, setCurrentPage] = useState("dashboard");

  if (currentPage === "visitors") {
    return (
      <SecurityVisitorPage
        onBack={() => setCurrentPage("dashboard")}
      />
    );
  }

  return (
    <div className="dashboard">

      <aside className="sidebar">

        <div className="sidebar-logo">
          <h2>🛡️ SmartSociety</h2>
          <p>Security Portal</p>
        </div>

        <div className="menu">

          <div
            className="menu-item active"
            onClick={() => setCurrentPage("dashboard")}
          >
            🏠 Dashboard
          </div>

          <div
            className="menu-item"
            onClick={() => setCurrentPage("visitors")}
          >
            🚶 Visitor Verification
          </div>

          <div
            className="menu-item"
            onClick={() => setCurrentPage("visitors")}
          >
            🚪 Visitor Exit
          </div>

          <div
            className="menu-item"
            onClick={() => setCurrentPage("visitors")}
          >
            📋 Visitor Records
          </div>

          <div className="menu-item">
            🏢 Resident Directory
          </div>

          <div className="menu-item">
            🚨 Emergency Alerts
          </div>

        </div>

        <button
          className="logout-btn"
          onClick={onLogout}
        >
          🚪 Logout
        </button>

      </aside>

      <main className="dashboard-main">

        <header className="dashboard-header">

          <div>
            <p className="welcome-text">
              SECURITY CONTROL CENTER 🛡️
            </p>

            <h1>Security Dashboard</h1>

            <p>
              Monitor visitors and keep your community safe.
            </p>
          </div>

          <div className="user-info">

            🔔

            <div className="user-avatar">
              🛡️
            </div>

            <div>
              <strong>Security Guard</strong>
              <p>{email}</p>
            </div>

          </div>

        </header>

        <section className="stats-grid">

          <div className="stat-card">

            <div className="stat-icon">
              🚶
            </div>

            <div>
              <p>Visitors Today</p>
              <h2>36</h2>
              <span>Total entries today</span>
            </div>

          </div>

          <div className="stat-card">

            <div className="stat-icon">
              🏠
            </div>

            <div>
              <p>Currently Inside</p>
              <h2>12</h2>
              <span>Active visitors</span>
            </div>

          </div>

          <div className="stat-card">

            <div className="stat-icon">
              🚪
            </div>

            <div>
              <p>Exited Today</p>
              <h2>24</h2>
              <span>Visitor exits</span>
            </div>

          </div>

          <div className="stat-card">

            <div className="stat-icon">
              🚨
            </div>

            <div>
              <p>Alerts</p>
              <h2>01</h2>
              <span>Requires attention</span>
            </div>

          </div>

        </section>

        <section className="dashboard-grid">

          <div className="activity-panel">

            <div className="section-title">

              <div>
                <h2>Recent Visitor Activity</h2>
                <p>
                  Latest entries and exits
                </p>
              </div>

              <button
                onClick={() => setCurrentPage("visitors")}
              >
                View All
              </button>

            </div>

            <div className="activity">

              <span className="activity-icon">
                🟢
              </span>

              <div>
                <h4>Visitor Entered</h4>
                <p>
                  Raj Kumar entered for Apartment A-204.
                </p>
              </div>

              <small>
                10:30 AM
              </small>

            </div>

            <div className="activity">

              <span className="activity-icon">
                🔴
              </span>

              <div>
                <h4>Visitor Exited</h4>
                <p>
                  Priya Sharma exited from Apartment B-105.
                </p>
              </div>

              <small>
                10:05 AM
              </small>

            </div>

            <div className="activity">

              <span className="activity-icon">
                🟢
              </span>

              <div>
                <h4>Delivery Entry</h4>
                <p>
                  Amazon delivery entered for Apartment C-302.
                </p>
              </div>

              <small>
                09:45 AM
              </small>

            </div>

          </div>

          <div className="notice-panel">

            <div className="section-title">

              <div>
                <h2>Quick Actions</h2>
                <p>
                  Frequently used security actions
                </p>
              </div>

            </div>

            <div
              className="notice-card"
              onClick={() => setCurrentPage("visitors")}
              style={{ cursor: "pointer" }}
            >

              <span>
                ➕
              </span>

              <div>
                <h4>
                  Verify Visitor
                </h4>

                <p>
                  Search and verify a visitor using the QR pass.
                </p>
              </div>

            </div>

            <div
              className="notice-card"
              onClick={() => setCurrentPage("visitors")}
              style={{ cursor: "pointer" }}
            >

              <span>
                🚪
              </span>

              <div>
                <h4>
                  Mark Visitor Exit
                </h4>

                <p>
                  Update visitor exit information.
                </p>
              </div>

            </div>

            <div className="notice-card">

              <span>
                🚨
              </span>

              <div>
                <h4>
                  Emergency Alert
                </h4>

                <p>
                  Report an emergency or security issue.
                </p>
              </div>

            </div>

          </div>

        </section>

      </main>

    </div>
  );
}

export default SecurityDashboard;