import { useEffect, useState } from "react";
import api from "../services/api";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./Home.css";

const Home = () => {
  const [profile, setProfile] = useState(null);
  const [roadmapDays, setRoadmapDays] = useState([]);
  const [dashboard, setDashboard] = useState(null);
  const [roadmapProgress, setRoadmapProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [todayTask, setTodayTask] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      loadHomeData();
    } else {
      navigate("/login");
    }
  }, []);

  const loadHomeData = async () => {
    try {
      const profileRes = await api.get("/user/profile");
      setProfile(profileRes.data);

      if (!profileRes.data.targetRole) {
        navigate("/profile-setup");
        return;
      }

      const roadmapRes = await api.get("/roadmap").catch(() => ({ data: {} }));

      if (roadmapRes.data?.mode === "school") {
        navigate("/career-guidance");
        return;
      }

      if (roadmapRes.data?.roadmap?.roadmapDays) {
        setRoadmapDays(roadmapRes.data.roadmap.roadmapDays);
      }

      const dashboardRes = await api.get("/dashboard").catch(() => ({ data: null }));
      if (dashboardRes?.data) setDashboard(dashboardRes.data);

      const progressRes = await api.get("/roadmap/progress").catch(() => ({ data: null }));
      if (progressRes?.data) setRoadmapProgress(progressRes.data);

      const todayRes = await api.get("/roadmap/today").catch(() => ({ data: {} }));
      if (!todayRes.data?.message) {
        setTodayTask(todayRes.data);
      }

    } catch (err) {
      console.error("Home data fetch failed", err);
    } finally {
      setLoading(false);
    }
  };

  const markTaskDone = async (day, taskIndex) => {
    try {
      await api.post("/roadmap/complete-task", {
        day,
        taskIndex
      });
      loadHomeData();
    } catch (err) {
      console.error("Task completion failed", err);
      alert("Failed to mark task done");
    }
  };

  if (loading) {
    return (
      <div className="home-container">
        <Navbar />
        <div className="home-header">
          <div className="skeleton" style={{ width: 300, height: 44, marginBottom: 16 }}></div>
          <div className="skeleton" style={{ width: 250, height: 24 }}></div>
        </div>
        <div className="home-grid">
          <div className="home-card skeleton" style={{ height: 400 }}></div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div className="home-card skeleton" style={{ height: 180 }}></div>
            <div className="home-card skeleton" style={{ height: 180 }}></div>
          </div>
        </div>
      </div>
    );
  }

  if (profile && roadmapDays.length === 0) {
    return (
      <div className="home-container">
        <Navbar />
        <div className="error-state">
          <span style={{ fontSize: "48px", marginBottom: "16px" }}>🗺️</span>
          <h2 style={{ marginBottom: "8px" }}>Your roadmap is not generated yet</h2>
          <p style={{ color: "var(--text-muted)", marginBottom: "24px" }}>
            Please complete your profile to generate a personalized learning path.
          </p>
          <Link to="/profile-setup" className="btn-primary">
            Complete Profile
          </Link>
        </div>
      </div>
    );
  }

  const unitType =
    roadmapDays?.[0]?.label?.includes("Week")
      ? "weeks"
      : roadmapDays?.[0]?.label?.includes("Month")
      ? "months"
      : "days";

  const days = profile?.daysToCrack || 0;
  const totalUnits =
    unitType === "months"
      ? Math.ceil(days / 30)
      : unitType === "weeks"
      ? Math.ceil(days / 7)
      : days;

  const completedUnits = roadmapProgress?.completedDays || 0;
  const remainingUnits = Math.max(totalUnits - completedUnits, 0);

  return (
    <div className="home-container">
      <Navbar />

      {/* Greeting Header */}
      <header className="home-header">
        <h1 className="welcome-title">Welcome, {profile?.name} 👋</h1>
        <div className="welcome-subtitle">
          <span>Targeting</span>
          <span className="role-badge">{profile?.targetRole}</span>
          <span>•</span>
          <span><b>{remainingUnits} {unitType}</b> remaining to achieve your goal</span>
        </div>
      </header>

      <div className="home-grid">
        {/* Left Column: Today's Tasks */}
        <section className="home-card hover-lift">
          <h2 className="section-title">
            <span>📅</span> Today's Focus
          </h2>

          {todayTask ? (
            <div>
              <p style={{ fontWeight: 600, marginBottom: "16px", color: "var(--text-main)" }}>
                {todayTask.label ? todayTask.label : `Day ${todayTask.day}`}
              </p>

              <ul className="task-list">
                {todayTask.tasks?.map((task, index) => (
                  <li key={index} className="task-item">
                    <div className="task-info">
                      <div className="task-topic">
                        {task.topic}
                      </div>
                      <div className="task-meta">
                        <span className="task-type-badge">{task.type}</span>
                        {task.level && <span> • {task.level}</span>}
                      </div>
                    </div>

                    <div className="task-actions">
                      {task.completed ? (
                        <div className="completed-badge">
                          <span>✅</span> Completed
                        </div>
                      ) : (
                        <>
                          {task.type === "learning" && task.level && (
                            <Link
                              to={`/learn/${encodeURIComponent(profile.targetRole)}/${encodeURIComponent(task.topic)}/${encodeURIComponent(task.level)}`}
                              className="btn-secondary"
                            >
                              Learn
                            </Link>
                          )}
                          <button
                            className="btn-primary"
                            onClick={() => markTaskDone(todayTask.day, index)}
                          >
                            Mark Done
                          </button>
                        </>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="all-done-msg">
              <span style={{ fontSize: "40px" }}>🎉</span>
              <span>All caught up for today!</span>
              <span style={{ fontSize: "14px", color: "var(--text-muted)", fontWeight: 500 }}>
                Check out practice or review the full roadmap.
              </span>
            </div>
          )}
        </section>

        {/* Right Column: Progress & Overview */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          
          {/* Progress Card */}
          {roadmapProgress && (
            <section className="home-card hover-lift">
              <h2 className="section-title">
                <span>📈</span> Journey Progress
              </h2>
              
              <div className="mini-stat">
                <span className="mini-stat-label">Units Completed</span>
                <span className="mini-stat-value">
                  {roadmapProgress.completedDays} / {roadmapProgress.totalDays} {unitType}
                </span>
              </div>
              
              <div className="progress-bar-container" title={`${roadmapProgress.progressPercent}% Completed`}>
                <div 
                  className="progress-bar-fill" 
                  style={{ width: `${roadmapProgress.progressPercent}%` }}
                ></div>
              </div>
              <div style={{ textAlign: "right", marginTop: "8px", fontSize: "13px", color: "var(--text-muted)", fontWeight: "500" }}>
                {roadmapProgress.progressPercent}% Completed
              </div>
            </section>
          )}

          {/* Dashboard Summary Card */}
          {dashboard && (
            <section className="home-card hover-lift">
              <h2 className="section-title">
                <span>📊</span> Quick Stats
              </h2>
              
              <div className="mini-stat">
                <span className="mini-stat-label">Questions Attempted</span>
                <span className="mini-stat-value">{dashboard.attempted}</span>
              </div>
              
              <div className="mini-stat">
                <span className="mini-stat-label">Questions Solved</span>
                <span className="mini-stat-value" style={{ color: "var(--success)" }}>{dashboard.solved}</span>
              </div>
              
              <div className="mini-stat">
                <span className="mini-stat-label">Interview Score</span>
                <span className="mini-stat-value" style={{ color: "#6366f1" }}>
                  {dashboard.latestInterviewScore || 0}%
                </span>
              </div>

              <div className="mini-stat">
                <span className="mini-stat-label">Readiness Score</span>
                <span className="mini-stat-value" style={{ 
                  color: dashboard.readinessScore >= 75 ? "var(--success)" : dashboard.readinessScore >= 50 ? "var(--warning)" : "var(--error)" 
                }}>
                  {dashboard.readinessScore} / 100
                </span>
              </div>

              <div style={{ marginTop: "20px" }}>
                <Link to="/dashboard" className="btn-secondary" style={{ width: "100%", justifyContent: "center" }}>
                  View Full Dashboard
                </Link>
              </div>
            </section>
          )}

        </div>
      </div>

      {/* Quick Actions Grid */}
      <section style={{ marginTop: "12px", marginBottom: "32px" }}>
        <h2 className="section-title">
          <span>🚀</span> Quick Actions
        </h2>
        
        <div className="action-grid">
          <Link to="/practice" className="action-card">
            <div className="action-icon">💻</div>
            <div>Practice Questions</div>
          </Link>
          
          <Link to="/mock-interview" className="action-card">
            <div className="action-icon">🎙️</div>
            <div>Mock Interview</div>
          </Link>
          
          <Link to="/roadmap" className="action-card">
            <div className="action-icon">🗺️</div>
            <div>View Full Roadmap</div>
          </Link>
        </div>
      </section>

    </div>
  );
};

export default Home;