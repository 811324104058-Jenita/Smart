import { useEffect, useState } from "react";

function NoticePage({ onBack }) {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8080/api/notices")
      .then((response) => response.json())
      .then((data) => {
        setNotices(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error loading notices:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <div>
          <h1>Notices</h1>
          <p>Society announcements and important updates</p>
        </div>

        <button className="logout-btn" onClick={onBack}>
          Back to Dashboard
        </button>
      </div>

      {loading ? (
        <p>Loading notices...</p>
      ) : notices.length === 0 ? (
        <p>No notices available.</p>
      ) : (
        <div className="dashboard-grid">
          {notices.map((notice) => (
            <div className="dashboard-card" key={notice.noticeId}>
              <div className="card-icon">📢</div>

              <h3>{notice.title}</h3>

              <p>{notice.content}</p>

              <small>
                Type: {notice.noticeType}
              </small>

              <br />

              <small>
                Priority: {notice.priority}
              </small>

              <br />

              <small>
                Published: {notice.publishDate}
              </small>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default NoticePage;