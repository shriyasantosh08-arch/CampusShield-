import { useState } from "react";
import "./SecurityLogin.css";

const SecurityLogin = () => {
  const [securityId, setSecurityId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Backend authentication will be connected here later
    console.log({
      securityId,
      password,
      rememberMe,
    });
  };

  return (
    <div className="security-login-page">

      {/* Left Side - Branding */}
      <section className="security-brand-panel">

        <div className="brand-content">

          <div className="security-logo">
            <div className="shield-icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path d="M12 3L19 6V11C19 15.5 16.1 19.3 12 21C7.9 19.3 5 15.5 5 11V6L12 3Z" />
                <path d="M9 12L11 14L15 10" />
              </svg>
            </div>

            <div>
              <h1>CampusShield</h1>
              <span>Campus Emergency System</span>
            </div>
          </div>

          <div className="brand-message">
            <span className="eyebrow">SECURITY PORTAL</span>

            <h2>
              Keeping your campus
              <span> safe, together.</span>
            </h2>

            <p>
              Respond to campus emergencies, manage incidents,
              and help keep every student safe.
            </p>
          </div>

          <div className="security-status">
            <span className="status-dot"></span>

            <div>
              <strong>Security Network</strong>
              <p>System operational</p>
            </div>
          </div>

        </div>

        <div className="brand-footer">
          <span>CampusShield</span>
          <span>•</span>
          <span>Authorized Personnel Only</span>
        </div>

      </section>


      {/* Right Side - Login */}
      <section className="security-form-panel">

        <div className="login-container">

          <div className="mobile-logo">
            <div className="mobile-shield">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path d="M12 3L19 6V11C19 15.5 16.1 19.3 12 21C7.9 19.3 5 15.5 5 11V6L12 3Z" />
                <path d="M9 12L11 14L15 10" />
              </svg>
            </div>

            <strong>CampusShield</strong>
          </div>


          <div className="login-heading">
            <span className="login-tag">SECURITY ACCESS</span>

            <h2>Welcome back</h2>

            <p>
              Sign in to access the security dashboard.
            </p>
          </div>


          <form onSubmit={handleSubmit}>

            {/* Security ID */}
            <div className="form-group">

              <label htmlFor="securityId">
                Security ID
              </label>

              <div className="input-wrapper">

                <svg
                  className="input-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path d="M20 21V19C20 16.8 18.2 15 16 15H8C5.8 15 4 16.8 4 19V21" />
                  <circle cx="12" cy="7" r="4" />
                </svg>

                <input
                  id="securityId"
                  type="text"
                  placeholder="Enter your security ID"
                  value={securityId}
                  onChange={(e) => setSecurityId(e.target.value)}
                  required
                />

              </div>
            </div>


            {/* Password */}
            <div className="form-group">

              <div className="label-row">
                <label htmlFor="password">
                  Password
                </label>

                <button
                  type="button"
                  className="forgot-password"
                  onClick={() =>
                    console.log("Forgot password clicked")
                  }
                >
                  Forgot password?
                </button>
              </div>

              <div className="input-wrapper">

                <svg
                  className="input-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <rect
                    x="4"
                    y="10"
                    width="16"
                    height="11"
                    rx="2"
                  />
                  <path d="M8 10V7C8 4.8 9.8 3 12 3C14.2 3 16 4.8 16 7V10" />
                </svg>

                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  {showPassword ? "Hide" : "Show"}
                </button>

              </div>
            </div>


            {/* Remember me */}
            <div className="form-options">

              <label className="remember-option">

                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) =>
                    setRememberMe(e.target.checked)
                  }
                />

                <span className="custom-checkbox"></span>

                <span>Remember me</span>

              </label>

            </div>


            {/* Login Button */}
            <button
              type="submit"
              className="login-button"
            >
              <span>Sign in to Security Portal</span>

              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M5 12H19" />
                <path d="M13 6L19 12L13 18" />
              </svg>
            </button>

          </form>


          {/* Security Notice */}
          <div className="security-notice">

            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
            >
              <path d="M12 3L19 6V11C19 15.5 16.1 19.3 12 21C7.9 19.3 5 15.5 5 11V6L12 3Z" />
              <path d="M9 12L11 14L15 10" />
            </svg>

            <p>
              This portal is restricted to authorized
              campus security personnel.
            </p>

          </div>

        </div>

      </section>

    </div>
  );
};

export default SecurityLogin;
