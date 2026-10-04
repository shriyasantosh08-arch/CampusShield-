import "./IncidentDetails.css";

const IncidentDetails = () => {
  return (
    <div className="incident-details-page">

      {/* Sidebar */}
      <aside className="incident-sidebar">

        <div className="sidebar-brand">
          <div className="brand-shield">🛡️</div>

          <div>
            <h2>CampusShield</h2>
            <span>Security Portal</span>
          </div>
        </div>

        <nav className="incident-nav">

          <a className="incident-nav-item">
            <span>⌂</span>
            Dashboard
          </a>

          <a className="incident-nav-item active">
            <span>🚨</span>
            Incidents
            <b>3</b>
          </a>

          <a className="incident-nav-item">
            <span>🔔</span>
            Notifications
          </a>

          <a className="incident-nav-item">
            <span>👤</span>
            Profile
          </a>

        </nav>

        <div className="incident-sidebar-bottom">

          <a className="incident-nav-item">
            <span>⚙️</span>
            Settings
          </a>

          <a className="incident-nav-item">
            <span>↪</span>
            Logout
          </a>

        </div>

      </aside>


      {/* Main */}
      <main className="incident-details-main">

        {/* Top bar */}
        <div className="details-topbar">

          <button className="back-button">
            ←
            <span>Back to Incidents</span>
          </button>

          <span className="incident-id">
            Incident #INC-1024
          </span>

        </div>


        {/* Main Grid */}
        <div className="details-grid">


          {/* LEFT */}
          <section className="details-left">


            {/* Incident Header */}
            <div className="incident-header-card">

              <div className="incident-heading">

                <div className="large-incident-icon">
                  🔥
                </div>

                <div>

                  <div className="detail-priority">
                    CRITICAL PRIORITY
                  </div>

                  <h1>Fire / Smoke</h1>

                  <p>
                    Reported 2 minutes ago
                  </p>

                </div>

              </div>

              <span className="status-pill reported">
                ● Reported
              </span>

            </div>


            {/* Description */}
            <div className="detail-card">

              <h2>Incident Description</h2>

              <p className="description-text">
                Smoke has been reported near the laboratory
                area. Students in the surrounding area have
                been advised to move away from the location.
              </p>

            </div>


            {/* Location */}
            <div className="detail-card">

              <div className="card-title-row">

                <div>
                  <h2>Incident Location</h2>

                  <p>
                    Main Block • Laboratory 2
                  </p>
                </div>

                <button className="map-button">
                  Open Map ↗
                </button>

              </div>


              <div className="map-placeholder">

                <div className="map-grid"></div>

                <div className="map-pin">
                  <span>📍</span>
                </div>

                <div className="map-label">
                  Main Block
                  <small>Laboratory 2</small>
                </div>

              </div>

            </div>


            {/* Attached Photo */}
            <div className="detail-card">

              <h2>Attached Evidence</h2>

              <p className="card-subtitle">
                Photo submitted with this incident
              </p>

              <div className="evidence-placeholder">

                <div className="evidence-content">
                  <span>📷</span>
                  <p>Incident Photo</p>
                  <small>Uploaded by student</small>
                </div>

              </div>

            </div>

          </section>


          {/* RIGHT */}
          <aside className="details-right">


            {/* Reporter */}
            <div className="detail-card reporter-card">

              <h2>Reported By</h2>

              <div className="reporter">

                <div className="reporter-avatar">
                  AS
                </div>

                <div>
                  <strong>Anonymous Student</strong>
                  <p>Student ID: STU-2841</p>
                </div>

              </div>

              <div className="reporter-info">
                <span>Reported</span>
                <strong>10:42 AM</strong>
              </div>

            </div>


            {/* Status Timeline */}
            <div className="detail-card">

              <h2>Incident Status</h2>

              <div className="status-timeline">


                <div className="timeline-item active">

                  <div className="timeline-icon">
                    ✓
                  </div>

                  <div>
                    <strong>Incident Reported</strong>
                    <span>10:42 AM</span>
                  </div>

                </div>


                <div className="timeline-line"></div>


                <div className="timeline-item">

                  <div className="timeline-icon">
                    2
                  </div>

                  <div>
                    <strong>Accepted</strong>
                    <span>Waiting for response</span>
                  </div>

                </div>


                <div className="timeline-line"></div>


                <div className="timeline-item">

                  <div className="timeline-icon">
                    3
                  </div>

                  <div>
                    <strong>Responding</strong>
                    <span>Not started</span>
                  </div>

                </div>


                <div className="timeline-line"></div>


                <div className="timeline-item">

                  <div className="timeline-icon">
                    4
                  </div>

                  <div>
                    <strong>Resolved</strong>
                    <span>Not completed</span>
                  </div>

                </div>

              </div>

            </div>


            {/* Action */}
            <div className="action-card">

              <div className="action-icon">
                🛡️
              </div>

              <div>

                <h3>Ready to respond?</h3>

                <p>
                  Accept this incident to begin
                  responding.
                </p>

              </div>

              <button className="accept-button">
                Accept Incident
                <span>→</span>
              </button>

            </div>


          </aside>

        </div>

      </main>

    </div>
  );
};

export default IncidentDetails;