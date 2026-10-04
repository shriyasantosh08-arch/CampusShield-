import "./SecurityProfile.css";

function SecurityProfile() {
  return (
    <div className="profile-page">

      {/* ================= SIDEBAR ================= */}

      <aside className="profile-sidebar">

        <div className="profile-brand">
          <div className="profile-brand-shield">
            🛡️
          </div>

          <div>
            <h2>CampusShield</h2>
            <span>Security Portal</span>
          </div>
        </div>


        <nav className="profile-nav">

          <a className="profile-nav-item">
            <span>⌂</span>
            Dashboard
          </a>

          <a className="profile-nav-item">
            <span>🚨</span>
            Incidents
            <b>3</b>
          </a>

          <a className="profile-nav-item">
            <span>🔔</span>
            Notifications
            <b className="notification-badge">2</b>
          </a>

          <a className="profile-nav-item active">
            <span>👤</span>
            Profile
          </a>

        </nav>


        <div className="profile-sidebar-bottom">

          <a className="profile-nav-item">
            <span>⚙️</span>
            Settings
          </a>

          <a className="profile-nav-item">
            <span>↪</span>
            Logout
          </a>

        </div>

      </aside>


      {/* ================= MAIN ================= */}

      <main className="profile-main">

        {/* HEADER */}

        <header className="profile-header">

          <div>
            <p className="profile-eyebrow">
              SECURITY CENTER
            </p>

            <h1>Profile</h1>

            <p className="profile-subtitle">
              Manage your security officer information.
            </p>
          </div>

        </header>


        {/* ================= PROFILE CARD ================= */}

        <section className="profile-card">

          <div className="profile-card-header">

            <div className="large-avatar">
              SO
            </div>

            <div className="profile-identity">

              <h2>Security Officer</h2>

              <p>Security ID: SEC-001</p>

              <span className="online-status">
                <i></i>
                On Duty
              </span>

            </div>

            <button className="edit-profile-button">
              Edit Profile
            </button>

          </div>


          {/* ================= INFORMATION ================= */}

          <div className="profile-section">

            <h3>Personal Information</h3>

            <div className="profile-grid">

              <div className="profile-field">
                <label>FULL NAME</label>
                <strong>Security Officer</strong>
              </div>

              <div className="profile-field">
                <label>SECURITY ID</label>
                <strong>SEC-001</strong>
              </div>

              <div className="profile-field">
                <label>EMAIL</label>
                <strong>security@campus.edu</strong>
              </div>

              <div className="profile-field">
                <label>PHONE</label>
                <strong>+91 XXXXX XXXXX</strong>
              </div>

            </div>

          </div>


          {/* ================= WORK INFORMATION ================= */}

          <div className="profile-section">

            <h3>Work Information</h3>

            <div className="profile-grid">

              <div className="profile-field">
                <label>ROLE</label>
                <strong>Security Officer</strong>
              </div>

              <div className="profile-field">
                <label>DEPARTMENT</label>
                <strong>Campus Security</strong>
              </div>

              <div className="profile-field">
                <label>CURRENT SHIFT</label>
                <strong>8:00 AM – 4:00 PM</strong>
              </div>

              <div className="profile-field">
                <label>STATUS</label>
                <strong className="status-active">
                  ● Active / On Duty
                </strong>
              </div>

            </div>

          </div>


          {/* ================= ACCOUNT ================= */}

          <div className="profile-section account-section">

            <h3>Account</h3>

            <div className="account-row">

              <div>
                <strong>Password</strong>
                <p>Last changed recently</p>
              </div>

              <button>
                Change Password
              </button>

            </div>


            <div className="account-row">

              <div>
                <strong>Account Status</strong>
                <p>Your security account is active.</p>
              </div>

              <span className="account-active">
                Active
              </span>

            </div>

          </div>

        </section>

      </main>

    </div>
  );
}

export default SecurityProfile;