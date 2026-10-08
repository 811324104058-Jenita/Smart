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

  const residentName =
    localStorage.getItem("name") || "Resident";

  return (
    <div className="visitor-dashboard">

      {/* SIDEBAR */}

      <aside className="visitor-sidebar">

        <div className="visitor-logo">

          <div className="visitor-logo-icon">
            🏠
          </div>

          <div>
            <h2>Smart Society</h2>
            <span>Resident Portal</span>
          </div>

        </div>

        <div className="visitor-menu">

          <div
            className="visitor-menu-item"
            onClick={onBack}
          >
            <span>⌂</span>
            <span>Dashboard</span>
          </div>

          <div className="visitor-menu-item">
            <span>♙</span>
            <span>My Profile</span>
          </div>

          <div className="visitor-menu-item">
            <span>▣</span>
            <span>My Complaints</span>
          </div>

          <div className="visitor-menu-item">
            <span>▤</span>
            <span>Payments</span>
          </div>

          <div className="visitor-menu-item">
            <span>▦</span>
            <span>Amenity Booking</span>
          </div>

          <div className="visitor-menu-item">
            <span>♢</span>
            <span>Notices</span>
          </div>

          <div className="visitor-menu-item visitor-active">
            <span>♙</span>
            <span>Visitors</span>
          </div>

        </div>

        <div className="visitor-sidebar-bottom">

          <div className="visitor-city-icon">
            🏙️
          </div>

          <div>Better Community</div>
          <div>Together</div>

        </div>

      </aside>


      {/* MAIN */}

      <main className="visitor-main">

        {/* TOP HEADER */}

        <header className="visitor-top-header">

          <div></div>

          <div className="visitor-user-area">

            <span className="visitor-bell">
              ♧
            </span>

            <div className="visitor-user-avatar">
              {residentName.charAt(0).toUpperCase()}
            </div>

            <div className="visitor-user-details">

              <strong>
                {residentName}
              </strong>

              <span>
                {email}
              </span>

            </div>

            <button
              className="visitor-back-icon"
              onClick={onBack}
            >
              ⇥
            </button>

          </div>

        </header>


        {/* PAGE TITLE */}

        <div className="visitor-page-heading">

          <div>

            <h1>Visitors</h1>

            <p>
              Register and manage your visitors
            </p>

          </div>

          <div className="visitor-total-badge">
            {visitors.length} Visitors
          </div>

        </div>


        {/* CONTENT */}

        <section className="visitor-content-grid">


          {/* REGISTER CARD */}

          <div className="visitor-register-card">

            <div className="visitor-section-heading">

              <div className="visitor-heading-icon">
                👤
              </div>

              <div>

                <h2>Register Visitor</h2>

                <p>
                  Pre-register your visitor before arrival.
                </p>

              </div>

            </div>


            <form
              className="visitor-form"
              onSubmit={registerVisitor}
            >

              <div className="visitor-input-group">

                <label>
                  Visitor Name
                </label>

                <input
                  type="text"
                  placeholder="Enter visitor name"
                  value={visitorName}
                  onChange={(e) =>
                    setVisitorName(e.target.value)
                  }
                  required
                />

              </div>


              <div className="visitor-input-group">

                <label>
                  Phone Number
                </label>

                <input
                  type="text"
                  placeholder="Enter phone number"
                  value={phone}
                  onChange={(e) =>
                    setPhone(e.target.value)
                  }
                  required
                />

              </div>


              <div className="visitor-input-group">

                <label>
                  Purpose of Visit
                </label>

                <input
                  type="text"
                  placeholder="Example: Family visit"
                  value={purpose}
                  onChange={(e) =>
                    setPurpose(e.target.value)
                  }
                  required
                />

              </div>


              <div className="visitor-input-group">

                <label>
                  Vehicle Number
                </label>

                <input
                  type="text"
                  placeholder="Optional"
                  value={vehicleNumber}
                  onChange={(e) =>
                    setVehicleNumber(e.target.value)
                  }
                />

              </div>


              <button
                type="submit"
                className="visitor-register-btn"
              >
                Register Visitor
                <span>→</span>
              </button>

            </form>


            {message && (
              <div className="visitor-success">
                {message}
              </div>
            )}


            {error && (
              <div className="visitor-error">
                {error}
              </div>
            )}

          </div>


          {/* HISTORY CARD */}

          <div className="visitor-history-card">

            <div className="visitor-history-heading">

              <div>

                <h2>Visitor History</h2>

                <p>
                  Your registered visitors
                </p>

              </div>

              <span className="visitor-history-count">
                {visitors.length}
              </span>

            </div>


            {visitors.length === 0 ? (

              <div className="visitor-empty">

                <div className="visitor-empty-icon">
                  👥
                </div>

                <h3>
                  No Visitors Yet
                </h3>

                <p>
                  Your registered visitors will appear here.
                </p>

              </div>

            ) : (

              <div className="visitor-list">

                {visitors.map((visitor) => (

                  <div
                    className="visitor-history-item"
                    key={visitor.id}
                  >

                    <div className="visitor-item-top">

                      <div className="visitor-item-person">

                        <div className="visitor-person-icon">
                          👤
                        </div>

                        <div>

                          <h3>
                            {visitor.visitorName}
                          </h3>

                          <span>
                            {visitor.purpose}
                          </span>

                        </div>

                      </div>

                      <span className="visitor-status">
                        {visitor.verificationStatus}
                      </span>

                    </div>


                    <div className="visitor-details-grid">

                      <div>
                        <small>Phone</small>
                        <strong>
                          📞 {visitor.phone}
                        </strong>
                      </div>

                      <div>
                        <small>Vehicle</small>
                        <strong>
                          🚗{" "}
                          {visitor.vehicleNumber ||
                            "No vehicle"}
                        </strong>
                      </div>

                      <div>
                        <small>Entry</small>
                        <strong>
                          {visitor.entryTime
                            ? new Date(
                                visitor.entryTime
                              ).toLocaleString()
                            : "Not entered"}
                        </strong>
                      </div>

                      <div>
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


                    <div className="visitor-qr-section">

                      <div>

                        <h4>
                          Visitor QR Pass
                        </h4>

                        <p>
                          Show this QR code at the security gate.
                        </p>

                      </div>

                      <div className="visitor-qr">

                        <QRCodeCanvas
                          value={visitor.qrPass}
                          size={120}
                        />

                      </div>

                    </div>

                  </div>

                ))}

              </div>

            )}

          </div>

        </section>

      </main>

    </div>
  );
}

export default VisitorPage;