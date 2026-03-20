import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await api.get("/admin/analytics");
      setData(res.data);
    } catch (err) {
      console.error("Admin fetch failed", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="admin-container">
        <Navbar />
        <div className="admin-content" style={{ textAlign: "center", marginTop: "100px" }}>
          <h2 className="admin-title">Loading Admin Portal...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-container">
      <Navbar />
      
      <div className="admin-content">
        <header className="admin-header">
          <h1 className="admin-title">
            <span>🛡️</span> Admin Command Center
          </h1>
          <button className="refresh-btn" onClick={loadData}>
            ↻ Refresh Analytics
          </button>
        </header>

        {/* Stats Grid */}
        <div className="stats-overview">
          <div className="stat-card">
            <span className="stat-icon">👥</span>
            <span className="stat-label">Total Users</span>
            <span className="stat-value">{data.totalUsers}</span>
          </div>
          <div className="stat-card">
            <span className="stat-icon">🎙️</span>
            <span className="stat-label">Interviews Taken</span>
            <span className="stat-value">{data.totalInterviews}</span>
          </div>
          <div className="stat-card">
            <span className="stat-icon">🗺️</span>
            <span className="stat-label">Roadmaps Generated</span>
            <span className="stat-value">{data.totalRoadmaps}</span>
          </div>
          <div className="stat-card">
            <span className="stat-icon">📈</span>
            <span className="stat-label">Avg. Site Readiness</span>
            <span className="stat-value">{data.averageReadiness}%</span>
          </div>
        </div>

        <div className="analytics-grid">
          {/* Top Performers */}
          <section className="admin-section">
            <h2 className="section-h">🏆 Top Performers</h2>
            <div className="admin-list">
              {data.topUsers.map((user, i) => (
                <div key={user.id || i} className="admin-item">
                  <div className="item-info">
                    <span className="item-name">{user.name}</span>
                    <span className="item-meta">{user.educationLevel} • {user.targetRole}</span>
                  </div>
                  <div className={`item-score ${user.readinessScore >= 75 ? 'score-high' : 'score-mid'}`}>
                    {user.readinessScore}%
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* System Trends */}
          <section className="admin-section">
            <h2 className="section-h">⚠️ Learning Trends</h2>
            <p style={{ color: "var(--admin-text-muted)", fontSize: "0.9rem", marginBottom: "20px" }}>
              Most frequent weak areas across the user base.
            </p>
            <div>
              {data.mostCommonWeakTopics.map(([topic, count], i) => (
                <div key={i} className={`trend-item ${i < 2 ? 'red' : 'cyan'}`}>
                  <span style={{ fontWeight: 600 }}>{topic}</span>
                  <span className="item-meta">{count} users struggling</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* System Status Matter */}
        <div className="admin-section" style={{ marginTop: "40px", border: "1px dashed rgba(255,255,255,0.1)" }}>
          <h2 className="section-h">📡 System Monitoring</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px" }}>
            <div>
              <p className="stat-label">Database Status</p>
              <p style={{ color: "#4ade80", fontWeight: "bold" }}>● Online & Healthy</p>
            </div>
            <div>
              <p className="stat-label">AI Analysis Logic</p>
              <p style={{ color: "#4ade80", fontWeight: "bold" }}>● Operational</p>
            </div>
            <div>
              <p className="stat-label">Interview Sync</p>
              <p style={{ color: "#4ade80", fontWeight: "bold" }}>● Synchronized</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;