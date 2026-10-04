import "./IncidentResponse.css";

function IncidentResponse() {
  return (
    <div className="response-panel">

      {/* HEADER */}
      <div className="response-header">
        <div>
          <p>INCIDENT RESPONSE</p>
          <h2>Fire / Smoke Incident</h2>
          <span>INC-1024 • Main Block • Laboratory 2</span>
        </div>

        <div className="response-priority">
          CRITICAL
        </div>
      </div>


      {/* CURRENT STATUS */}
      <div className="current-status">

        <div className="status-indicator">
          <span></span>
        </div>

        <div>
          <small>CURRENT STATUS</small>
          <strong>New Incident</strong>
          <p>Waiting for security officer response.</p>
        </div>

      </div>


      {/* STATUS FLOW */}
      <div className="response-section">

        <div className="response-section-title">
          <h3>Response Progress</h3>
          <span>1 of 4</span>
        </div>


        <div className="response-timeline">

          {/* NEW */}

          <div className="response-step completed">

            <div className="step-circle">
              ✓
            </div>

            <div className="step-content">
              <strong>Incident Reported</strong>
              <span>2 minutes ago</span>
            </div>

          </div>


          {/* ACCEPT */}

          <div className="response-step active">

            <div className="step-circle">
              2
            </div>

            <div className="step-content">
              <strong>Accept Incident</strong>
              <span>Security officer action required</span>
            </div>

          </div>


          {/* RESPONDING */}

          <div className="response-step">

            <div className="step-circle">
              3
            </div>

            <div className="step-content">
              <strong>Responding</strong>
              <span>Officer is travelling to location</span>
            </div>

          </div>


          {/* ON SCENE */}

          <div className="response-step">

            <div className="step-circle">
              4
            </div>

            <div className="step-content">
              <strong>On Scene</strong>
              <span>Officer has reached the location</span>
            </div>

          </div>


          {/* RESOLVED */}

          <div className="response-step">

            <div className="step-circle">
              5
            </div>

            <div className="step-content">
              <strong>Resolved</strong>
              <span>Incident has been handled</span>
            </div>

          </div>

        </div>

      </div>


      {/* ACTION */}

      <div className="response-action">

        <div>
          <small>NEXT ACTION</small>

          <h3>Accept this incident</h3>

          <p>
            By accepting this incident, you confirm that
            you are taking responsibility for responding to it.
          </p>
        </div>

        <button className="accept-button">
          ✓ Accept Incident
        </button>

      </div>


      {/* QUICK ACTIONS */}

      <div className="quick-actions">

        <button>
          📍 Open Location
        </button>

        <button>
          📞 Contact Reporter
        </button>

        <button>
          🚨 Escalate
        </button>

      </div>

    </div>
  );
}

export default IncidentResponse;