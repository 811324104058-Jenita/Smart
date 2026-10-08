import { useState } from "react";
import "./Dashboard.css";

function ProfilePage({ email, onBack }) {
  const [name, setName] = useState(
    localStorage.getItem("name") || "Resident"
  );

  const [phone, setPhone] = useState(
    localStorage.getItem("phone") || ""
  );

  const role = localStorage.getItem("role") || "RESIDENT";

  const handleSave = () => {
    localStorage.setItem("name", name);
    localStorage.setItem("phone", phone);
    alert("Profile updated successfully! ✅");
  };

  return (
    <div className="resident-page">
      <div className="page-topbar">
        <div>
          <button className="modern-back-btn" onClick={onBack}>
            ← Back to Dashboard
          </button>

          <h1>👤 My Profile</h1>
          <p>View and manage your personal and apartment details</p>
        </div>

        <div className="profile-avatar">
          {name.charAt(0).toUpperCase()}
        </div>
      </div>

      <div className="profile-main-card">
        <div className="profile-cover"></div>

        <div className="profile-header">
          <div className="large-avatar">
            {name.charAt(0).toUpperCase()}
          </div>

          <div className="profile-heading">
            <h2>{name}</h2>
            <p>{email}</p>
            <span className="profile-role">🏠 Resident</span>
          </div>
        </div>

        <div className="profile-section">
          <div className="section-title">
            <span>👤</span>
            <div>
              <h3>Personal Information</h3>
              <p>Your basic account information</p>
            </div>
          </div>

          <div className="profile-form-grid">
            <div className="profile-field">
              <label>Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
              />
            </div>

            <div className="profile-field">
              <label>Email Address</label>
              <input type="email" value={email} disabled />
            </div>

            <div className="profile-field">
              <label>Phone Number</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter phone number"
              />
            </div>

            <div className="profile-field">
              <label>Role</label>
              <input
                type="text"
                value={role === "RESIDENT" ? "Resident" : role}
                disabled
              />
            </div>
          </div>
        </div>

        <div className="profile-section">
          <div className="section-title">
            <span>🏢</span>
            <div>
              <h3>Apartment Details</h3>
              <p>Your society residence information</p>
            </div>
          </div>

          <div className="apartment-grid">
            <div className="apartment-card">
              <div className="apartment-icon">🏠</div>
              <div>
                <small>Apartment</small>
                <strong>Not Assigned</strong>
              </div>
            </div>

            <div className="apartment-card">
              <div className="apartment-icon">🏢</div>
              <div>
                <small>Block / Tower</small>
                <strong>Not Assigned</strong>
              </div>
            </div>

            <div className="apartment-card">
              <div className="apartment-icon">🔢</div>
              <div>
                <small>Floor</small>
                <strong>Not Assigned</strong>
              </div>
            </div>

            <div className="apartment-card">
              <div className="apartment-icon">👤</div>
              <div>
                <small>Resident Type</small>
                <strong>Resident</strong>
              </div>
            </div>
          </div>
        </div>

        <div className="profile-status-card">
          <div>
            <span className="status-icon">✓</span>
            <div>
              <h3>Account Status</h3>
              <p>Your account is active and verified.</p>
            </div>
          </div>

          <span className="active-badge">ACTIVE</span>
        </div>

        <div className="profile-actions">
          <button className="save-profile-btn" onClick={handleSave}>
            ✓ Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
