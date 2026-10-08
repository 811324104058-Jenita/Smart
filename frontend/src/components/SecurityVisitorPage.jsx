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
    <div className="security-visitor-page">

      <header className="security-visitor-header">

        <div>
          <button
            className="security-back-btn"
            onClick={onBack}
          >
            ← Back to Security Dashboard
          </button>

          <div className="security-page-tag">
            🛡️ SECURITY MANAGEMENT
          </div>

          <h1>
            Visitor <span>Verification</span>
          </h1>

          <p>
            Verify visitor QR passes and manage entry and exit.
          </p>
        </div>

        <div className="security-page-icon">
          🎫
        </div>

      </header>

      <div className="security-verification-grid">

        <div className="security-search-card">

          <div className="security-card-heading">

            <div className="security-card-icon">
              🔍
            </div>

            <div>
              <h2>Verify Visitor</h2>

              <p>
                Enter the visitor QR pass to check their details.
              </p>
            </div>

          </div>

          <div className="security-input-group">

            <label>Visitor QR Pass</label>

            <input
              type="text"
              placeholder="Enter QR Pass"
              value={qrPass}
              onChange={(e) => setQrPass(e.target.value)}
            />

          </div>

          <button
            className="security-search-btn"
            onClick={searchVisitor}
          >
            🔍 Search Visitor
          </button>

          {message && (
            <div className="security-success-message">
              {message}
            </div>
          )}

          {error && (
            <div className="security-error-message">
              {error}
            </div>
          )}

          <div className="security-info-box">
            <span>💡</span>

            <div>
              <strong>Security Check</strong>

              <p>
                Search the QR pass provided by the resident
                before allowing visitor entry.
              </p>
            </div>
          </div>

        </div>

        <div className="security-details-card">

          <div className="security-card-heading">

            <div className="security-card-icon">
              👤
            </div>

            <div>
              <h2>Visitor Details</h2>

              <p>
                Visitor information and verification status
              </p>
            </div>

          </div>

          {!visitor ? (

            <div className="security-empty-state">

              <div className="security-empty-icon">
                🎫
              </div>

              <h3>No Visitor Selected</h3>

              <p>
                Search using a QR pass to view visitor details.
              </p>

            </div>

          ) : (

            <div className="security-visitor-details">

              <div className="security-visitor-profile">

                <div className="security-large-avatar">
                  {visitor.visitorName
                    ?.charAt(0)
                    .toUpperCase()}
                </div>

                <div>
                  <h3>{visitor.visitorName}</h3>

                  <span
                    className={
                      visitor.verificationStatus === "VERIFIED"
                        ? "security-status verified"
                        : "security-status pending"
                    }
                  >
                    {visitor.verificationStatus}
                  </span>
                </div>

              </div>

              <div className="security-details-grid">

                <div className="security-detail-item">
                  <small>Resident</small>
                  <strong>
                    📧 {visitor.residentEmail}
                  </strong>
                </div>

                <div className="security-detail-item">
                  <small>Phone</small>
                  <strong>
                    📞 {visitor.phone}
                  </strong>
                </div>

                <div className="security-detail-item">
                  <small>Purpose</small>
                  <strong>
                    🎯 {visitor.purpose}
                  </strong>
                </div>

                <div className="security-detail-item">
                  <small>Vehicle</small>
                  <strong>
                    🚗{" "}
                    {visitor.vehicleNumber ||
                      "No vehicle"}
                  </strong>
                </div>

                <div className="security-detail-item">
                  <small>Entry</small>
                  <strong>
                    {visitor.entryTime
                      ? new Date(
                          visitor.entryTime
                        ).toLocaleString()
                      : "Not entered"}
                  </strong>
                </div>

                <div className="security-detail-item">
                  <small>Exit</small>
                  <strong>
                    {visitor.exitTime
                      ? new Date(
                          visitor.exitTime
                        ).toLocaleString()
                      : "Not exited"}
                  </strong>
                </div>

              </div>

              <div className="security-qr-box">

                <small>QR PASS</small>

                <strong>
                  {visitor.qrPass}
                </strong>

              </div>

              <div className="security-action-buttons">

                {visitor.verificationStatus !== "VERIFIED" && (
                  <button
                    className="security-verify-btn"
                    onClick={verifyVisitor}
                  >
                    ✅ Verify Visitor
                  </button>
                )}

                {visitor.verificationStatus === "VERIFIED" &&
                  !visitor.exitTime && (
                    <button
                      className="security-exit-btn"
                      onClick={recordExit}
                    >
                      🚪 Record Visitor Exit
                    </button>
                  )}

              </div>

            </div>

          )}

        </div>

      </div>

    </div>
  );
}

export default SecurityVisitorPage;