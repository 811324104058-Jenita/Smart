import { useState } from "react";

import ResidentDashboard from "./components/ResidentDashboard";
import SecurityDashboard from "./components/SecurityDashboard";
import AdminDashboard from "./components/AdminDashboard";

import "./App.css";

function App() {
  const [isRegister, setIsRegister] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [user, setUser] = useState(null);

  const resetForm = () => {
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setOtp("");
    setOtpSent(false);
    setError("");
    setMessage("");
    setLoading(false);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");
    setMessage("");
    setLoading(true);

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setError(data.message || "Invalid email or password");
        setLoading(false);
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("email", data.email);
      localStorage.setItem("name", data.name);
      localStorage.setItem("role", data.role);

      setUser(data);
    } catch (error) {
      console.error(error);
      setError("Unable to connect to the server.");
    }

    setLoading(false);
  };

  const handleSendOtp = async () => {
    setError("");
    setMessage("");

    if (!email.trim()) {
      setError("Please enter your email.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/otp/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      });

      const data = await response.text();

      if (!response.ok) {
        setError(data || "Failed to send OTP.");
        setLoading(false);
        return;
      }

      setOtpSent(true);

      setMessage(
        "OTP sent successfully. Please check your email."
      );
    } catch (error) {
      console.error(error);
      setError("Unable to connect to the server.");
    }

    setLoading(false);
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    setError("");
    setMessage("");

    if (!name.trim()) {
      setError("Please enter your name.");
      return;
    }

    if (!email.trim()) {
      setError("Please enter your email.");
      return;
    }

    if (!password) {
      setError("Please enter your password.");
      return;
    }

    if (!confirmPassword) {
      setError("Please confirm your password.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!otp) {
      setError("Please enter the OTP.");
      return;
    }

    if (otp.length !== 6) {
      setError("OTP must be 6 digits.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          otp,
        }),
      });

      const data = await response.text();

      if (!response.ok) {
        setError(data || "Registration failed.");
        setLoading(false);
        return;
      }

      if (data.includes("Invalid or expired OTP")) {
        setError(data);
        setLoading(false);
        return;
      }

      if (data.includes("already registered")) {
        setError(data);
        setLoading(false);
        return;
      }

      if (data.includes("Password must")) {
        setError(data);
        setLoading(false);
        return;
      }

      if (
        data.includes("Name is required") ||
        data.includes("Email is required") ||
        data.includes("Password is required") ||
        data.includes("Email OTP verification is required")
      ) {
        setError(data);
        setLoading(false);
        return;
      }

      setMessage(
        "Registration successful! You can now login."
      );

      setIsRegister(false);

      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setOtp("");
      setOtpSent(false);
    } catch (error) {
      console.error(error);
      setError("Unable to connect to the server.");
    }

    setLoading(false);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("name");
    localStorage.removeItem("role");

    setUser(null);
    resetForm();
  };

  /* =========================
     DASHBOARD ROUTING
  ========================= */

  if (user) {
    if (user.role === "ADMIN") {
      return <AdminDashboard onLogout={logout} />;
    }

    if (user.role === "SECURITY_GUARD") {
      return <SecurityDashboard onLogout={logout} />;
    }

    return (
      <ResidentDashboard
        email={user.email}
        onLogout={logout}
      />
    );
  }

  /* =========================
     CREATIVE LOGIN PAGE
  ========================= */

  return (
    <div className="app">

      {/* NAVBAR */}

      <nav className="login-navbar">

        <div className="nav-brand">
          <span className="brand-icon">🏢</span>

          <div>
            <h2>SmartSociety</h2>
            <small>Management Platform</small>
          </div>
        </div>

        <div className="nav-right">
          <span className="online-dot"></span>
          <small>Secure Community Portal</small>
        </div>

      </nav>


      {/* MAIN */}

      <div className="container">

        {/* LEFT CREATIVE SECTION */}

        <section className="left-section">

          <div className="hero-content">

            <span className="tag">
              ✦ SMART LIVING • SMART COMMUNITY
            </span>

            <h1>
              Your Society.
              <br />
              <span>Smarter.</span>
              <br />
              Simpler.
            </h1>

            <p>
              One intelligent platform to manage residents,
              complaints, payments, visitors, amenities and
              community notices — all in one place.
            </p>


            {/* FEATURES */}

            <div className="feature-list">

              <div>
                <span>✓</span>
                Easy Resident Management
              </div>

              <div>
                <span>✓</span>
                Secure Visitor Tracking
              </div>

              <div>
                <span>✓</span>
                Digital Maintenance
              </div>

              <div>
                <span>✓</span>
                Smart Community Notices
              </div>

            </div>


            {/* CREATIVE VISUAL */}

            <div className="smart-visual">

              <div className="orbit orbit-one"></div>
              <div className="orbit orbit-two"></div>

              <div className="center-building">
                🏢
              </div>

              <div className="floating-card card-one">
                👥
                <span>Residents</span>
              </div>

              <div className="floating-card card-two">
                🔐
                <span>Secure</span>
              </div>

              <div className="floating-card card-three">
                💳
                <span>Payments</span>
              </div>

              <div className="floating-card card-four">
                📢
                <span>Notices</span>
              </div>

            </div>


            {/* COMMUNITY CARD */}

            <div className="community-card">

              <div className="community-avatars">
                👩🏻 👨🏻 👩🏻 👨🏻
              </div>

              <div>
                <h4>Connected Community</h4>

                <p>
                  Everything your society needs,
                  in one smart space.
                </p>
              </div>

            </div>

          </div>

        </section>


        {/* LOGIN SECTION */}

        <section className="login-section">

          <div className="login-card">

            {/* HEADER */}

            <div className="login-header">

              <div className="welcome-icon">
                {isRegister ? "✨" : "👋"}
              </div>

              <h1>
                {isRegister
                  ? "Join SmartSociety"
                  : "Welcome Back"}
              </h1>

              <p>
                {isRegister
                  ? "Create your community account"
                  : "Login to your community dashboard"}
              </p>

            </div>


            {/* STATUS MESSAGE */}

            {error && (
              <div className="login-error">
                ⚠️ {error}
              </div>
            )}

            {message && (
              <div className="login-success">
                ✓ {message}
              </div>
            )}


            {/* REGISTER */}

            {isRegister ? (

              <form onSubmit={handleRegister}>

                <div className="input-group">

                  <label>Full Name</label>

                  <div className="input-box">
                    <span>👤</span>

                    <input
                      type="text"
                      placeholder="Enter your full name"
                      value={name}
                      onChange={(e) =>
                        setName(e.target.value)
                      }
                      required
                    />

                  </div>

                </div>


                <div className="input-group">

                  <label>Email Address</label>

                  <div className="input-box">
                    <span>✉️</span>

                    <input
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) =>
                        setEmail(e.target.value)
                      }
                      required
                    />

                  </div>

                </div>


                <div className="input-group">

                  <label>Password</label>

                  <div className="input-box">
                    <span>🔐</span>

                    <input
                      type="password"
                      placeholder="Create a strong password"
                      value={password}
                      onChange={(e) =>
                        setPassword(e.target.value)
                      }
                      required
                    />

                  </div>

                </div>


                <div className="input-group">

                  <label>Confirm Password</label>

                  <div className="input-box">
                    <span>🔒</span>

                    <input
                      type="password"
                      placeholder="Confirm your password"
                      value={confirmPassword}
                      onChange={(e) =>
                        setConfirmPassword(e.target.value)
                      }
                      required
                    />

                  </div>

                </div>


                <p className="password-hint">
                  🔒 8+ characters • Uppercase • Lowercase •
                  Number • Special character
                </p>


                {!otpSent ? (

                  <button
                    type="button"
                    className="login-btn"
                    onClick={handleSendOtp}
                    disabled={loading}
                  >
                    {loading
                      ? "Sending OTP..."
                      : "Send Verification OTP"}

                    <span>→</span>
                  </button>

                ) : (

                  <>

                    <div className="input-group">

                      <label>Email Verification Code</label>

                      <div className="input-box otp-box">

                        <span>🔢</span>

                        <input
                          type="text"
                          placeholder="Enter 6-digit OTP"
                          value={otp}
                          maxLength={6}
                          onChange={(e) =>
                            setOtp(
                              e.target.value.replace(/\D/g, "")
                            )
                          }
                          required
                        />

                      </div>

                    </div>


                    <button
                      type="submit"
                      className="login-btn"
                      disabled={loading}
                    >
                      {loading
                        ? "Creating Account..."
                        : "Verify & Create Account"}

                      <span>→</span>
                    </button>


                    <button
                      type="button"
                      className="resend-btn"
                      onClick={handleSendOtp}
                      disabled={loading}
                    >
                      🔄 Resend OTP
                    </button>

                  </>

                )}


                <div className="switch-login">

                  Already have an account?

                  <button
                    type="button"
                    className="link-button"
                    onClick={() => {
                      setIsRegister(false);
                      resetForm();
                    }}
                  >
                    Login
                  </button>

                </div>

              </form>

            ) : (

              /* LOGIN */

              <form onSubmit={handleLogin}>

                <div className="input-group">

                  <label>Email Address</label>

                  <div className="input-box">

                    <span>✉️</span>

                    <input
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) =>
                        setEmail(e.target.value)
                      }
                      required
                    />

                  </div>

                </div>


                <div className="input-group">

                  <label>Password</label>

                  <div className="input-box">

                    <span>🔐</span>

                    <input
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) =>
                        setPassword(e.target.value)
                      }
                      required
                    />

                  </div>

                </div>


                <button
                  type="submit"
                  className="login-btn"
                  disabled={loading}
                >
                  {loading
                    ? "Authenticating..."
                    : "Enter SmartSociety"}

                  <span>→</span>
                </button>


                <div className="secure-text">
                  🔒 Your connection is protected with
                  secure authentication.
                </div>


                <div className="switch-login">

                  Don't have an account?

                  <button
                    type="button"
                    className="link-button"
                    onClick={() => {
                      setIsRegister(true);
                      resetForm();
                    }}
                  >
                    Create Account
                  </button>

                </div>

              </form>

            )}

          </div>

        </section>

      </div>

    </div>
  );
}

export default App;