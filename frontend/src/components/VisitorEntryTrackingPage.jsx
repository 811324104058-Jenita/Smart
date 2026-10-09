import { useEffect, useState } from "react";
import "./Dashboard.css";

function VisitorEntryTrackingPage({ onBack }) {
  const [entries, setEntries] = useState([]);
  const [visitorName, setVisitorName] = useState("");
  const [residentEmail, setResidentEmail] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [purpose, setPurpose] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  const fetchEntries = async () => {
    try {
      const response = await fetch("/api/security/visitor-entries", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to load visitor entries");
      }

      const data = await response.json();
      setEntries(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setError("Unable to load visitor entries ❌");
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  const recordEntry = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (!visitorName || !residentEmail || !vehicleNumber || !purpose) {
      setError("Please fill all fields ❌");
      return;
    }

    try {
      const response = await fetch("/api/security/visitor-entries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          visitorName,
          residentEmail,
          vehicleNumber,
          purpose,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to record entry");
      }

      setMessage("Visitor entry recorded successfully! ✅");

      setVisitorName("");
      setResidentEmail("");
      setVehicleNumber("");
      setPurpose("");

      fetchEntries();
    } catch (err) {
      console.error(err);
      setError("Unable to record visitor entry ❌");
    }
  };

  const recordExit = async (id) => {
    setMessage("");
    setError("");

    try {
      const response = await fetch(
        `/api/security/visitor-entries/${id}/exit`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to record exit");
      }

      setMessage("Visitor exit recorded successfully! ✅");
      fetchEntries();
    } catch (err) {
      console.error(err);
      setError("Unable to record visitor exit ❌");
    }
  };

  return (
    <div className="security-visitor-page">

      <div className="security-visitor-header">
        <div>
          <div className="security-page-tag">
            SECURITY • GATE MANAGEMENT
          </div>

          <h1>Visitor Entry & Exit 🚪</h1>

          <p>
            Track visitor entry and exit records at the society gate.
          </p>
        </div>

        <button
          className="security-back-btn"
          onClick={onBack}
        >
          ← Back
        </button>
      </div>

      {message && (
        <div className="success-message">
          {message}
        </div>
      )}

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <div className="security-verification-grid">

        <div className="security-search-card">
          <h2>🚶 Record Visitor Entry</h2>

          <form onSubmit={recordEntry}>

            <label>Visitor Name</label>

            <input
              type="text"
              value={visitorName}
              onChange={(e) => setVisitorName(e.target.value)}
              placeholder="Enter visitor name"
            />

            <label>Resident Email</label>

            <input
              type="email"
              value={residentEmail}
              onChange={(e) => setResidentEmail(e.target.value)}
              placeholder="Resident's email"
            />

            <label>Vehicle Number</label>

            <input
              type="text"
              value={vehicleNumber}
              onChange={(e) => setVehicleNumber(e.target.value)}
              placeholder="Example: TN 38 AB 1234"
            />

            <label>Purpose</label>

            <input
              type="text"
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              placeholder="Example: Delivery / Visit"
            />

            <button type="submit">
              🚪 Record Entry
            </button>

          </form>
        </div>

        <div className="security-details-card">

          <h2>Visitor Records</h2>

          {entries.length === 0 ? (
            <p>No visitor entries found.</p>
          ) : (
            entries.map((entry) => (
              <div
                className="security-visitor-result"
                key={entry.id}
              >

                <h3>👤 {entry.visitorName}</h3>

                <p>
                  <strong>Resident:</strong>{" "}
                  {entry.residentEmail}
                </p>

                <p>
                  <strong>Vehicle:</strong>{" "}
                  {entry.vehicleNumber}
                </p>

                <p>
                  <strong>Purpose:</strong>{" "}
                  {entry.purpose}
                </p>

                <p>
                  <strong>Entry:</strong>{" "}
                  {entry.entryTime
                    ? new Date(entry.entryTime).toLocaleString()
                    : "-"}
                </p>

                <p>
                  <strong>Exit:</strong>{" "}
                  {entry.exitTime
                    ? new Date(entry.exitTime).toLocaleString()
                    : "Still Inside"}
                </p>

                <p>
                  <strong>Status:</strong>{" "}
                  {entry.status}
                </p>

                {entry.status === "INSIDE" && (
                  <button
                    onClick={() => recordExit(entry.id)}
                  >
                    🚪 Record Exit
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

export default VisitorEntryTrackingPage;