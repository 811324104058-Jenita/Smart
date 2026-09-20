import { useState } from "react";
import "./Dashboard.css";

import ComplaintPage from "./ComplaintPage";
import PaymentPage from "./PaymentPage";
import AmenityBookingPage from "./AmenityBookingPage";
import VisitorPage from "./VisitorPage";

function ResidentDashboard({ email, onLogout }) {
  const [currentPage, setCurrentPage] = useState("dashboard");

  if (currentPage === "complaints") {
    return (
      <ComplaintPage
        email={email}
        onBack={() => setCurrentPage("dashboard")}
      />
    );
  }

  if (currentPage === "payments") {
    return (
      <PaymentPage
        email={email}
        onBack={() => setCurrentPage("dashboard")}
      />
    );
  }

  if (currentPage === "amenities") {
    return (
      <AmenityBookingPage
        email={email}
        onBack={() => setCurrentPage("dashboard")}
      />
    );
  }

  if (currentPage === "visitors") {
    return (
      <VisitorPage
        email={email}
        onBack={() => setCurrentPage("dashboard")}
      />
    );
  }

  return (
    <div className="dashboard">
      <aside className="sidebar">

        <div className="sidebar-logo">
          <h2>🏢 SmartSociety</h2>
          <p>Resident Portal</p>
        </div>

        <div className="menu">

          <div
            className="menu-item active"
            onClick={() => setCurrentPage("dashboard")}
          >
            🏠 Dashboard
          </div>

          <div className="menu-item">
            👤 My Profile
          </div>

          <div
            className="menu-item"
            onClick={() => setCurrentPage("complaints")}
          >
            📝 My Complaints
          </div>

          <div
            className="menu-item"
            onClick={() => setCurrentPage("payments")}
          >
            💳 Payments
          </div>

          <div
            className="menu-item"
            onClick={() => setCurrentPage("amenities")}
          >
            📅 Amenity Booking
          </div>

          <div className="menu-item">
            📢 Notices
          </div>

          <div
            className="menu-item"
            onClick={() => setCurrentPage("visitors")}
          >
            🚪 Visitors
          </div>

        </div>

        <button className="logout-btn" onClick={onLogout}>
          🚪 Logout
        </button>

      </aside>

      <main className="dashboard-main">

        <header className="dashboard-header">

          <div>
            <p className="welcome-text">
              WELCOME BACK 👋
            </p>

            <h1>Resident Dashboard</h1>

            <p>
              Manage everything about your community in one place.
            </p>
          </div>

          <div className="user-info">
            🔔

            <div className="user-avatar">
              👤
            </div>

            <div>
              <strong>Resident</strong>
              <p>{email}</p>
            </div>
          </div>

        </header>

        <section className="stats-grid">

          <div
            className="stat-card"
            onClick={() => setCurrentPage("complaints")}
            style={{ cursor: "pointer" }}
          >
            <div className="stat-icon">📝</div>

            <div>
              <p>Open Complaints</p>
              <h2>02</h2>
              <span>View complaints →</span>
            </div>
          </div>

          <div
            className="stat-card"
            onClick={() => setCurrentPage("payments")}
            style={{ cursor: "pointer" }}
          >
            <div className="stat-icon">💳</div>

            <div>
              <p>Maintenance Due</p>
              <h2>₹2,500</h2>
              <span>Pay maintenance →</span>
            </div>
          </div>

          <div
            className="stat-card"
            onClick={() => setCurrentPage("amenities")}
            style={{ cursor: "pointer" }}
          >
            <div className="stat-icon">📅</div>

            <div>
              <p>Bookings</p>
              <h2>01</h2>
              <span>View bookings →</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">📢</div>

            <div>
              <p>New Notices</p>
              <h2>03</h2>
              <span>Check updates</span>
            </div>
          </div>

        </section>

        <section className="dashboard-grid">

          <div className="activity-panel">

            <div className="section-title">
              <div>
                <h2>Recent Activities</h2>
                <p>Your latest society updates</p>
              </div>

              <button onClick={() => setCurrentPage("complaints")}>
                View All
              </button>
            </div>

            <div className="activity">
              <span className="activity-icon">📝</span>

              <div>
                <h4>Complaint Updated</h4>
                <p>
                  Your water supply complaint is being reviewed.
                </p>
              </div>

              <small>Today</small>
            </div>

            <div className="activity">
              <span className="activity-icon">💳</span>

              <div>
                <h4>Payment Reminder</h4>
                <p>
                  Maintenance payment is due this month.
                </p>
              </div>

              <small>Yesterday</small>
            </div>

            <div className="activity">
              <span className="activity-icon">📅</span>

              <div>
                <h4>Booking Confirmed</h4>
                <p>
                  Community Hall booking confirmed.
                </p>
              </div>

              <small>2 days ago</small>
            </div>

          </div>

          <div className="notice-panel">

            <div className="section-title">
              <div>
                <h2>Latest Notices</h2>
                <p>Important community announcements</p>
              </div>
            </div>

            <div className="notice-card">
              <span>🔧</span>

              <div>
                <h4>Water Maintenance</h4>
                <p>
                  Water supply maintenance on Sunday from 10 AM.
                </p>
              </div>
            </div>

            <div className="notice-card">
              <span>🏢</span>

              <div>
                <h4>Monthly Meeting</h4>
                <p>
                  Society meeting scheduled for this weekend.
                </p>
              </div>
            </div>

            <div className="notice-card">
              <span>🎉</span>

              <div>
                <h4>Community Event</h4>
                <p>
                  Join us for the upcoming community celebration.
                </p>
              </div>
            </div>

          </div>

        </section>

      </main>
    </div>
  );
}

export default ResidentDashboard; 