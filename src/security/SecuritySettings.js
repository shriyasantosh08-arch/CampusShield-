import "./SecuritySettings.css";

function SecuritySettings() {
  return (
    <div className="settings-page">

      {/* ================= SIDEBAR ================= */}

      <aside className="settings-sidebar">

        <div className="settings-brand">
          <div className="settings-shield">
            🛡️
          </div>

          <div>
            <h2>CampusShield</h2>
            <span>Security Portal</span>
          </div>
        </div>


        <nav className="settings-nav">

          <a className="settings-nav-item">
            <span>⌂</span>
            Dashboard
          </a>

          <a className="settings-nav-item">
            <span>🚨</span>
            Incidents
            <b>3</b>
          </a>

          <a className="settings-nav-item">
            <span>🔔</span>
            Notifications
            <b className="notification-badge">2</b>
          </a>

          <a className="settings-nav-item">
            <span>👤</span>
            Profile
          </a>

        </nav>


        <div className="settings-sidebar-bottom">

          <a className="settings-nav-item active">
            <span>⚙️</span>
            Settings
          </a>

          <a className="settings-nav-item">
            <span>↪</span>
            Logout
          </a>

        </div>

      </aside>


      {/* ================= MAIN ================= */}

      <main className="settings-main">

        <header className="settings-header">

          <div>
            <p className="settings-eyebrow">
              SECURITY CENTER
            </p>

            <h1>Settings</h1>

            <p className="settings-subtitle">
              Manage your security portal preferences.
            </p>
          </div>

        </header>


        {/* ================= NOTIFICATIONS ================= */}

        <section className="settings-card">

          <div className="settings-card-header">

            <div>
              <h2>Notifications</h2>

              <p>
                Control how you receive security alerts.
              </p>
            </div>

            <span className="settings-icon">
              🔔
            </span>

          </div>


          <div className="setting-row">

            <div>
              <strong>Incident Alerts</strong>

              <p>
                Receive notifications when a new incident is reported.
              </p>
            </div>

            <label className="toggle">
              <input type="checkbox" defaultChecked />
              <span></span>
            </label>

          </div>


          <div className="setting-row">

            <div>
              <strong>Critical Emergency Alerts</strong>

              <p>
                Always receive critical fire, medical and security alerts.
              </p>
            </div>

            <label className="toggle">
              <input type="checkbox" defaultChecked />
              <span></span>
            </label>

          </div>


          <div className="setting-row">

            <div>
              <strong>Sound Alerts</strong>

              <p>
                Play a sound when a critical incident arrives.
              </p>
            </div>

            <label className="toggle">
              <input type="checkbox" defaultChecked />
              <span></span>
            </label>

          </div>

        </section>


        {/* ================= DUTY ================= */}

        <section className="settings-card">

          <div className="settings-card-header">

            <div>
              <h2>Duty Preferences</h2>

              <p>
                Configure your security duty status.
              </p>
            </div>

            <span className="settings-icon">
              🛡️
            </span>

          </div>


          <div className="setting-row">

            <div>
              <strong>Auto Duty Status</strong>

              <p>
                Automatically mark your status as On Duty during assigned shifts.
              </p>
            </div>

            <label className="toggle">
              <input type="checkbox" defaultChecked />
              <span></span>
            </label>

          </div>


          <div className="setting-row">

            <div>
              <strong>Emergency Priority Mode</strong>

              <p>
                Keep critical incidents visible until they are acknowledged.
              </p>
            </div>

            <label className="toggle">
              <input type="checkbox" defaultChecked />
              <span></span>
            </label>

          </div>

        </section>


        {/* ================= SECURITY ================= */}

        <section className="settings-card">

          <div className="settings-card-header">

            <div>
              <h2>Account & Security</h2>

              <p>
                Manage your account security.
              </p>
            </div>

            <span className="settings-icon">
              🔐
            </span>

          </div>


          <div className="settings-action-row">

            <div>
              <strong>Change Password</strong>

              <p>
                Update your security portal password.
              </p>
            </div>

            <button>
              Change Password →
            </button>

          </div>


          <div className="settings-action-row">

            <div>
              <strong>Session Security</strong>

              <p>
                Your account is currently protected and active.
              </p>
            </div>

            <span className="secure-status">
              ● Secure
            </span>

          </div>

        </section>


        {/* ================= SYSTEM ================= */}

        <section className="settings-card system-card">

          <div className="settings-card-header">

            <div>
              <h2>System Information</h2>

              <p>
                CampusShield security portal information.
              </p>
            </div>

            <span className="settings-icon">
              ℹ️
            </span>

          </div>


          <div className="system-info">

            <span>Portal Version</span>
            <strong>1.0.0</strong>

          </div>


          <div className="system-info">

            <span>System Status</span>

            <strong className="system-online">
              ● Operational
            </strong>

          </div>

        </section>


        {/* SAVE */}

        <div className="settings-footer">

          <button className="reset-button">
            Reset Changes
          </button>

          <button className="save-button">
            Save Settings
          </button>

        </div>

      </main>

    </div>
  );
}

export default SecuritySettings;