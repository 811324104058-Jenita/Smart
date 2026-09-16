import "./Dashboard.css";

function AdminDashboard({ email, onLogout }) {
  return (
    <div className="dashboard">

      <aside className="sidebar">
        <div className="sidebar-logo">
          <h2>🏢 SmartSociety</h2>
          <p>Admin Portal</p>
        </div>

        <div className="menu">
          <div className="menu-item active">📊 Dashboard</div>
          <div className="menu-item">👥 Manage Residents</div>
          <div className="menu-item">📝 Complaints</div>
          <div className="menu-item">💳 Payments</div>
          <div className="menu-item">🚪 Visitors</div>
          <div className="menu-item">📅 Amenities</div>
          <div className="menu-item">📢 Notices</div>
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
            <div className="user-avatar">👨‍💼</div>
            <div>
              <strong>Administrator</strong>
              <p>{email}</p>
            </div>
          </div>
        </header>

        <section className="stats-grid">

          <div className="stat-card">
            <div className="stat-icon">👥</div>
            <div>
              <p>Total Residents</p>
              <h2>248</h2>
              <span>+12 this month</span>
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
                <p>Priya Sharma joined Apartment B-204.</p>
              </div>
              <small>10 min ago</small>
            </div>

            <div className="activity">
              <span className="activity-icon">📝</span>
              <div>
                <h4>New Complaint Raised</h4>
                <p>Water leakage reported in Block A.</p>
              </div>
              <small>25 min ago</small>
            </div>

            <div className="activity">
              <span className="activity-icon">💳</span>
              <div>
                <h4>Payment Received</h4>
                <p>₹2,500 maintenance payment received.</p>
              </div>
              <small>1 hour ago</small>
            </div>

            <div className="activity">
              <span className="activity-icon">📢</span>
              <div>
                <h4>New Notice Published</h4>
                <p>Water maintenance notice was published.</p>
              </div>
              <small>2 hours ago</small>
            </div>

          </div>

          <div className="notice-panel">

            <div className="section-title">
              <div>
                <h2>Quick Management</h2>
                <p>Manage important society operations</p>
              </div>
            </div>

            <div className="notice-card">
              <span>👥</span>
              <div>
                <h4>Manage Residents</h4>
                <p>Add, update or manage resident information.</p>
              </div>
            </div>

            <div className="notice-card">
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