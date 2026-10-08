import { useState } from "react";
import "./Dashboard.css";
import NoticePage from "./NoticePage";
import ComplaintPage from "./ComplaintPage";
import PaymentPage from "./PaymentPage";
import AmenityBookingPage from "./AmenityBookingPage";
import VisitorPage from "./VisitorPage";
import ProfilePage from "./ProfilePage";

function ResidentDashboard({ email, onLogout }) {
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [showHelp, setShowHelp] = useState(false);

  const residentEmail = email || localStorage.getItem("email");
  if (currentPage === "profile") {
  return (
    <ProfilePage
      email={residentEmail}
      onBack={() => setCurrentPage("dashboard")}
    />
  );
}

  // COMPLAINTS
  if (currentPage === "complaints") {
    return (
      <ComplaintPage
        email={residentEmail}
        onBack={() => setCurrentPage("dashboard")}
      />
    );
  }

  // PAYMENTS
  if (currentPage === "payments") {
    return (
      <PaymentPage
        email={residentEmail}
        onBack={() => setCurrentPage("dashboard")}
      />
    );
  }

  // AMENITIES
  if (currentPage === "amenities") {
    return (
      <AmenityBookingPage
        email={residentEmail}
        onBack={() => setCurrentPage("dashboard")}
      />
    );
  }

  // VISITORS
  if (currentPage === "visitors") {
    return (
      <VisitorPage
        email={residentEmail}
        onBack={() => setCurrentPage("dashboard")}
      />
    );
  }

  // NOTICES
  if (currentPage === "notices") {
    return (
      <NoticePage
        onBack={() => setCurrentPage("dashboard")}
      />
    );
  }

  return (
    <div className="dashboard resident-dashboard">

      {/* SIDEBAR */}
      <aside className="sidebar">

        <div className="sidebar-logo">
          <div className="logo-mark">🏢</div>

          <div>
            <h2>SmartSociety</h2>
            <p>Resident Portal</p>
          </div>
        </div>

        <div className="menu">

          <div
            className={`menu-item ${
              currentPage === "dashboard" ? "active" : ""
            }`}
            onClick={() => setCurrentPage("dashboard")}
          >
            <span>🏠</span>
            <span>Dashboard</span>
          </div>

          {/* MY PROFILE - TEMPORARILY DISABLED */}
          <div
             className={`menu-item ${
                 currentPage === "profile" ? "active" : ""
            }`}
             onClick={() => setCurrentPage("profile")}
          >
          <span>👤</span>
           <span>My Profile</span>
           </div>
          <div
            className="menu-item"
            onClick={() => setCurrentPage("complaints")}
          >
            <span>📝</span>
            <span>My Complaints</span>
          </div>

          <div
            className="menu-item"
            onClick={() => setCurrentPage("payments")}
          >
            <span>💳</span>
            <span>Payments</span>
          </div>

          <div
            className="menu-item"
            onClick={() => setCurrentPage("amenities")}
          >
            <span>📅</span>
            <span>Amenity Booking</span>
          </div>

          <div
            className="menu-item"
            onClick={() => setCurrentPage("notices")}
          >
            <span>📢</span>
            <span>Notices</span>
          </div>

          <div
            className="menu-item"
            onClick={() => setCurrentPage("visitors")}
          >
            <span>🚪</span>
            <span>Visitors</span>
          </div>

        </div>

        <div className="sidebar-bottom">
              <div
  className="help-card"
  onClick={() => {
    window.location.href =
      "mailto:admin@gmail.com?subject=Smart Society Support";
  }}
>
  <div className="help-icon">💡</div>

  <div>
    <strong>Need Help?</strong>
    <p>Contact society support</p>
  </div>
</div>
        
          <button className="logout-btn" onClick={onLogout}>
            <span>🚪</span>
            Logout
          </button>

        </div>

      </aside>

      {/* MAIN CONTENT */}
      <main className="dashboard-main">

        {/* HEADER */}
        <header className="dashboard-header">

          <div className="header-left">

            <p className="welcome-text">
              WELCOME BACK 👋
            </p>

            <h1>Good to see you!</h1>

            <p className="header-description">
              Here's what's happening in your community today.
            </p>

          </div>

          <div className="user-info">

            <button
              className="notification-btn"
              onClick={() => setCurrentPage("notices")}
              title="Notifications"
            >
              🔔
              <span className="notification-dot"></span>
            </button>

            <div className="user-avatar">
              👤
            </div>

            <div className="user-details">
              <strong>Resident</strong>
              <p>{residentEmail}</p>
            </div>

          </div>

        </header>

        {/* WELCOME BANNER */}
        <section className="resident-welcome-card">

          <div className="welcome-content">

            <span className="welcome-badge">
              ✨ SMART COMMUNITY
            </span>

            <h2>
              Manage your society,
              <br />
              <span>all in one place.</span>
            </h2>

            <p>
              Pay maintenance, book amenities, raise complaints
              and stay updated with your community.
            </p>

            <button
              className="welcome-action"
              onClick={() => setCurrentPage("payments")}
            >
              Manage Payments →
            </button>

          </div>

          <div className="welcome-visual">

            <div className="building-glow"></div>

            <div className="building-icon">
              🏢
            </div>

            <div className="floating-mini-card card-one">
              💳
              <span>Payments</span>
            </div>

            <div className="floating-mini-card card-two">
              📢
              <span>Notices</span>
            </div>

            <div className="floating-mini-card card-three">
              🔐
              <span>Secure</span>
            </div>

          </div>

        </section>

        {/* STAT CARDS */}
        <section className="stats-grid">

          <div
            className="stat-card modern-stat"
            onClick={() => setCurrentPage("complaints")}
          >
            <div className="stat-top">
              <div className="stat-icon complaint-icon">
                📝
              </div>

              <span className="stat-arrow">↗</span>
            </div>

            <p>Open Complaints</p>

            <h2>02</h2>

            <span className="stat-link">
              View complaints
            </span>
          </div>

          <div
            className="stat-card modern-stat"
            onClick={() => setCurrentPage("payments")}
          >
            <div className="stat-top">
              <div className="stat-icon payment-icon">
                💳
              </div>

              <span className="stat-arrow">↗</span>
            </div>

            <p>Maintenance Due</p>

            <h2>₹2,500</h2>

            <span className="stat-link">
              Pay maintenance
            </span>
          </div>

          <div
            className="stat-card modern-stat"
            onClick={() => setCurrentPage("amenities")}
          >
            <div className="stat-top">
              <div className="stat-icon booking-icon">
                📅
              </div>

              <span className="stat-arrow">↗</span>
            </div>

            <p>Active Bookings</p>

            <h2>01</h2>

            <span className="stat-link">
              View bookings
            </span>
          </div>

          <div
            className="stat-card modern-stat"
            onClick={() => setCurrentPage("notices")}
          >
            <div className="stat-top">
              <div className="stat-icon notice-icon">
                📢
              </div>

              <span className="stat-arrow">↗</span>
            </div>

            <p>New Notices</p>

            <h2>03</h2>

            <span className="stat-link">
              Check updates
            </span>
          </div>

        </section>

        {/* LOWER CONTENT */}
        <section className="dashboard-grid">

          {/* RECENT ACTIVITY */}
          <div className="activity-panel modern-panel">

            <div className="section-title">

              <div>
                <span className="section-label">
                  ACTIVITY
                </span>

                <h2>Recent Activities</h2>

                <p>Your latest society updates</p>
              </div>

              <button
                onClick={() => setCurrentPage("complaints")}
              >
                View All →
              </button>

            </div>

            <div className="activity-list">

              <div className="activity modern-activity">

                <div className="activity-icon activity-blue">
                  📝
                </div>

                <div className="activity-content">
                  <h4>Complaint Updated</h4>

                  <p>
                    Your water supply complaint is being reviewed.
                  </p>
                </div>

                <small>Today</small>

              </div>

              <div className="activity modern-activity">

                <div className="activity-icon activity-green">
                  💳
                </div>

                <div className="activity-content">
                  <h4>Payment Reminder</h4>

                  <p>
                    Maintenance payment is due this month.
                  </p>
                </div>

                <small>Yesterday</small>

              </div>

              <div className="activity modern-activity">

                <div className="activity-icon activity-purple">
                  📅
                </div>

                <div className="activity-content">
                  <h4>Booking Confirmed</h4>

                  <p>
                    Community Hall booking confirmed.
                  </p>
                </div>

                <small>2 days ago</small>

              </div>

            </div>

          </div>

          {/* LATEST NOTICES */}
          <div className="notice-panel modern-panel">

            <div className="section-title">

              <div>
                <span className="section-label">
                  COMMUNITY
                </span>

                <h2>Latest Notices</h2>

                <p>Important announcements</p>
              </div>

              <button
                onClick={() => setCurrentPage("notices")}
              >
                View All →
              </button>

            </div>

            <div className="notice-list">

              <div className="notice-card modern-notice">

                <div className="notice-icon notice-orange">
                  🔧
                </div>

                <div>
                  <h4>Water Maintenance</h4>

                  <p>
                    Water supply maintenance on Sunday from 10 AM.
                  </p>
                </div>

                <span>›</span>

              </div>

              <div className="notice-card modern-notice">

                <div className="notice-icon notice-blue">
                  🏢
                </div>

                <div>
                  <h4>Monthly Meeting</h4>

                  <p>
                    Society meeting scheduled for this weekend.
                  </p>
                </div>

                <span>›</span>

              </div>

              <div className="notice-card modern-notice">

                <div className="notice-icon notice-pink">
                  🎉
                </div>

                <div>
                  <h4>Community Event</h4>

                  <p>
                    Join us for the upcoming community celebration.
                  </p>
                </div>

                <span>›</span>

              </div>

            </div>

          </div>

        </section>

        {/* QUICK ACTIONS */}
        <section className="quick-actions-section">

          <div className="quick-heading">

            <div>
              <span className="section-label">
                QUICK ACCESS
              </span>

              <h2>What would you like to do?</h2>
            </div>

          </div>

          <div className="quick-actions">

            <button
              onClick={() => setCurrentPage("complaints")}
              className="quick-action"
            >
              <span>📝</span>

              <div>
                <strong>Raise Complaint</strong>
                <small>Report an issue</small>
              </div>

              <b>→</b>
            </button>

            <button
              onClick={() => setCurrentPage("payments")}
              className="quick-action"
            >
              <span>💳</span>

              <div>  
                <strong>Pay Maintenance</strong>
                <small>Manage your dues</small>
              </div>

              <b>→</b>
            </button>

            <button
              onClick={() => setCurrentPage("amenities")}
              className="quick-action"
            >
              <span>📅</span>

              <div>
                <strong>Book Amenity</strong>
                <small>Reserve a facility</small>
              </div>

              <b>→</b>
            </button>

            <button
              onClick={() => setCurrentPage("visitors")}
              className="quick-action"
            >
              <span>🚪</span>

              <div>
                <strong>Manage Visitors</strong>
                <small>Pre-register visitors</small>
              </div>

              <b>→</b>
            </button>

          </div>

        </section>

      </main>

    </div>
  );
}

export default ResidentDashboard;