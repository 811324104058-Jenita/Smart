import { useEffect, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import "./Dashboard.css";

function VisitorPage({ email, onBack }) {
  const [visitors, setVisitors] = useState([]);

  const [visitorName, setVisitorName] = useState("");
  const [phone, setPhone] = useState("");
  const [purpose, setPurpose] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const fetchVisitors = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `/api/visitors/resident/${email}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to load visitors");
      }

      const data = await response.json();
      setVisitors(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error loading visitors", error);
      setVisitors([]);
    }
  };

  useEffect(() => {
    if (email) {
      fetchVisitors();
    }
  }, [email]);

  const registerVisitor = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    try {
      const token = localStorage.getItem("token");

      const response = await fetch("/api/visitors", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          residentEmail: email,
          visitorName: visitorName,
          phone: phone,
          purpose: purpose,
          vehicleNumber: vehicleNumber,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to register visitor");
      }

      await response.json();

      setMessage("Visitor registered successfully! ✅");

      setVisitorName("");
      setPhone("");
      setPurpose("");
      setVehicleNumber("");

      fetchVisitors();
    } catch (error) {
      console.error("Error registering visitor", error);
      setError("Unable to register visitor ❌");
    }
  };

  return (
    <div className="dashboard">

      <main className="dashboard-main">

        <header className="dashboard-header">

          <div>
            <p className="welcome-text">
              VISITOR MANAGEMENT 🚪
            </p>

            <h1>My Visitors</h1>

            <p>
              Register and track your visitors.
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
                <h2>Register Visitor</h2>

                <p>
                  Pre-register your visitor before arrival.
                </p>
              </div>
            </div>

            <form onSubmit={registerVisitor}>

              <input
                type="text"
                placeholder="Visitor Name"
                value={visitorName}
                onChange={(e) =>
                  setVisitorName(e.target.value)
                }
                required
              />

              <input
                type="text"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) =>
                  setPhone(e.target.value)
                }
                required
              />

              <input
                type="text"
                placeholder="Purpose of Visit"
                value={purpose}
                onChange={(e) =>
                  setPurpose(e.target.value)
                }
                required
              />

              <input
                type="text"
                placeholder="Vehicle Number"
                value={vehicleNumber}
                onChange={(e) =>
                  setVehicleNumber(e.target.value)
                }
              />

              <button type="submit">
                Register Visitor
              </button>

            </form>

            {message && (
              <p
                style={{
                  color: "green",
                  marginTop: "15px"
                }}
              >
                {message}
              </p>
            )}

            {error && (
              <p
                style={{
                  color: "red",
                  marginTop: "15px"
                }}
              >
                {error}
              </p>
            )}

          </div>

          <div className="notice-panel">

            <div className="section-title">

              <div>
                <h2>Visitor History</h2>

                <p>
                  Your registered visitors
                </p>
              </div>

            </div>

            {visitors.length === 0 ? (
              <p>
                No visitors registered yet.
              </p>
            ) : (

              visitors.map((visitor) => (

                <div
                  className="notice-card"
                  key={visitor.id}
                >

                  <span>👤</span>

                  <div>

                    <h4>
                      {visitor.visitorName}
                    </h4>

                    <p>
                      📞 {visitor.phone}
                    </p>

                    <p>
                      🎯 {visitor.purpose}
                    </p>

                    <p>
                      🚗{" "}
                      {visitor.vehicleNumber ||
                        "No vehicle"}
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

                    <div
                      style={{
                        marginTop: "15px",
                        textAlign: "center"
                      }}
                    >

                      <p>
                        <strong>
                          Visitor QR Pass
                        </strong>
                      </p>

                      <QRCodeCanvas
                        value={visitor.qrPass}
                        size={160}
                      />

                      <p
                        style={{
                          fontSize: "11px",
                          wordBreak: "break-all"
                        }}
                      >
                        {visitor.qrPass}
                      </p>

                    </div>

                  </div>

                </div>

              ))

            )}

          </div>

        </section>

      </main>

    </div>
  );
}

export default VisitorPage;