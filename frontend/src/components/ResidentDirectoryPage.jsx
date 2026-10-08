import { useEffect, useState } from "react";
import "./Dashboard.css";

function ResidentDirectoryPage({ onBack }) {
  const [residents, setResidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchResidents = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch("/api/security/residents", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to load residents");
        }

        const data = await response.json();

        setResidents(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error loading residents:", error);
        setError("Unable to load resident directory ❌");
      } finally {
        setLoading(false);
      }
    };

    fetchResidents();
  }, []);

  return (
    <div className="security-directory-page">

      <header className="security-directory-header">

        <div>

          <button
            className="security-back-btn"
            onClick={onBack}
          >
            ← Back to Security Dashboard
          </button>

          <div className="security-page-tag">
            🏢 SOCIETY DIRECTORY
          </div>

          <h1>
            Resident <span>Directory</span>
          </h1>

          <p>
            View registered residents for security verification.
          </p>

        </div>

        <div className="security-page-icon">
          🏢
        </div>

      </header>


      <div className="security-directory-summary">

        <div className="security-directory-stat">

          <span>👥</span>

          <div>
            <small>Total Residents</small>
            <strong>{residents.length}</strong>
          </div>

        </div>


        <div className="security-directory-stat">

          <span>🏠</span>

          <div>
            <small>Registered Residents</small>
            <strong>{residents.length}</strong>
          </div>

        </div>

      </div>


      <div className="security-directory-card">

        <div className="security-directory-title">

          <div>
            <h2>Residents</h2>

            <p>
              Registered residents in the society
            </p>
          </div>

          <span>
            {residents.length}
          </span>

        </div>


        {loading && (
          <div className="security-directory-empty">

            <div>⏳</div>

            <h3>
              Loading residents...
            </h3>

          </div>
        )}


        {!loading && error && (
          <div className="security-directory-empty">

            <div>⚠️</div>

            <h3>
              {error}
            </h3>

          </div>
        )}


        {!loading && !error && residents.length === 0 && (
          <div className="security-directory-empty">

            <div>👥</div>

            <h3>
              No Residents Found
            </h3>

            <p>
              There are currently no registered residents.
            </p>

          </div>
        )}


        {!loading && !error && residents.length > 0 && (
          <div className="security-resident-list">

            {residents.map((resident) => (

              <div
                className="security-resident-card"
                key={resident.userId}
              >

                <div className="security-resident-avatar">
                  {(resident.name || "R")
                    .charAt(0)
                    .toUpperCase()}
                </div>


                <div className="security-resident-info">

                  <h3>
                    {resident.name || "Resident"}
                  </h3>

                  <p>
                    📧 {resident.email}
                  </p>

                  <p>
                    👤 {resident.role}
                  </p>

                </div>


                <div className="security-resident-status">

                  <span>
                    {resident.status || "ACTIVE"}
                  </span>

                </div>

              </div>

            ))}

          </div>
        )}

      </div>

    </div>
  );
}

export default ResidentDirectoryPage;