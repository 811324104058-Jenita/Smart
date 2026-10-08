import { useEffect, useState } from "react";
import "./Dashboard.css";

function NoticePage({ onBack }) {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch("/api/notices", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to load notices");
        }

        const data = await response.json();

        setNotices(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error loading notices:", error);
        setNotices([]);
      } finally {
        setLoading(false);
      }
    };

    fetchNotices();
  }, []);

  return (
    <div className="notice-page">

      <div className="notice-topbar">

        <div>
          <button
            className="notice-back-btn"
            onClick={onBack}
          >
            ← Back to Dashboard
          </button>

          <h1>Notices</h1>

          <p>
            Stay updated with the latest society announcements
          </p>
        </div>

        <div className="notice-page-icon">
          📢
        </div>

      </div>


      <div className="notice-summary">

        <div className="notice-summary-card">

          <div className="notice-summary-icon">
            📋
          </div>

          <div>
            <span>Total Notices</span>
            <strong>{notices.length}</strong>
          </div>

        </div>

        <div className="notice-summary-card">

          <div className="notice-summary-icon">
            🔔
          </div>

          <div>
            <span>Latest Updates</span>
            <strong>
              {notices.length > 0 ? "Available" : "None"}
            </strong>
          </div>

        </div>

      </div>


      <div className="notice-main-card">

        <div className="notice-section-heading">

          <div>
            <h2>Society Announcements</h2>

            <p>
              Important updates and information from your society
            </p>
          </div>

          <div className="notice-count">
            {notices.length}
          </div>

        </div>


        {loading ? (

          <div className="notice-empty">

            <div className="notice-empty-icon">
              ⏳
            </div>

            <h3>Loading notices...</h3>

          </div>

        ) : notices.length === 0 ? (

          <div className="notice-empty">

            <div className="notice-empty-icon">
              📭
            </div>

            <h3>No Notices Available</h3>

            <p>
              There are currently no announcements from the society.
            </p>

          </div>

        ) : (

          <div className="notice-list">

            {notices.map((notice) => (

              <div
                className="notice-modern-card"
                key={notice.noticeId}
              >

                <div className="notice-icon-box">
                  📢
                </div>

                <div className="notice-content">

                  <div className="notice-title-row">

                    <h3>
                      {notice.title}
                    </h3>

                    <span className="notice-priority">
                      {notice.priority}
                    </span>

                  </div>

                  <p className="notice-description">
                    {notice.content}
                  </p>

                  <div className="notice-meta">

                    <span>
                      📂 {notice.noticeType}
                    </span>

                    <span>
                      📅 {notice.publishDate}
                    </span>

                  </div>

                </div>

                <div className="notice-arrow">
                  →
                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}

export default NoticePage;