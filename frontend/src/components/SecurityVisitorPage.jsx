import { useState } from "react";
import "./Dashboard.css";

function SecurityVisitorPage({ onBack }) {
  const [qrPass, setQrPass] = useState("");
  const [visitor, setVisitor] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");

    return {
      Authorization: `Bearer ${token}`,
    };
  };

  const searchVisitor = async () => {
    setMessage("");
    setError("");
    setVisitor(null);

    if (!qrPass.trim()) {
      setError("Please enter the QR pass");
      return;
    }

    try {
      const response = await fetch(
        `/api/visitors/qr/${qrPass.trim()}`,
        {
          headers: getAuthHeaders(),
        }
      );

      if (!response.ok) {
        throw new Error("Visitor not found");
      }

      const data = await response.json();
      setVisitor(data);
    } catch (error) {
      console.error(error);
      setError("Visitor not found ❌");
    }
  };

  const verifyVisitor = async () => {
    if (!visitor) return;

    setMessage("");
    setError("");

    try {
      const response = await fetch(
        `/api/visitors/${visitor.id}/verify`,
        {
          method: "PUT",
          headers: getAuthHeaders(),
        }
      );

      if (!response.ok) {
        throw new Error("Verification failed");
      }

      const data = await response.json();

      setVisitor(data);
      setMessage("Visitor verified successfully! ✅");
    } catch (error) {
      console.error(error);
      setError("Unable to verify visitor ❌");
    }
  };

  const recordExit = async () => {
    if (!visitor) return;

    setMessage("");
    setError("");

    try {
      const response = await fetch(
        `/api/visitors/${visitor.id}/exit`,
        {
          method: "PUT",
          headers: getAuthHeaders(),
        }
      );

      if (!response.ok) {
        throw new Error("Exit recording failed");
      }

      const data = await response.json();

      setVisitor(data);
      setMessage("Visitor exit recorded successfully! ✅");
    } catch (error) {
      console.error(error);
      setError("Unable to record exit ❌");
    }
  };

  return (
    <div className="dashboard">
      <main className="dashboard-main">

        <header className="dashboard-header">

          <div>
            <p className="welcome-text">
              SECURITY MANAGEMENT 🛡️
            </p>

            <h1>Visitor Verification</h1>

            <p>
              Verify visitor QR passes and manage entry and exit.
            </p>
          </div>

          <button
            className="logout-btn"
            onClick={onBack}
          >
            ← Back
          </button>

        </header>

        <section className="dashboard-grid">

          <div className="activity-panel">

            <div className="section-title">
              <div>
                <h2>Scan / Enter QR Pass</h2>

                <p>
                  Enter the visitor QR pass to verify the visitor.
                </p>
              </div>
            </div>

            <input
              type="text"
              placeholder="Enter QR Pass"
              value={qrPass}
              onChange={(e) => setQrPass(e.target.value)}
            />

            <button
              onClick={searchVisitor}
              style={{ marginTop: "15px" }}
            >
              🔍 Search Visitor
            </button>

            {message && (
              <p
                style={{
                  color: "green",
                  marginTop: "15px",
                }}
              >
                {message}
              </p>
            )}

            {error && (
              <p
                style={{
                  color: "red",
                  marginTop: "15px",
                }}
              >
                {error}
              </p>
            )}

          </div>

          <div className="notice-panel">

            <div className="section-title">

              <div>
                <h2>Visitor Details</h2>

                <p>
                  Visitor information and verification status
                </p>
              </div>

            </div>

            {!visitor ? (
              <p>
                Search for a visitor using the QR pass.
              </p>
            ) : (
              <div className="notice-card">

                <span>👤</span>

                <div>

                  <h4>
                    {visitor.visitorName}
                  </h4>

                  <p>
                    📧 Resident: {visitor.residentEmail}
                  </p>

                  <p>
                    📞 Phone: {visitor.phone}
                  </p>

                  <p>
                    🎯 Purpose: {visitor.purpose}
                  </p>

                  <p>
                    🚗 Vehicle:{" "}
                    {visitor.vehicleNumber || "No vehicle"}
                  </p>

                  <p>
                    🎫 QR Pass: {visitor.qrPass}
                  </p>

                  <p>
                    Status:{" "}
                    <strong>
                      {visitor.verificationStatus}
                    </strong>
                  </p>

                  <p>
                    Entry:{" "}
                    {visitor.entryTime
                      ? new Date(
                          visitor.entryTime
                        ).toLocaleString()
                      : "Not entered"}
                  </p>

                  <p>
                    Exit:{" "}
                    {visitor.exitTime
                      ? new Date(
                          visitor.exitTime
                        ).toLocaleString()
                      : "Not exited"}
                  </p>

                  {visitor.verificationStatus !== "VERIFIED" && (
                    <button
                      onClick={verifyVisitor}
                      style={{ marginTop: "10px" }}
                    >
                      ✅ Verify Visitor
                    </button>
                  )}

                  {visitor.verificationStatus === "VERIFIED" &&
                    !visitor.exitTime && (
                      <button
                        onClick={recordExit}
                        style={{ marginTop: "10px" }}
                      >
                        🚪 Record Exit
                      </button>
                    )}

                </div>

              </div>
            )}

          </div>

        </section>

      </main>
    </div>
  );
}

export default SecurityVisitorPage;