import React from 'react';
import '../../../style/home.scss';

const Home = () => {
  return (
    <div className="home-container">
      <main className="main-content">
        <div className="left-section">
          <div className="portal-badge">
            <span className="line"></span>
            <span className="text">EDITORIAL PORTAL V2.0</span>
          </div>
          <h1 className="title">
            Optimize Your <br />
            <span className="highlight">Application</span>
          </h1>
          <p className="description">
            Transform your professional narrative<br />
            through our algorithmic refining engine.<br />
            Precision-engineered for the modern editor.
          </p>
          <div className="stats">
            <div className="stat-item">
              <h2>98%</h2>
              <p>SUCCESS RATE</p>
            </div>
            <div className="stat-item">
              <h2>2.4k</h2>
              <p>OPTIMIZED DAILY</p>
            </div>
          </div>
        </div>

        <div className="right-section">
          <div className="submission-card">
            <div className="card-header">
              <h2>Submission Portal</h2>
              <p>Complete the parameters to begin processing.</p>
            </div>

            <div className="form-group">
              <label>RESUME / CV</label>
              <div className="upload-box">
                <span className="icon">📄</span>
                <span className="placeholder">Upload your file (PDF, DOCX)...</span>
              </div>
            </div>

            <div className="form-group">
              <label>TARGET JOB DESCRIPTION</label>
              <textarea placeholder="Paste the target requirements here..."></textarea>
            </div>

            <div className="form-group">
              <label>PROFESSIONAL SELF-DESCRIPTION</label>
              <input type="text" placeholder="Your unique value proposition..." />
            </div>

            <button className="submit-btn">
              INITIALIZE OPTIMIZATION <span>→</span>
            </button>

            <div className="card-footer">
              <span className="status"><span className="dot"></span> SYSTEM READY</span>
              <span className="security">SECURE TLS 1.3</span>
            </div>
          </div>
        </div>
      </main>

      <footer className="page-footer">
        <div className="logo">NOCTURNAL EDITOR PORTAL</div>
        <div className="links">
          <a href="#">PRIVACY POLICY</a>
          <a href="#">TERMS OF SERVICE</a>
          <a href="#">ACCESSIBILITY</a>
          <a href="#">CONTACT</a>
        </div>
        <div className="copyright">
          © 2024 NOCTURNAL EDITOR PORTAL. ALL RIGHTS RESERVED.
        </div>
      </footer>
    </div>
  );
};

export default Home;
