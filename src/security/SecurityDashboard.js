import "./SecurityDashboard.css";

const SecurityDashboard = () => {
  return (
    <div className="security-dashboard">

      {/* Sidebar */}
      <aside className="security-sidebar">

        <div className="sidebar-logo">
          <div className="logo-shield">🛡️</div>
          <div>
            <h2>CampusShield</h2>
            <span>Security Portal</span>
          </div>
        </div>

        <nav className="sidebar-nav">

          <a className="nav-item active">
            <span>⌂</span>
            Dashboard
          </a>

          <a className="nav-item">
            <span>🚨</span>
            Incidents
            <span className="nav-badge">3</span>
          </a>

          <a className="nav-item">
            <span>🔔</span>
            Notifications
            <span className="nav-badge notification">2</span>
          </a>

          <a className="nav-item">
            <span>👤</span>
            Profile
          </a>

        </nav>

        <div className="sidebar-bottom">

          <a className="nav-item">
            <span>⚙️</span>
            Settings
          </a>

          <a className="nav-item logout">
            <span>↪</span>
            Logout
          </a>

        </div>

      </aside>


      {/* Main Content */}
      <main className="dashboard-main">

        {/* Header */}
        <header className="dashboard-header">

          <div>
            <p className="dashboard-date">SUNDAY, OCTOBER 4, 2026</p>

            <h1>Good afternoon, Officer 👋</h1>

            <p className="header-subtitle">
              Here's what's happening on campus today.
            </p>
          </div>

          <div className="header-actions">

            <button className="notification-button">
              🔔
              <span></span>
            </button>

            <div className="officer-profile">
              <div className="officer-avatar">RS</div>

              <div>
                <strong>Rahul Sharma</strong>
                <small>Security Officer</small>
              </div>
            </div>

          </div>

        </header>


        {/* Duty Status */}
        <div className="duty-status">

          <div className="status-left">
            <span className="online-dot"></span>

            <div>
              <strong>You are On Duty</strong>
              <p>Available to respond to incidents</p>
            </div>
          </div>

          <button className="status-button">
            On Duty ▾
          </button>

        </div>


        {/* Statistics */}
        <section className="stats-grid">

          <div className="stat-card">
            <div className="stat-icon new-icon">🚨</div>

            <div>
              <span>New Incidents</span>
              <strong>03</strong>
            </div>

            <small className="stat-change">
              Needs attention
            </small>
          </div>


          <div className="stat-card">
            <div className="stat-icon active-icon">◷</div>

            <div>
              <span>Active</span>
              <strong>02</strong>
            </div>

            <small className="stat-change">
              Currently responding
            </small>
          </div>


          <div className="stat-card">
            <div className="stat-icon resolved-icon">✓</div>

            <div>
              <span>Resolved Today</span>
              <strong>08</strong>
            </div>

            <small className="stat-change">
              Good work today
            </small>
          </div>

        </section>


        {/* Content Grid */}
        <div className="dashboard-content">


          {/* Emergency Alerts */}
          <section className="incidents-section">

            <div className="section-heading">

              <div>
                <h2>Emergency Alerts</h2>
                <p>Incidents requiring your attention</p>
              </div>

              <button className="view-all">
                View all →
              </button>

            </div>


            {/* Incident Card 1 */}
            <div className="emergency-card critical">

              <div className="incident-top">

                <div className="incident-type">
                  <div className="incident-icon fire">
                    🔥
                  </div>

                  <div>
                    <span className="priority critical-text">
                      CRITICAL
                    </span>

                    <h3>Fire / Smoke</h3>
                  </div>
                </div>

                <span className="incident-time">
                  2 min ago
                </span>

              </div>


              <p className="incident-description">
                Smoke has been reported near the
                laboratory area.
              </p>


              <div className="incident-location">
                <span>📍</span>
                <span>Main Block • Laboratory 2</span>
              </div>


              <button className="incident-button">
                View Incident →
              </button>

            </div>


            {/* Incident Card 2 */}
            <div className="emergency-card high">

              <div className="incident-top">

                <div className="incident-type">
                  <div className="incident-icon medical">
                    🏥
                  </div>

                  <div>
                    <span className="priority high-text">
                      HIGH
                    </span>

                    <h3>Medical Emergency</h3>
                  </div>
                </div>

                <span className="incident-time">
                  8 min ago
                </span>

              </div>


              <p className="incident-description">
                Student reported feeling unwell
                near the academic block.
              </p>


              <div className="incident-location">
                <span>📍</span>
                <span>Block B • 2nd Floor</span>
              </div>


              <button className="incident-button">
                View Incident →
              </button>

            </div>

          </section>


          {/* Right Column */}
          <aside className="dashboard-right">


            {/* Campus Overview */}
            <section className="overview-card">

              <div className="section-heading">
                <div>
                  <h2>Campus Overview</h2>
                  <p>Current security status</p>
                </div>
              </div>


              <div className="campus-status">

                <div className="campus-status-icon">
                  ✓
                </div>

                <div>
                  <strong>Campus Secure</strong>
                  <p>No major threats detected</p>
                </div>

              </div>


              <div className="overview-row">
                <span>Security Officers</span>
                <strong>12 Active</strong>
              </div>

              <div className="overview-row">
                <span>Open Incidents</span>
                <strong>05</strong>
              </div>

            </section>


            {/* Recent Activity */}
            <section className="activity-card">

              <div className="section-heading">

                <div>
                  <h2>Recent Activity</h2>
                  <p>Latest updates</p>
                </div>

              </div>


              <div className="activity-item">

                <span className="activity-dot green"></span>

                <div>
                  <strong>Incident resolved</strong>
                  <p>Water leakage • Hostel</p>
                  <small>12 min ago</small>
                </div>

              </div>


              <div className="activity-item">

                <span className="activity-dot orange"></span>

                <div>
                  <strong>Incident assigned</strong>
                  <p>Electrical hazard • Lab 3</p>
                  <small>25 min ago</small>
                </div>

              </div>


              <div className="activity-item">

                <span className="activity-dot red"></span>

                <div>
                  <strong>New incident reported</strong>
                  <p>Medical emergency • Block B</p>
                  <small>32 min ago</small>
                </div>

              </div>

            </section>

          </aside>

        </div>

      </main>

    </div>
  );
};

export default SecurityDashboard;