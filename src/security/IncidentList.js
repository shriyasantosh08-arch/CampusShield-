import "./IncidentList.css";

const incidents = [
  {
    id: "INC-1024",
    type: "Fire / Smoke",
    icon: "🚨",
    priority: "Critical",
    priorityClass: "critical",
    location: "Main Block • Laboratory 2",
    description:
      "Smoke has been detected inside Laboratory 2. Immediate security response required.",
    time: "2 min ago",
    status: "New",
    statusClass: "new",
  },
  {
    id: "INC-1023",
    type: "Medical Emergency",
    icon: "🏥",
    priority: "High",
    priorityClass: "high",
    location: "Block B • 2nd Floor",
    description:
      "A student has reported a medical emergency and requires immediate assistance.",
    time: "8 min ago",
    status: "New",
    statusClass: "new",
  },
  {
    id: "INC-1022",
    type: "Electrical Hazard",
    icon: "⚡",
    priority: "High",
    priorityClass: "high",
    location: "Engineering Block • Laboratory 3",
    description:
      "Electrical sparks were reported near the laboratory equipment.",
    time: "25 min ago",
    status: "Accepted",
    statusClass: "accepted",
  },
  {
    id: "INC-1021",
    type: "Water Leakage",
    icon: "💧",
    priority: "Medium",
    priorityClass: "medium",
    location: "Hostel Block • Ground Floor",
    description:
      "Water leakage has been reported near the ground-floor corridor.",
    time: "1 hr ago",
    status: "Resolved",
    statusClass: "resolved",
  },
  {
    id: "INC-1020",
    type: "Security Issue",
    icon: "🛡️",
    priority: "Medium",
    priorityClass: "medium",
    location: "Main Gate • Entrance",
    description:
      "An unauthorized access attempt was reported at the main entrance.",
    time: "2 hrs ago",
    status: "On Scene",
    statusClass: "onscene",
  },
];


function IncidentList() {
  return (
    <div className="incident-list-page">

      {/* ================= SIDEBAR ================= */}

      <aside className="incident-sidebar">

        <div className="incident-brand">
          <div className="brand-shield">
            🛡️
          </div>

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
            <b className="notification-badge">2</b>
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


      {/* ================= MAIN ================= */}

      <main className="incident-main">

        {/* HEADER */}

        <header className="incident-header">

          <div>
            <p className="incident-eyebrow">
              SECURITY CENTER
            </p>

            <h1>Incidents</h1>

            <p className="incident-subtitle">
              Monitor and respond to campus security incidents.
            </p>
          </div>


          <button className="refresh-button">
            ↻ Refresh
          </button>

        </header>


        {/* ================= SUMMARY ================= */}

        <section className="incident-summary">

          <div className="incident-summary-card active">
            <span className="summary-number">3</span>

            <div>
              <strong>New</strong>
              <p>Needs attention</p>
            </div>
          </div>


          <div className="incident-summary-card">
            <span className="summary-number">2</span>

            <div>
              <strong>Active</strong>
              <p>Being handled</p>
            </div>
          </div>


          <div className="incident-summary-card">
            <span className="summary-number">8</span>

            <div>
              <strong>Resolved</strong>
              <p>Completed incidents</p>
            </div>
          </div>

        </section>


        {/* ================= FILTERS ================= */}

        <div className="incident-toolbar">

          <div className="incident-tabs">

            <button className="incident-tab active">
              All <span>5</span>
            </button>

            <button className="incident-tab">
              New <span>2</span>
            </button>

            <button className="incident-tab">
              Active <span>2</span>
            </button>

            <button className="incident-tab">
              Resolved
            </button>

          </div>


          <button className="incident-filter">
            Latest ▾
          </button>

        </div>


        {/* ================= INCIDENT LIST ================= */}

        <section className="incidents-container">

          <div className="list-heading">

            <div>
              <h2>All Incidents</h2>
              <p>Recent incidents reported across campus</p>
            </div>

            <span className="incident-count">
              5 incidents
            </span>

          </div>


          <div className="incident-list">

            {incidents.map((incident) => (

              <div
                className={`incident-list-card ${incident.priorityClass}`}
                key={incident.id}
              >

                {/* ICON */}

                <div
                  className={`incident-list-icon ${incident.priorityClass}`}
                >
                  {incident.icon}
                </div>


                {/* CONTENT */}

                <div className="incident-list-content">

                  <div className="incident-list-top">

                    <div>

                      <span
                        className={`incident-priority ${incident.priorityClass}`}
                      >
                        {incident.priority}
                      </span>

                      <h3>{incident.type}</h3>

                      <span className="incident-id">
                        {incident.id}
                      </span>

                    </div>


                    <span
                      className={`incident-status ${incident.statusClass}`}
                    >
                      {incident.status}
                    </span>

                  </div>


                  <p className="incident-list-description">
                    {incident.description}
                  </p>


                  <div className="incident-meta">

                    <span>
                      📍 {incident.location}
                    </span>

                    <span>
                      🕒 {incident.time}
                    </span>

                  </div>


                  <button className="incident-view-button">
                    View Incident →
                  </button>

                </div>

              </div>

            ))}

          </div>

        </section>

      </main>

    </div>
  );
}

export default IncidentList;