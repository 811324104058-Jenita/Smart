import { useEffect, useState } from "react";
import "./Dashboard.css";
import AdminNoticePage from "./AdminNoticePage";

function AdminDashboard({ email, onLogout }) {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState("dashboard");

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("/api/admin/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load users");
        }
        return response.json();
      })
      .then((data) => setUsers(Array.isArray(data) ? data : []))
      .catch((error) => console.error("Error loading users:", error));
  }, []);

  if (currentPage === "notices") {
    return (
      <AdminNoticePage
        onBack={() => setCurrentPage("dashboard")}
      />
    );
  }

  if (currentPage === "residents") {
    return (
      <div className="dashboard">
        <aside className="sidebar">
          <div className="sidebar-logo">
            <h2>🏢 SmartSociety</h2>
            <p>Admin Portal</p>
          </div>

          <div className="menu">
            <div
              className="menu-item"
              onClick={() => setCurrentPage("dashboard")}
            >
              📊 Dashboard
            </div>

            <div className="menu-item active">
              👥 Manage Residents
            </div>

            <div className="menu-item">📝 Complaints</div>
            <div className="menu-item">💳 Payments</div>
            <div className="menu-item">🚪 Visitors</div>
            <div className="menu-item">📅 Amenities</div>

            <div
              className="menu-item"
              onClick={() => setCurrentPage("notices")}
            >
              📢 Notices
            </div>

            <div className="menu-item">📈 Reports</div>
          </div>

          <button className="logout-btn" onClick={onLogout}>
            🚪 Logout
          </button>
        </aside>

        <main className="dashboard-main">
          <header className="dashboard-header">
            <div>
              <p className="welcome-text">ADMIN CONTROL CENTER 👨‍💼</p>
              <h1>Manage Residents</h1>
              <p>Manage registered residents in your society.</p>
            </div>

            <div className="user-info">
              🔔

              <div className="user-avatar">
                👨‍💼
              </div>

              <div>
                <strong>Administrator</strong>
                <p>{email}</p>
              </div>
            </div>
          </header>

          <section className="dashboard-grid">
            <div className="activity-panel">
              <div className="section-title">
                <div>
                  <h2>Resident Management</h2>
                  <p>Manage society residents and their accounts.</p>
                </div>

                <button>➕ Add Resident</button>
              </div>

              {users.length === 0 ? (
                <p>Loading users...</p>
              ) : (
                users.map((user) => (
                  <div className="activity" key={user.userId}>
                    <span className="activity-icon">
                      {user.role === "ADMIN" ? "👨‍💼" : "👤"}
                    </span>

                    <div>
                      <h4>{user.name}</h4>
                      <p>{user.email}</p>
                      <small>
                        Role: {user.role} • Status: {user.status}
                      </small>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="notice-panel">
              <div className="section-title">
                <div>
                  <h2>Resident Actions</h2>
                  <p>Manage resident accounts.</p>
                </div>
              </div>

              <div className="notice-card">
                <span>➕</span>
                <div>
                  <h4>Add Resident</h4>
                  <p>Register a new resident.</p>
                </div>
              </div>

              <div className="notice-card">
                <span>✏️</span>
                <div>
                  <h4>Update Resident</h4>
                  <p>Update resident information.</p>
                </div>
              </div>

              <div className="notice-card">
                <span>🔒</span>
                <div>
                  <h4>Account Status</h4>
                  <p>Activate or deactivate accounts.</p>
                </div>
              </div>
            </div>
          </section>

          <button
            onClick={() => setCurrentPage("dashboard")}
            style={{
              marginTop: "20px",
              padding: "12px 20px",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer"
            }}
          >
            ← Back to Dashboard
          </button>
        </main>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <div className="sidebar-logo">
          <h2>🏢 SmartSociety</h2>
          <p>Admin Portal</p>
        </div>

        <div className="menu">
          <div
            className="menu-item active"
            onClick={() => setCurrentPage("dashboard")}
          >
            📊 Dashboard
          </div>

          <div
            className="menu-item"
            onClick={() => setCurrentPage("residents")}
          >
            👥 Manage Residents
          </div>

          <div className="menu-item">📝 Complaints</div>
          <div className="menu-item">💳 Payments</div>
          <div className="menu-item">🚪 Visitors</div>
          <div className="menu-item">📅 Amenities</div>

          <div
            className="menu-item"
            onClick={() => setCurrentPage("notices")}
          >
            📢 Notices
          </div>

          <div className="menu-item">📈 Reports</div>
        </div>

        <button className="logout-btn" onClick={onLogout}>
          🚪 Logout
        </button>
      </aside>

      <main className="dashboard-main">
        <header className="dashboard-header">
          <div>
            <p className="welcome-text">ADMIN CONTROL CENTER 👨‍💼</p>
            <h1>Society Overview</h1>
            <p>Manage your entire community from one central place.</p>
          </div>

          <div className="user-info">
            🔔

            <div className="user-avatar">
              👨‍💼
            </div>

            <div>
              <strong>Administrator</strong>
              <p>{email}</p>
            </div>
          </div>
        </header>

        <section className="stats-grid">
          <div
            className="stat-card"
            onClick={() => setCurrentPage("residents")}
            style={{ cursor: "pointer" }}
          >
            <div className="stat-icon">👥</div>

            <div>
              <p>Total Users</p>
              <h2>{users.length}</h2>
              <span>Manage users →</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">📝</div>

            <div>
              <p>Open Complaints</p>
              <h2>12</h2>
              <span>4 require attention</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">💳</div>

            <div>
              <p>Monthly Collection</p>
              <h2>₹4.8L</h2>
              <span>82% collected</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">🚪</div>

            <div>
              <p>Visitors Today</p>
              <h2>36</h2>
              <span>12 currently inside</span>
            </div>
          </div>
        </section>

        <section className="dashboard-grid">
          <div className="activity-panel">
            <div className="section-title">
              <div>
                <h2>Recent Activities</h2>
                <p>Latest updates from your society</p>
              </div>

              <button>View All</button>
            </div>

            <div className="activity">
              <span className="activity-icon">👤</span>

              <div>
                <h4>New Resident Added</h4>
                <p>Resident account management is available.</p>
              </div>

              <small>Today</small>
            </div>

            <div className="activity">
              <span className="activity-icon">📝</span>

              <div>
                <h4>Complaint Management</h4>
                <p>Review and manage resident complaints.</p>
              </div>

              <small>Today</small>
            </div>

            <div className="activity">
              <span className="activity-icon">💳</span>

              <div>
                <h4>Payment Received</h4>
                <p>Maintenance payment received.</p>
              </div>

              <small>Today</small>
            </div>

            <div className="activity">
              <span className="activity-icon">📢</span>

              <div>
                <h4>Notice Management</h4>
                <p>Society announcements can be managed here.</p>
              </div>

              <small>Today</small>
            </div>
          </div>

          <div className="notice-panel">
            <div className="section-title">
              <div>
                <h2>Quick Management</h2>
                <p>Manage important society operations</p>
              </div>
            </div>

            <div
              className="notice-card"
              onClick={() => setCurrentPage("residents")}
              style={{ cursor: "pointer" }}
            >
              <span>👥</span>

              <div>
                <h4>Manage Residents</h4>
                <p>Add, update or manage resident information.</p>
              </div>
            </div>

            <div
              className="notice-card"
              onClick={() => setCurrentPage("notices")}
              style={{ cursor: "pointer" }}
            >
              <span>📢</span>

              <div>
                <h4>Create Notice</h4>
                <p>Publish an announcement for all residents.</p>
              </div>
            </div>

            <div className="notice-card">
              <span>📊</span>

              <div>
                <h4>View Reports</h4>
                <p>Check payments, complaints and society reports.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default AdminDashboard;