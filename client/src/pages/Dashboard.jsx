import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import "./Dashboard.css";

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [roadmapProgress, setRoadmapProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadDashboard = async () => {
    setLoading(true);
    setError(null);
    try {
      const [statsRes, roadmapRes] = await Promise.all([
        api.get("/dashboard").catch(() => ({ data: {} })),
        api.get("/roadmap/progress").catch(() => ({ data: {} }))
      ]);
      setStats(statsRes.data || {});
      setRoadmapProgress(roadmapRes.data || {});
    } catch (err) {
      console.error("Dashboard load failed", err);
      setError("Failed to load dashboard data. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  if (loading) {
    return (
      <div className="dashboard-container">
        <Navbar />
        <div className="dashboard-header">
          <h2 className="dashboard-title">
            <span className="skeleton" style={{ width: 40, height: 40, borderRadius: '50%' }}></span>
            <span className="skeleton" style={{ width: 220, height: 38 }}></span>
          </h2>
        </div>
        <div className="dashboard-grid">
          <div className="dashboard-card skeleton skeleton-card"></div>
          <div className="dashboard-card skeleton skeleton-card"></div>
          <div className="dashboard-card skeleton skeleton-card"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-container">
        <Navbar />
        <div className="dashboard-error">
          <h3>⚠️ Oops, something went wrong</h3>
          <p style={{ color: "var(--text-muted)", marginBottom: "24px" }}>{error}</p>
          <button className="refresh-btn" onClick={loadDashboard}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const totalDays = roadmapProgress?.totalDays || 0;
  const completedDays = roadmapProgress?.completedDays || 0;
  const remainingDays = Math.max(0, totalDays - completedDays);
  const progressPercent = roadmapProgress?.progressPercent || 0;

  const totalQuestions = stats?.totalQuestions || 0;
  const attempted = stats?.attempted || 0;
  const solved = stats?.solved || 0;
  const readinessScore = stats?.readinessScore || 0;
  const weakAreas = stats?.weakAreas || [];

  // Circle chart logic (0 to 100 score)
  const circleColor = readinessScore >= 75 ? "var(--success)" : readinessScore >= 50 ? "var(--warning)" : "var(--error)";

  return (
    <div className="dashboard-container">
      <Navbar />

      <header className="dashboard-header">
        <h2 className="dashboard-title">
          <span role="img" aria-label="analytics">📉</span> 
          Overview
        </h2>
        <button className="refresh-btn" onClick={loadDashboard} title="Refresh Dashboard">
          ↻ Refresh Data
        </button>
      </header>

      <div className="dashboard-grid">
        {/* Roadmap Progress Card */}
        <section className="dashboard-card hover-lift">
          <div className="card-header">
            <span style={{ fontSize: "20px" }}>🗺️</span> Roadmap Journey
          </div>
          
          <div className="stat-row">
            <span className="stat-label">Total Days</span>
            <span className="stat-value">{totalDays}</span>
          </div>
          <div className="stat-row">
            <span className="stat-label">Completed Days</span>
            <span className="stat-value" style={{ color: "var(--success)" }}>{completedDays}</span>
          </div>
          <div className="stat-row">
            <span className="stat-label">Remaining Days</span>
            <span className="stat-value">{remainingDays}</span>
          </div>
          
          <div className="progress-bar-container" title={`${progressPercent}% Completed`}>
            <div 
              className="progress-bar-fill" 
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
          <div style={{ textAlign: "right", marginTop: "10px", fontSize: "13px", color: "var(--text-muted)", fontWeight: "500" }}>
            {progressPercent}% Completed
          </div>
        </section>

        {/* Practice Performance Card */}
        <section className="dashboard-card hover-lift">
          <div className="card-header">
            <span style={{ fontSize: "20px" }}>🧠</span> Readiness Score
          </div>
          
          <div className="readiness-container">
            <svg viewBox="0 0 36 36" className="circular-chart">
              <path className="circle-bg"
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path className="circle"
                strokeDasharray={`${readinessScore}, 100`}
                stroke={circleColor}
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <text x="18" y="21.5" className="circle-score-text">{readinessScore}</text>
            </svg>
            <p style={{ marginTop: "12px", color: "var(--text-muted)", fontSize: "14px", fontWeight: 500 }}>
              Based on {attempted} attempted questions
            </p>
          </div>

          <div className="stats-breakdown">
             <div className="stat-item">
               <div className="stat-num" style={{ color: "var(--success)" }}>{solved}</div>
               <div className="stat-desc">Solved</div>
             </div>
             <div className="stat-item">
               <div className="stat-num" style={{ color: "var(--warning)" }}>{attempted - solved}</div>
               <div className="stat-desc">Learning</div>
             </div>
             <div className="stat-item">
               <div className="stat-num">{totalQuestions}</div>
               <div className="stat-desc">Total</div>
             </div>
          </div>
        </section>

        {/* Weak Areas Card */}
        <section className="dashboard-card hover-lift">
          <div className="card-header">
            <span style={{ fontSize: "20px" }}>🎯</span> Improvement Areas
          </div>
          
          {weakAreas.length === 0 ? (
            <div className="empty-state">
               <span style={{ fontSize: "40px", marginBottom: "12px" }}>🎉</span>
               <p style={{ margin: 0, fontWeight: 600, color: "var(--text-main)", fontSize: "16px" }}>You're all caught up!</p>
               <p style={{ margin: "6px 0 0 0", fontSize: "14px", color: "var(--text-muted)" }}>Keep practicing to maintain your streak.</p>
            </div>
          ) : (
            <ul className="weak-areas-list">
              {weakAreas.map((topic, index) => (
                <li key={topic} className={`weak-area-item ${index % 2 === 0 ? "error" : "warning"}`}>
                  <span style={{ fontSize: "18px" }}>{index % 2 === 0 ? '🔴' : '🟡'}</span>
                  {topic}
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
};

export default Dashboard;