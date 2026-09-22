import { useEffect, useState } from "react";
import "./Dashboard.css";

function ComplaintPage({ email, onBack }) {
  const [complaints, setComplaints] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchComplaints = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const response = await fetch(
        `/api/complaints/resident/${email}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to load complaints");
      }

      const data = await response.json();

      setComplaints(Array.isArray(data) ? data : [data]);
    } catch (error) {
      console.error("Error loading complaints", error);
      setComplaints([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (email) {
      fetchComplaints();
    }
  }, [email]);

  const submitComplaint = async (e) => {
    e.preventDefault();

    setMessage("");

    try {
      const token = localStorage.getItem("token");

      const response = await fetch("/api/complaints", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          description,
          category,
          residentEmail: email,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit complaint");
      }

      setMessage("Complaint submitted successfully! 🎉");

      setTitle("");
      setDescription("");
      setCategory("");

      fetchComplaints();
    } catch (error) {
      console.error("Error submitting complaint", error);
      setMessage("Unable to submit complaint ❌");
    }
  };

  const openComplaints = complaints.filter(
    (complaint) => complaint.status === "OPEN"
  ).length;

  const progressComplaints = complaints.filter(
    (complaint) => complaint.status === "IN_PROGRESS"
  ).length;

  const resolvedComplaints = complaints.filter(
    (complaint) => complaint.status === "RESOLVED"
  ).length;

  const getStatusClass = (status) => {
    if (status === "OPEN") return "status-open";
    if (status === "IN_PROGRESS") return "status-progress";
    if (status === "RESOLVED") return "status-resolved";
    return "status-open";
  };

  return (
    <div className="complaint-page">

      <div className="complaint-topbar">
        <button className="back-btn" onClick={onBack}>
          ← Back to Dashboard
        </button>

        <div className="complaint-user">
          <div className="complaint-avatar">👤</div>

          <div>
            <strong>Resident</strong>
            <p>{email}</p>
          </div>
        </div>
      </div>

      <div className="complaint-header">
        <div>
          <div className="complaint-tag">
            🏢 SMARTSOCIETY SUPPORT
          </div>

          <h1>
            My <span>Complaints</span>
          </h1>

          <p>
            Report issues, track their progress and stay updated
            with every resolution.
          </p>
        </div>

        <div className="complaint-header-icon">
          📝
        </div>
      </div>

      <div className="complaint-stats">

        <div className="complaint-stat-card">
          <div className="complaint-stat-icon">📋</div>

          <div>
            <p>Total Complaints</p>
            <h2>{complaints.length}</h2>
          </div>
        </div>

        <div className="complaint-stat-card">
          <div className="complaint-stat-icon">🔴</div>

          <div>
            <p>Open</p>
            <h2>{openComplaints}</h2>
          </div>
        </div>

        <div className="complaint-stat-card">
          <div className="complaint-stat-icon">🟡</div>

          <div>
            <p>In Progress</p>
            <h2>{progressComplaints}</h2>
          </div>
        </div>

        <div className="complaint-stat-card">
          <div className="complaint-stat-icon">🟢</div>

          <div>
            <p>Resolved</p>
            <h2>{resolvedComplaints}</h2>
          </div>
        </div>

      </div>

      <div className="complaint-container">

        <div className="complaint-form-card">

          <div className="form-heading">
            <div className="form-icon">➕</div>

            <div>
              <h2>Raise a Complaint</h2>
              <p>Tell us what's wrong and we'll help you.</p>
            </div>
          </div>

          <form onSubmit={submitComplaint}>

            <div className="form-group">
              <label>Complaint Title</label>

              <input
                type="text"
                placeholder="Example: Water leakage in bathroom"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Category</label>

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <option value="">
                  Select complaint category
                </option>

                <option value="Plumbing">
                  🚰 Plumbing
                </option>

                <option value="Electrical">
                  ⚡ Electrical
                </option>

                <option value="Security">
                  🛡️ Security
                </option>

                <option value="Cleaning">
                  🧹 Cleaning
                </option>

                <option value="Other">
                  📌 Other
                </option>
              </select>
            </div>

            <div className="form-group">
              <label>Description</label>

              <textarea
                placeholder="Describe your issue in detail..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="submit-complaint-btn"
            >
              Submit Complaint
              <span>→</span>
            </button>

          </form>

          {message && (
            <div className="complaint-message">
              {message}
            </div>
          )}

        </div>

        <div className="complaints-list">

          <div className="complaints-list-header">
            <div>
              <h2>Your Complaints</h2>

              <p>
                Track all your submitted issues
              </p>
            </div>

            <div className="complaint-count">
              {complaints.length} Total
            </div>
          </div>

          {loading ? (
            <div className="empty-complaints">
              <div className="empty-icon">⏳</div>

              <h3>Loading complaints...</h3>
            </div>

          ) : complaints.length === 0 ? (

            <div className="empty-complaints">
              <div className="empty-icon">📭</div>

              <h3>No Complaints Yet</h3>

              <p>
                Great! You don't have any complaints at the moment.
              </p>
            </div>

          ) : (

            <div className="complaints-wrapper">

              {complaints.map((complaint) => (

                <div
                  className="complaint-item"
                  key={complaint.id}
                >

                  <div className="complaint-item-icon">
                    📝
                  </div>

                  <div className="complaint-info">

                    <div className="complaint-title-row">

                      <h3>
                        {complaint.title}
                      </h3>

                      <span
                        className={`status ${getStatusClass(
                          complaint.status
                        )}`}
                      >
                        {complaint.status}
                      </span>

                    </div>

                    <p>
                      {complaint.description}
                    </p>

                    <div className="complaint-meta">

                      <span>
                        📂 {complaint.category}
                      </span>

                      <span>
                        #ID-{complaint.id}
                      </span>

                    </div>

                  </div>

                </div>

              ))}

            </div>
          )}

        </div>

      </div>

    </div>
  );
}

export default ComplaintPage;