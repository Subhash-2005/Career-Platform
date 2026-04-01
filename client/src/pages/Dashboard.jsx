import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import "./Dashboard.css";

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [roadmapProgress, setRoadmapProgress] = useState(null);
  const [community, setCommunity] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [previewRoadmap, setPreviewRoadmap] = useState(null);
  const [previewLoading, setPreviewLoading] = useState(false);

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

      const targetRole = statsRes.data?.targetRole || "";
      if (targetRole) {
        const communityRes = await api.get(`/roadmap/community?role=${encodeURIComponent(targetRole)}`);
        setCommunity(communityRes.data || []);
      }
      
    } catch (err) {
      console.error("Dashboard load failed", err);
      setError("Failed to load dashboard data. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  const handleFollowPlan = async (targetRoadmapId) => {
    if (!window.confirm("Are you sure you want to replace your current roadmap with this one?")) return;
    try {
      await api.post("/roadmap/follow", { targetRoadmapId });
      alert("You are now following this roadmap!");
      window.location.reload(); 
    } catch (err) {
      console.error("Follow failed", err);
      alert("Failed to follow roadmap: " + (err.response?.data?.message || "Server Error"));
    }
  };

  const handleViewRoadmap = async (roadmapId) => {
    setPreviewLoading(true);
    try {
      const res = await api.get(`/roadmap/view/${roadmapId}`);
      setPreviewRoadmap(res.data);
    } catch (err) {
      console.error("Preview fetch error:", err);
      alert("Could not load roadmap preview.");
    } finally {
      setPreviewLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  if (loading) {
    return (
      <div className="dashboard-container">
        <Navbar />
        <div className="dashboard-grid">
          <div className="dashboard-card skeleton skeleton-card"></div>
        </div>
      </div>
    );
  }

  // --- LOGIC FOR YOUR OWN UNIT TYPE ---
  // Priority: 1. Backend Stats Unit -> 2. Roadmap Progress Labels -> 3. Default "Days"
  const myUnitLabel = stats?.unitType || (roadmapProgress?.roadmapDays?.[0]?.label?.includes("Week") ? "Weeks" : "Days");

  const totalUnits = stats?.daysToCrack || roadmapProgress?.totalDays || 0;
  const completedUnits = roadmapProgress?.completedDays || 0;
  const remainingUnits = Math.max(0, totalUnits - completedUnits);
  const progressPercent = roadmapProgress?.progressPercent || 0;

  const solved = stats?.solved || 0;
  const attempted = stats?.attempted || 0;
  const readinessScore = stats?.readinessScore || 0;
  const weakAreas = stats?.weakAreas || [];
  const targetRole = stats?.targetRole || "your goal";

  const circleColor = readinessScore >= 75 ? "var(--success)" : readinessScore >= 50 ? "var(--warning)" : "var(--error)";

  return (
    <div className="dashboard-container">
      <Navbar />

      {error && (
        <div className="error-banner" style={{ backgroundColor: '#fee2e2', color: '#dc2626', padding: '12px', borderRadius: '8px', marginBottom: '20px', textAlign: 'center', fontWeight: '500' }}>
          ⚠️ {error}
        </div>
      )}

      <header className="dashboard-header">
        <h2 className="dashboard-title">📈 Overview</h2>
        <button className="refresh-btn" onClick={loadDashboard}>↻ Refresh Data</button>
      </header>

      <div className="dashboard-grid">
        {/* User Progress Card */}
        <section className="dashboard-card hover-lift">
          <div className="card-header">🗺️ Roadmap Journey</div>
          <div className="stat-row">
            <span className="stat-label">Total Duration</span>
            {/* UPDATED: Dynamically shows Weeks or Days */}
            <span className="stat-value">{totalUnits} {myUnitLabel}</span>
          </div>
          <div className="stat-row">
            <span className="stat-label">Completed</span>
            <span className="stat-value" style={{ color: "var(--success)" }}>{completedUnits}</span>
          </div>
          <div className="stat-row">
            <span className="stat-label">Remaining</span>
            <span className="stat-value">{remainingUnits}</span>
          </div>
          <div className="progress-bar-container">
            <div className="progress-bar-fill" style={{ width: `${progressPercent}%` }}></div>
          </div>
          <div style={{ textAlign: "right", marginTop: "10px", fontSize: "13px", color: "var(--text-muted)" }}>
            {progressPercent}% of {totalUnits} {myUnitLabel} Mastered
          </div>
        </section>

        {/* Readiness Score Card */}
        <section className="dashboard-card hover-lift">
          <div className="card-header">🧠 Readiness Score</div>
          <div className="readiness-container">
            <svg viewBox="0 0 36 36" className="circular-chart">
              <path className="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              <path className="circle" strokeDasharray={`${readinessScore}, 100`} stroke={circleColor} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              <text x="18" y="21.5" className="circle-score-text">{readinessScore}</text>
            </svg>
          </div>
          <div className="stats-breakdown">
             <div className="stat-item"><div className="stat-num">{solved}</div><div className="stat-desc">Solved</div></div>
             <div className="stat-item"><div className="stat-num">{stats?.latestInterviewScore || 0}%</div><div className="stat-desc">Interview</div></div>
             <div className="stat-item"><div className="stat-num">{attempted}</div><div className="stat-desc">Attempts</div></div>
          </div>
        </section>

        {/* Peer List */}
        <section className="dashboard-card hover-lift community-card">
          <div className="card-header">👥 Peers for {targetRole}</div>
          <div className="community-list">
            {community.length === 0 ? (
              <p className="empty-msg">No peers found yet. Be the pioneer!</p>
            ) : (
              community.map((peer) => {
                const count = peer.totalWeeks || peer.totalDays || 0;
                // DETECTION: Checks peer roadmap labels for "Week"
                const peerUnit = peer.firstDayLabel?.includes("Week") ? "Weeks" : "Days";

                return (
                  <div key={peer.roadmapId} className="peer-item">
                    <div className="peer-avatar">{peer.userName.charAt(0)}</div>
                    <div className="peer-info">
                      <strong>{peer.userName}</strong>
                      <span>Target: {count} {peerUnit} • {peer.level}</span>
                    </div>
                    <div className="peer-actions">
                      <button 
                        className="small-view-btn" 
                        disabled={previewLoading}
                        onClick={() => handleViewRoadmap(peer.roadmapId)}
                      >
                        {previewLoading ? "..." : "View"}
                      </button>
                      <button className="small-action-btn" onClick={() => handleFollowPlan(peer.roadmapId)}>Follow</button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </section>

        {/* Improvement Areas Card */}
        <section className="dashboard-card hover-lift full-width-mobile">
          <div className="card-header">🎯 Improvement Areas</div>
          {weakAreas.length === 0 ? (
            <div className="empty-state">🎉<p>You're all caught up!</p></div>
          ) : (
            <ul className="weak-areas-list">
              {weakAreas.map((topic, index) => (
                <li key={topic} className={`weak-area-item ${index % 2 === 0 ? "error" : "warning"}`}>{topic}</li>
              ))}
            </ul>
          )}
        </section>
      </div>

      {/* Preview Modal (kept for completeness) */}
      {previewRoadmap && (
        <div className="modal-overlay">
          <div className="preview-modal">
            <div className="modal-header">
              <h3>Curriculum Preview</h3>
              <button className="close-x" onClick={() => setPreviewRoadmap(null)}>&times;</button>
            </div>
            <div className="modal-body">
              <p className="preview-intro">Previewing <strong>{previewRoadmap.userId?.name}'s</strong> roadmap for {previewRoadmap.careerPath}.</p>
              <div className="preview-scroll-area">
                {previewRoadmap.roadmapDays.map((day, idx) => (
                  <div key={idx} className="preview-day-card">
                    <span className="preview-day-label">{day.label}</span>
                    {day.tasks.map((task, tIdx) => (
                      <div key={tIdx} className="preview-task-item">
                        <p className="preview-task-topic">{task.topic}</p>
                        <p className="preview-task-note">{task.note?.substring(0, 100)}...</p>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setPreviewRoadmap(null)}>Close</button>
              <button className="btn-primary" onClick={() => handleFollowPlan(previewRoadmap._id)}>Follow This Plan</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;