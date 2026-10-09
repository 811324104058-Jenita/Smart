import { useEffect, useState } from "react";
import "./Dashboard.css";
import SecurityVisitorPage from "./SecurityVisitorPage";
import ResidentDirectoryPage from "./ResidentDirectoryPage";
import EmergencyAlertPage from "./EmergencyAlertPage";
import VisitorEntryTrackingPage from "./VisitorEntryTrackingPage";

function SecurityDashboard({ email, onLogout }) {
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [entries, setEntries] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [statsLoading, setStatsLoading] = useState(true);

  const securityEmail = email || localStorage.getItem("email");

  useEffect(() => {
    const fetchDashboardData = async () => {
      setStatsLoading(true);

      try {
        const token = localStorage.getItem("token");
        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const [entriesResponse, alertsResponse] = await Promise.all([
          fetch("/api/security/visitor-entries", { headers }),
          fetch("/api/security/alerts", { headers }),
        ]);

        if (!entriesResponse.ok || !alertsResponse.ok) {
          throw new Error("Unable to load dashboard statistics");
        }

        const entriesData = await entriesResponse.json();
        console.log("Visitor entries from API:", entriesData);
        const alertsData = await alertsResponse.json();

        setEntries(Array.isArray(entriesData) ? entriesData : []);
        setAlerts(Array.isArray(alertsData) ? alertsData : []);
      } catch (error) {
        console.error("Error loading security dashboard:", error);
      } finally {
        setStatsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (currentPage === "visitors") {
    return (
      <SecurityVisitorPage
        onBack={() => setCurrentPage("dashboard")}
      />
    );
  }

  if (currentPage === "residents") {
    return (
      <ResidentDirectoryPage
        onBack={() => setCurrentPage("dashboard")}
      />
    );
  }

  if (currentPage === "alerts") {
    return (
      <EmergencyAlertPage
        onBack={() => setCurrentPage("dashboard")}
      />
    );
  }

  if (currentPage === "visitor-entries") {
    return (
      <VisitorEntryTrackingPage
        onBack={() => setCurrentPage("dashboard")}
      />
    );
  }

  // Use local calendar dates for today's records.
  const today = new Date().toLocaleDateString();

  const isToday = (dateValue) => {
    if (!dateValue) return false;

    const date = new Date(dateValue);

    return (
      !Number.isNaN(date.getTime()) &&
      date.toLocaleDateString() === today
    );
  };

  const visitorsToday = entries.filter(
    (entry) => isToday(entry.entryTime)
  ).length;

  const currentlyInside = entries.filter(
    (entry) => entry.status === "INSIDE"
  ).length;

  const exitedToday = entries.filter(
    (entry) =>
      entry.status === "EXITED" && isToday(entry.exitTime)
  ).length;

  const activeAlerts = alerts.filter(
    (alert) => alert.status === "ACTIVE"
  ).length;

  const recentEntries = [...entries]
    .sort(
      (a, b) =>
        new Date(b.entryTime || 0) - new Date(a.entryTime || 0)
    )
    .slice(0, 3);

  return (
    <div className="security-dashboard">
      <aside className="security-sidebar">
        <div className="sidebar-logo">
          <h2>🛡️ SmartSociety</h2>
          <p>Security Portal</p>
        </div>

        <div className="menu">
          <div
            className={`menu-item ${
              currentPage === "dashboard" ? "active" : ""
            }`}
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

          <div
            className="menu-item"
            onClick={() => setCurrentPage("visitor-entries")}
          >
            🚪 Visitor Entry / Exit
          </div>

          <div
            className="menu-item"
            onClick={() => setCurrentPage("residents")}
          >
            🏢 Resident Directory
          </div>

          <div
            className="menu-item"
            onClick={() => setCurrentPage("alerts")}
          >
            🚨 Emergency Alerts
          </div>
        </div>

        <button className="logout-btn" onClick={onLogout}>
          🚪 Logout
        </button>
      </aside>

      <main className="security-main">
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
            <span>🔔</span>

            <div className="user-avatar">🛡️</div>

            <div>
              <strong>Security Guard</strong>
              <p>{securityEmail}</p>
            </div>
          </div>
        </header>

        <section className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">🚶</div>
            <div>
              <p>Visitors Today</p>
              <h2>{statsLoading ? "..." : visitorsToday}</h2>
              <span>Total entries today</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">🏠</div>
            <div>
              <p>Currently Inside</p>
              <h2>{statsLoading ? "..." : currentlyInside}</h2>
              <span>Active visitors</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">🚪</div>
            <div>
              <p>Exited Today</p>
              <h2>{statsLoading ? "..." : exitedToday}</h2>
              <span>Visitor exits today</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">🚨</div>
            <div>
              <p>Active Alerts</p>
              <h2>{statsLoading ? "..." : activeAlerts}</h2>
              <span>Requires attention</span>
            </div>
          </div>
        </section>

        <section className="dashboard-grid">
          <div className="activity-panel">
            <div className="section-title">
              <div>
                <h2>Recent Visitor Activity</h2>
                <p>Latest recorded visitor entries</p>
              </div>

              <button
                onClick={() => setCurrentPage("visitor-entries")}
              >
                View All
              </button>
            </div>

            {statsLoading ? (
              <p>Loading visitor activity...</p>
            ) : recentEntries.length === 0 ? (
              <p>No visitor activity recorded yet.</p>
            ) : (
              recentEntries.map((entry) => (
                <div className="activity" key={entry.id}>
                  <span className="activity-icon">
                    {entry.status === "EXITED" ? "🔴" : "🟢"}
                  </span>

                  <div>
                    <h4>
                      {entry.status === "EXITED"
                        ? "Visitor Exited"
                        : "Visitor Entered"}
                    </h4>

                    <p>
                      {entry.visitorName || "Visitor"} —{" "}
                      {entry.residentEmail || "Resident not specified"}
                    </p>
                  </div>

                  <small>
                    {entry.status === "EXITED" && entry.exitTime
                      ? new Date(entry.exitTime).toLocaleTimeString(
                          [],
                          { hour: "2-digit", minute: "2-digit" }
                        )
                      : entry.entryTime
                      ? new Date(entry.entryTime).toLocaleTimeString(
                          [],
                          { hour: "2-digit", minute: "2-digit" }
                        )
                      : "—"}
                  </small>
                </div>
              ))
            )}
          </div>

          <div className="notice-panel">
            <div className="section-title">
              <div>
                <h2>Quick Actions</h2>
                <p>Frequently used security actions</p>
              </div>
            </div>

            <div
              className="notice-card"
              onClick={() => setCurrentPage("visitors")}
              style={{ cursor: "pointer" }}
            >
              <span>➕</span>
              <div>
                <h4>Verify Visitor</h4>
                <p>Search and verify a visitor using the QR pass.</p>
              </div>
            </div>

            <div
              className="notice-card"
              onClick={() => setCurrentPage("visitor-entries")}
              style={{ cursor: "pointer" }}
            >
              <span>🚪</span>
              <div>
                <h4>Visitor Entry / Exit</h4>
                <p>Record visitor entry and update exit information.</p>
              </div>
            </div>

            <div
              className="notice-card"
              onClick={() => setCurrentPage("alerts")}
              style={{ cursor: "pointer" }}
            >
              <span>🚨</span>
              <div>
                <h4>Emergency Alert</h4>
                <p>Report an emergency or security issue.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default SecurityDashboard;