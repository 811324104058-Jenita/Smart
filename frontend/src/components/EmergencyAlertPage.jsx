import { useEffect, useState } from "react";
import "./Dashboard.css";

function EmergencyAlertPage({ onBack }) {
  const [alerts, setAlerts] = useState([]);
  const [type, setType] = useState("");
  const [message, setMessage] = useState("");
  const [location, setLocation] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  const fetchAlerts = async () => {
    try {
      const response = await fetch("/api/security/alerts", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to load alerts");
      }

      const data = await response.json();
      setAlerts(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setError("Unable to load emergency alerts ❌");
    }
  };

  useEffect(() => {
    fetchAlerts();
  }, []);

  const createAlert = async (e) => {
    e.preventDefault();

    setSuccess("");
    setError("");

    if (!type || !message || !location) {
      setError("Please fill all fields ❌");
      return;
    }

    try {
      const response = await fetch("/api/security/alerts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          type,
          message,
          location,
          reportedBy: localStorage.getItem("email"),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create alert");
      }

      setSuccess("Emergency alert created successfully! 🚨");

      setType("");
      setMessage("");
      setLocation("");

      fetchAlerts();
    } catch (err) {
      console.error(err);
      setError("Unable to create emergency alert ❌");
    }
  };

  const resolveAlert = async (id) => {
    try {
      const response = await fetch(
        `/api/security/alerts/${id}/resolve`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to resolve alert");
      }

      setSuccess("Emergency alert resolved successfully! ✅");

      fetchAlerts();
    } catch (err) {
      console.error(err);
      setError("Unable to resolve alert ❌");
    }
  };

  return (
    <div className="security-visitor-page">

      <div className="security-visitor-header">
        <div>
          <div className="security-page-tag">
            SECURITY • EMERGENCY
          </div>

          <h1>Emergency Alerts 🚨</h1>

          <p>
            Report and manage emergency situations inside the society.
          </p>
        </div>

        <button
          className="security-back-btn"
          onClick={onBack}
        >
          ← Back
        </button>
      </div>

      {success && (
        <div className="success-message">
          {success}
        </div>
      )}

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <div className="security-verification-grid">

        {/* CREATE ALERT */}

        <div className="security-search-card">
          <h2>🚨 Report Emergency</h2>

          <form onSubmit={createAlert}>

            <label>Emergency Type</label>

            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="">Select Type</option>
              <option value="FIRE">🔥 Fire</option>
              <option value="MEDICAL">🏥 Medical</option>
              <option value="SECURITY">🛡️ Security</option>
              <option value="ACCIDENT">🚗 Accident</option>
              <option value="OTHER">⚠️ Other</option>
            </select>

            <label>Message</label>

            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Describe the emergency..."
              rows="4"
            />

            <label>Location</label>

            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Example: Block A - Ground Floor"
            />

            <button type="submit">
              🚨 Create Alert
            </button>

          </form>
        </div>


        {/* ALERT LIST */}

        <div className="security-details-card">

          <h2>Active Alerts</h2>

          {alerts.length === 0 ? (
            <p>No emergency alerts found.</p>
          ) : (
            alerts.map((alert) => (
              <div
                className="security-visitor-result"
                key={alert.id}
              >

                <h3>
                  🚨 {alert.type}
                </h3>

                <p>
                  <strong>Message:</strong>{" "}
                  {alert.message}
                </p>

                <p>
                  <strong>Location:</strong>{" "}
                  {alert.location}
                </p>

                <p>
                  <strong>Reported By:</strong>{" "}
                  {alert.reportedBy}
                </p>

                <p>
                  <strong>Status:</strong>{" "}
                  {alert.status}
                </p>

                {alert.status === "ACTIVE" && (
                  <button
                    onClick={() => resolveAlert(alert.id)}
                  >
                    ✅ Resolve Alert
                  </button>
                )}

              </div>
            ))
          )}

        </div>

      </div>
    </div>
  );
}

export default EmergencyAlertPage;