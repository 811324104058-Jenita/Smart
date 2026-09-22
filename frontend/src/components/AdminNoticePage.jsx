import { useEffect, useState } from "react";
import "./Dashboard.css";

function AdminNoticePage({ onBack }) {
  const [notices, setNotices] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    noticeType: "GENERAL",
    priority: "MEDIUM",
    publishDate: "",
    expiryDate: "",
    status: "PUBLISHED"
  });

  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");

    return {
      Authorization: `Bearer ${token}`
    };
  };

  const loadNotices = () => {
    fetch("/api/notices", {
      headers: getAuthHeaders()
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load notices");
        }

        return response.json();
      })
      .then((data) => {
        setNotices(Array.isArray(data) ? data : []);
      })
      .catch((error) => {
        console.error("Error loading notices:", error);
      });
  };

  useEffect(() => {
    loadNotices();
  }, []);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch("/api/notices", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeaders()
      },
      body: JSON.stringify(formData)
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to create notice");
        }

        return response.json();
      })
      .then(() => {
        setFormData({
          title: "",
          content: "",
          noticeType: "GENERAL",
          priority: "MEDIUM",
          publishDate: "",
          expiryDate: "",
          status: "PUBLISHED"
        });

        setShowForm(false);
        loadNotices();
      })
      .catch((error) => {
        console.error("Error creating notice:", error);
      });
  };

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this notice?")) {
      return;
    }

    fetch(`/api/notices/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders()
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete notice");
        }

        loadNotices();
      })
      .catch((error) => {
        console.error("Error deleting notice:", error);
      });
  };

  return (
    <div className="dashboard-page">

      <div className="dashboard-header">
        <div>
          <h1>Manage Notices</h1>
          <p>Create and manage society announcements</p>
        </div>

        <button className="logout-btn" onClick={onBack}>
          Back to Dashboard
        </button>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <button
          className="logout-btn"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "✖ Close Form" : "➕ Create Notice"}
        </button>
      </div>

      {showForm && (
        <div className="activity-panel" style={{ marginBottom: "25px" }}>
          <h2>Create New Notice</h2>

          <form onSubmit={handleSubmit}>

            <div style={{ marginBottom: "15px" }}>
              <label>Title</label>

              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                style={{
                  width: "100%",
                  padding: "10px",
                  marginTop: "5px"
                }}
              />
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label>Content</label>

              <textarea
                name="content"
                value={formData.content}
                onChange={handleChange}
                required
                rows="4"
                style={{
                  width: "100%",
                  padding: "10px",
                  marginTop: "5px"
                }}
              />
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label>Notice Type</label>

              <select
                name="noticeType"
                value={formData.noticeType}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "10px",
                  marginTop: "5px"
                }}
              >
                <option value="GENERAL">General</option>
                <option value="MAINTENANCE">Maintenance</option>
                <option value="EVENT">Event</option>
                <option value="EMERGENCY">Emergency</option>
                <option value="SECURITY">Security</option>
              </select>
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label>Priority</label>

              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "10px",
                  marginTop: "5px"
                }}
              >
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
              </select>
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label>Publish Date</label>

              <input
                type="date"
                name="publishDate"
                value={formData.publishDate}
                onChange={handleChange}
                required
                style={{
                  width: "100%",
                  padding: "10px",
                  marginTop: "5px"
                }}
              />
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label>Expiry Date</label>

              <input
                type="date"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleChange}
                required
                style={{
                  width: "100%",
                  padding: "10px",
                  marginTop: "5px"
                }}
              />
            </div>

            <button type="submit" className="logout-btn">
              Publish Notice
            </button>

          </form>
        </div>
      )}

      <div className="activity-panel">

        <div className="section-title">
          <div>
            <h2>All Notices</h2>
            <p>Manage published society announcements</p>
          </div>
        </div>

        {notices.length === 0 ? (
          <p>No notices available.</p>
        ) : (
          notices.map((notice) => (
            <div className="activity" key={notice.noticeId}>

              <span className="activity-icon">
                📢
              </span>

              <div style={{ flex: 1 }}>
                <h4>{notice.title}</h4>

                <p>{notice.content}</p>

                <small>
                  Type: {notice.noticeType} • Priority: {notice.priority}
                </small>

                <br />

                <small>
                  Published: {notice.publishDate} • Expires:{" "}
                  {notice.expiryDate}
                </small>
              </div>

              <button
                onClick={() => handleDelete(notice.noticeId)}
                style={{
                  padding: "8px 12px",
                  cursor: "pointer"
                }}
              >
                🗑️ Delete
              </button>

            </div>
          ))
        )}

      </div>

    </div>
  );
}

export default AdminNoticePage;