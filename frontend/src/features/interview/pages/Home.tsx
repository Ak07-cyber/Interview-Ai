import React, { useRef, useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { useInterview } from '../hooks/useInterview';
import { useTheme } from '../../theme.context';
import { useAuth } from '../../auth/hooks/useAuth';
import '../home.scss';

const Home = () => {
  const navigate = useNavigate();
  const { generateReport, loading } = useInterview();
  const { theme, toggleTheme } = useTheme();
  const { handleLogout } = useAuth();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState("");
  const [selfDescription, setSelfDescription] = useState("");
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const [error, setError] = useState<string | null>(null);

  const handleInitializeOptimization = async () => {
    if (!selectedFile) {
      alert("Please upload a resume file.");
      return;
    }
    if (!jobDescription || !selfDescription) {
      alert("Please fill out both job description and self description.");
      return;
    }

    setError(null);
    const result = await generateReport({
      jobDescription,
      selfDescription,
      resumeFile: selectedFile,
    });

    if (result.error) {
      setError(result.error);
      return;
    }

    if (result.data) {
      navigate(`/interview/${result.data._id}`); 
    }
  };

  const onLogout = async () => {
    await handleLogout();
    navigate('/login');
  };

  return (
    <div className="home-container">
      <header className="home-topbar">
        <Link to="/" className="home-topbar__logo">Interview AI</Link>
        <div className="home-topbar__actions">
          <Link to="/reports" className="home-topbar__link">My Reports</Link>
          <button className="theme-toggle" onClick={toggleTheme} title="Toggle theme" id="theme-toggle-btn">
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
          <button className="button outline-button" onClick={onLogout} style={{ padding: '8px 18px', fontSize: '0.88rem' }}>
            Logout
          </button>
        </div>
      </header>

      <main className="main-content">
        <div className="left-section">
          <div className="portal-badge">
            <span className="line"></span>
            <span className="text">AI INTERVIEW PREP V2.0</span>
          </div>
          <h1 className="title">
            Optimize Your <br />
            <span className="highlight">Application</span>
          </h1>
          <p className="description">
            Transform your professional narrative<br />
            through our algorithmic refining engine.<br />
            Precision-engineered for the modern candidate.
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
              <div 
                className={`upload-box ${isDragOver ? 'drag-over' : ''}`} 
                onClick={handleFileClick} 
                onDragOver={handleDragOver} 
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                id="resume-upload"
              >
                <span className="icon">📄</span>
                <span className="placeholder">{selectedFile ? selectedFile.name : "Drop your file here or click to browse..."}</span>
                <input type="file" accept=".pdf,.doc,.docx" ref={fileInputRef} style={{ display: "none" }} onChange={handleFileChange} />
              </div>
            </div>

            <div className="form-group">
              <label>TARGET JOB DESCRIPTION</label>
              <textarea 
                placeholder="Paste the target requirements here..."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                id="job-description-input"
              ></textarea>
            </div>
            <div className="form-group">
              <label>PROFESSIONAL SELF-DESCRIPTION</label>
              <textarea 
                placeholder="Describe your skills, experience, and what makes you a strong candidate..."
                value={selfDescription}
                onChange={(e) => setSelfDescription(e.target.value)}
                rows={3}
                id="self-description-input"
              ></textarea>
            </div>
            <button className="submit-btn" onClick={handleInitializeOptimization} disabled={loading} id="submit-btn">
              {loading ? "PROCESSING..." : "INITIALIZE OPTIMIZATION"} <span>→</span>
            </button>
            {error && (
              <div className="error-banner">
                <span className="error-banner__icon">⚠️</span>
                <span className="error-banner__text">{error}</span>
              </div>
            )}

            <div className="card-footer">
              <span className="status"><span className="dot"></span> SYSTEM READY</span>
              <span className="security">SECURE TLS 1.3</span>
            </div>
          </div>
        </div>
      </main>

      <footer className="page-footer">
        <div className="logo">INTERVIEW AI</div>
        <div className="links">
          <a href="#">PRIVACY POLICY</a>
          <a href="#">TERMS OF SERVICE</a>
          <a href="#">ACCESSIBILITY</a>
          <a href="#">CONTACT</a>
        </div>
        <div className="copyright">
          © {new Date().getFullYear()} INTERVIEW AI. ALL RIGHTS RESERVED.
        </div>
      </footer>
    </div>
  );
};

export default Home;
