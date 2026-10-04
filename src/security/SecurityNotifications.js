import "./SecurityNotifications.css";

const SecurityNotifications = () => {
  return (
    <div className="notifications-page">

      {/* Sidebar */}
      <aside className="notifications-sidebar">

        <div className="notifications-brand">
          <div className="brand-shield">🛡️</div>

          <div>
            <h2>CampusShield</h2>
            <span>Security Portal</span>
          </div>
        </div>

        <nav className="notifications-nav">

          <a className="notification-nav-item">
            <span>⌂</span>
            Dashboard
          </a>

          <a className="notification-nav-item">
            <span>🚨</span>
            Incidents
            <b>3</b>
          </a>

          <a className="notification-nav-item active">
            <span>🔔</span>
            Notifications
            <b className="notification-count">2</b>
          </a>

          <a className="notification-nav-item">
            <span>👤</span>
            Profile
          </a>

        </nav>

        <div className="notifications-sidebar-bottom">

          <a className="notification-nav-item">
            <span>⚙️</span>
            Settings
          </a>

          <a className="notification-nav-item">
            <span>↪</span>
            Logout
          </a>

        </div>

      </aside>


      {/* Main */}
      <main className="notifications-main">

        {/* Header */}
        <header className="notifications-header">

          <div>
            <p className="notifications-eyebrow">
              SECURITY CENTER
            </p>

            <h1>Notifications</h1>

            <p className="notifications-subtitle">
              Stay updated with incidents and security alerts.
            </p>
          </div>

          <button className="mark-read-button">
            ✓ Mark all as read
          </button>

        </header>


        {/* Summary */}
        <section className="notification-summary">

          <div className="summary-item active-summary">
            <span className="summary-number">2</span>

            <div>
              <strong>Unread</strong>
              <p>Needs your attention</p>
            </div>
          </div>


          <div className="summary-item">
            <span className="summary-number">8</span>

            <div>
              <strong>Today</strong>
              <p>Total notifications</p>
            </div>
          </div>


          <div className="summary-item">
            <span className="summary-number">24</span>

            <div>
              <strong>This Week</strong>
              <p>Total notifications</p>
            </div>
          </div>

        </section>


        {/* Filters */}
        <div className="notification-toolbar">

          <div className="notification-tabs">

            <button className="notification-tab active">
              All
            </button>

            <button className="notification-tab">
              Unread
              <span>2</span>
            </button>

            <button className="notification-tab">
              Incidents
            </button>

            <button className="notification-tab">
              System
            </button>

          </div>

          <button className="filter-button">
            Latest ▾
          </button>

        </div>


        {/* Notification List */}
        <section className="notification-list">


          {/* Critical */}
          <div className="notification-card unread critical-notification">

            <div className="notification-icon critical-icon">
              🚨
            </div>

            <div className="notification-content">

              <div className="notification-title-row">

                <div>
                  <span className="notification-label critical-label">
                    CRITICAL INCIDENT
                  </span>

                  <h3>New fire / smoke incident</h3>
                </div>

                <span className="notification-time">
                  2 min ago
                </span>

              </div>

              <p>
                A fire/smoke incident has been reported
                at Main Block • Laboratory 2.
              </p>

              <div className="notification-actions">

                <button className="view-notification">
                  View Incident →
                </button>

                <span className="unread-dot"></span>

              </div>

            </div>

          </div>


          {/* Medical */}
          <div className="notification-card unread high-notification">

            <div className="notification-icon medical-icon">
              🏥
            </div>

            <div className="notification-content">

              <div className="notification-title-row">

                <div>
                  <span className="notification-label high-label">
                    HIGH PRIORITY
                  </span>

                  <h3>Medical emergency reported</h3>
                </div>

                <span className="notification-time">
                  8 min ago
                </span>

              </div>

              <p>
                A student has reported a medical emergency
                at Block B • 2nd Floor.
              </p>

              <div className="notification-actions">

                <button className="view-notification">
                  View Incident →
                </button>

                <span className="unread-dot"></span>

              </div>

            </div>

          </div>


          {/* Assignment */}
          <div className="notification-card">

            <div className="notification-icon assignment-icon">
              🛡️
            </div>

            <div className="notification-content">

              <div className="notification-title-row">

                <div>
                  <span className="notification-label assignment-label">
                    ASSIGNMENT
                  </span>

                  <h3>Incident assigned to you</h3>
                </div>

                <span className="notification-time">
                  25 min ago
                </span>

              </div>

              <p>
                Electrical hazard at Engineering Block •
                Laboratory 3 has been assigned to you.
              </p>

              <div className="notification-actions">

                <button className="view-notification">
                  View Incident →
                </button>

              </div>

            </div>

          </div>


          {/* Resolved */}
          <div className="notification-card">

            <div className="notification-icon resolved-icon">
              ✓
            </div>

            <div className="notification-content">

              <div className="notification-title-row">

                <div>
                  <span className="notification-label resolved-label">
                    RESOLVED
                  </span>

                  <h3>Incident successfully resolved</h3>
                </div>

                <span className="notification-time">
                  1 hr ago
                </span>

              </div>

              <p>
                Water leakage reported at Hostel Block
                has been marked as resolved.
              </p>

              <div className="notification-actions">

                <button className="view-notification">
                  View Details →
                </button>

              </div>

            </div>

          </div>


          {/* System */}
          <div className="notification-card">

            <div className="notification-icon system-icon">
              ℹ️
            </div>

            <div className="notification-content">

              <div className="notification-title-row">

                <div>
                  <span className="notification-label system-label">
                    SYSTEM
                  </span>

                  <h3>Security shift started</h3>
                </div>

                <span className="notification-time">
                  2 hrs ago
                </span>

              </div>

              <p>
                Your security shift has started.
                You are currently marked as On Duty.
              </p>

            </div>

          </div>

        </section>

      </main>

    </div>
  );
};

export default SecurityNotifications;