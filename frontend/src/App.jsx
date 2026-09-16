import { useState } from "react";
import "./App.css";

import ResidentDashboard from "./components/ResidentDashboard";
import SecurityDashboard from "./components/SecurityDashboard";
import AdminDashboard from "./components/AdminDashboard";

function App() {
  const [role, setRole] = useState("Resident");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [userName, setUserName] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoginError("");

    if (email === "" || password === "") {
      setLoginError("Please enter email and password");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:8080/api/login",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Login failed");
      }

      setUserName(data.name);

      // Get actual role from MySQL
      if (data.role === "RESIDENT") {
        setRole("Resident");
      } 
      else if (data.role === "SECURITY_GUARD") {
        setRole("Security Guard");
      } 
      else if (data.role === "ADMIN") {
        setRole("Admin");
      }

      setLoggedIn(true);

    } catch (error) {

      setLoginError(
        error.message || "Unable to connect to server"
      );

    }
  };


  const handleLogout = () => {

    setLoggedIn(false);

    setEmail("");

    setPassword("");

    setUserName("");

    setLoginError("");

    setRole("Resident");

  };


  // =========================
  // ROLE BASED DASHBOARDS
  // =========================

  if (loggedIn) {

    if (role === "Resident") {

      return (
        <ResidentDashboard
          email={email}
          userName={userName}
          onLogout={handleLogout}
        />
      );

    }

    if (role === "Security Guard") {

      return (
        <SecurityDashboard
          email={email}
          userName={userName}
          onLogout={handleLogout}
        />
      );

    }

    if (role === "Admin") {

      return (
        <AdminDashboard
          email={email}
          userName={userName}
          onLogout={handleLogout}
        />
      );

    }

  }


  // =========================
  // LOGIN PAGE
  // =========================

  return (

    <div className="app">

      <div className="login-navbar">

        <div className="nav-brand">

          <div className="nav-icon">
            🏢
          </div>

          <h2>SmartSociety</h2>

        </div>


        <div className="nav-right">

          <span>Smart Living Platform</span>

          <div className="online-dot"></div>

          <small>System Online</small>

        </div>

      </div>



      <div className="container">


        <div className="left-section">

          <div className="hero-content">


            <div className="tag">

              ✨ SMART COMMUNITY MANAGEMENT

            </div>


            <h1>

              Live Better.

              <br />

              <span>Manage Smarter.</span>

            </h1>


            <p>

              Your complete digital platform for a smarter,
              safer and better connected community.

            </p>



            <div className="feature-list">


              <div>

                <span>✓</span>

                Manage Complaints

              </div>


              <div>

                <span>✓</span>

                Visitor Management

              </div>


              <div>

                <span>✓</span>

                Easy Payments

              </div>


              <div>

                <span>✓</span>

                Community Updates

              </div>


            </div>



            <div className="community-card">


              <div className="community-avatars">

                👨‍💼 👩‍💼 👨‍🔧 👩‍💻

              </div>


              <div>

                <h4>
                  Join 1,000+ Happy Residents
                </h4>

                <p>
                  Building stronger communities together
                </p>

              </div>


            </div>


          </div>

        </div>



        <div className="login-section">


          <div className="login-card">


            <div className="login-header">


              <div className="welcome-icon">

                👋

              </div>


              <h1>Welcome Back!</h1>


              <p>

                Sign in to access your community dashboard

              </p>


            </div>



            <div className="role-label">

              YOUR ROLE WILL BE DETECTED AUTOMATICALLY

            </div>



            <form onSubmit={handleLogin}>


              <div className="input-group">


                <label>

                  Email Address

                </label>


                <div className="input-box">


                  <span>✉️</span>


                  <input

                    type="email"

                    placeholder="Enter your email"

                    value={email}

                    onChange={(e) =>
                      setEmail(e.target.value)
                    }

                  />


                </div>


              </div>



              <div className="input-group">


                <label>

                  Password

                </label>


                <div className="input-box">


                  <span>🔒</span>


                  <input

                    type="password"

                    placeholder="Enter your password"

                    value={password}

                    onChange={(e) =>
                      setPassword(e.target.value)
                    }

                  />


                </div>


              </div>



              {loginError && (

                <p className="login-error">

                  ⚠️ {loginError}

                </p>

              )}



              <button

                type="submit"

                className="login-btn"

              >

                Login

                <span>→</span>

              </button>


            </form>



            <div className="secure-text">

              🔒 Your information is securely protected

            </div>


          </div>


        </div>


      </div>


    </div>

  );
}

export default App;