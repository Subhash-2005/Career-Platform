import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./Roadmap.css";

const Roadmap = () => {
  const [roadmapData, setRoadmapData] = useState(null);
  const [roadmapDays, setRoadmapDays] = useState([]);
  const [aiMessage, setAiMessage] = useState(""); 
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState("");
  

  useEffect(() => {
    loadRoadmap();
  }, []);

  const loadRoadmap = async () => {
    try {
      const res = await api.get("/roadmap").catch(() => ({ data: {} }));

      // Handle the redirect for school foundation if necessary
      if (res.data?.mode === "foundation") {
        // You can keep them on this page or navigate elsewhere
        // For now, we continue to load the roadmap data
      }

      if (res.data?.roadmap) {
        setRoadmapData(res.data.roadmap);
        setRoadmapDays(res.data.roadmap.roadmapDays || []);
        setAiMessage(res.data.roadmap.aiMessage || "");
      } else {
        setRoadmapDays([]);
      }

      const profileRes = await api.get("/user/profile").catch(() => ({ data: {} }));
      if (profileRes.data?.targetRole) {
         setRole(profileRes.data.targetRole);
      }

    } catch (err) {
      console.error("Failed to load roadmap", err);
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
      loadRoadmap();
    } catch (err) {
      console.error("Task completion failed", err);
      alert("Failed to mark task done");
    }
  };

  const totalUnits = roadmapDays.length;
  const completedUnits = roadmapDays.filter((item) => item.status === "completed").length;
  
  const unitType =
    roadmapDays[0]?.label?.includes("Week")
      ? "weeks"
      : roadmapDays[0]?.label?.includes("Month")
      ? "months"
      : "days";

  const progressPercent = totalUnits > 0 ? Math.round((completedUnits / totalUnits) * 100) : 0;
  const currentDayIndex = roadmapDays.findIndex(item => item.status !== "completed");

  if (loading) {
    return (
      <div className="roadmap-container">
        <Navbar />
        <div className="roadmap-header">
           <div className="skeleton" style={{ width: 350, height: 44, margin: "0 auto 16px" }}></div>
        </div>
        <div className="roadmap-progress-card skeleton" style={{ height: 120 }}></div>
        <div className="timeline">
           {[1, 2, 3].map(i => (
             <div key={i} className="timeline-item">
               <div className="timeline-marker"></div>
               <div className="timeline-content skeleton" style={{ height: 200, width: "100%" }}></div>
             </div>
           ))}
        </div>
      </div>
    );
  }

  return (
    <div className="roadmap-container">
      <Navbar />

      <header className="roadmap-header">
        <h1 className="roadmap-title">
          <span>🗺️</span> Your Personalized Journey
        </h1>
        {role && <p style={{ color: "var(--text-muted)", fontSize: "16px" }}>Target Role: <b style={{ color: "var(--text-main)" }}>{role}</b></p>}
      </header>

      {/* Career Guidance Banner */}
      {aiMessage && (
        <div className="ai-counselor-banner" style={{ 
          background: "linear-gradient(135deg, #f0f7ff 0%, #e0efff 100%)", 
          borderLeft: "5px solid #007bff", 
          padding: "20px", 
          borderRadius: "12px", 
          marginBottom: "25px",
          boxShadow: "0 4px 6px rgba(0,0,0,0.05)"
        }}>
          <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
            <span style={{ fontSize: "24px" }}>💡</span>
            <div>
              <h4 style={{ margin: "0 0 5px 0", color: "#0056b3" }}>Mentor's Guidance</h4>
              <p style={{ margin: 0, color: "#333", fontSize: "15px", lineHeight: "1.5" }}>{aiMessage}</p>
            </div>
          </div>
        </div>
      )}

      {/* NEW: Career Path Tree Section (Visual Graph) */}
      {roadmapData?.careerPaths && roadmapData.careerPaths.length > 0 && (
        <section className="career-tree-container" style={{ marginBottom: "40px" }}>
          <h2 style={{ fontSize: "20px", marginBottom: "20px", color: "var(--text-main)", display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>🚀</span> Potential Future Pathways
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "20px" }}>
            {roadmapData.careerPaths.map((path, idx) => (
              <div key={idx} className="path-card" style={{ background: "white", padding: "20px", borderRadius: "12px", border: "1px solid #e2e8f0", boxShadow: "0 4px 12px rgba(0,0,0,0.03)" }}>
                <h4 style={{ color: "#4f46e5", marginBottom: "8px", fontSize: "17px" }}>{path.title}</h4>
                <p style={{ fontSize: "13px", color: "#64748b", marginBottom: "16px" }}>
                  <strong>Intermediate Stream:</strong> <span style={{ color: "#1e293b" }}>{path.stream}</span>
                </p>
                
                {/* Milestone Roadmap Steps */}
                <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "16px", position: 'relative' }}>
                  {path.milestones?.map((step, sIdx) => (
                    <div key={sIdx} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#4f46e5" }}></div>
                      <span style={{ fontSize: "13px", fontWeight: "500", color: "#334155" }}>{step}</span>
                    </div>
                  ))}
                </div>

                {path.exams?.length > 0 && (
                  <div style={{ borderTop: "1px dashed #e2e8f0", paddingTop: "12px" }}>
                    <p style={{ fontSize: "11px", fontWeight: "700", color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "8px" }}>Target Entrance Exams</p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                      {path.exams.map((exam, eIdx) => (
                        <span key={eIdx} style={{ background: "#eff6ff", color: "#2563eb", padding: "4px 10px", borderRadius: "6px", fontSize: "11px", fontWeight: "600" }}>
                          {exam}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {roadmapDays.length > 0 ? (
        <>
          {/* Progress Overview */}
          <section className="roadmap-progress-card">
            <div className="progress-header">
              <span>Overall Progress</span>
              <span style={{ color: "var(--primary-hover)" }}>{progressPercent}%</span>
            </div>
            
            <div className="progress-bar-container" title={`${progressPercent}% Completed`}>
              <div 
                className="progress-bar-fill" 
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
            
            <div style={{ textAlign: "center", fontSize: "14px", color: "var(--text-muted)", fontWeight: "500", marginTop: "4px" }}>
              {completedUnits} of {totalUnits} {unitType} completed
            </div>
          </section>

          {/* Stepper / Timeline */}
          <div className="timeline">
            {roadmapDays.map((item, index) => {
              const isCompleted = item.status === "completed";
              const isCurrent = index === currentDayIndex;
              
              return (
                <div 
                  key={item.day} 
                  className={`timeline-item ${isCompleted ? 'completed' : ''} ${isCurrent ? 'current' : ''}`}
                >
                  <div className="timeline-marker"></div>
                  
                  <div className="timeline-content">
                    <div className="timeline-header">
                      <h3 className="timeline-day-title">
                        {item.label ? item.label : `Day ${item.day}`}
                        {isCompleted && <span style={{ fontSize: "16px" }}> ✅</span>}
                      </h3>
                      <span className={`timeline-status ${isCompleted ? 'completed' : ''}`}>
                        {isCompleted ? 'Completed' : isCurrent ? 'In Progress' : 'Pending'}
                      </span>
                    </div>

                    <ul className="task-list">
                      {item.tasks?.map((task, taskIdx) => (
                        <li key={taskIdx} className={`task-card ${task.completed ? 'completed' : ''}`}>
                          <div className="task-info">
                            <div className="task-topic">
                              {task.completed ? <span style={{ opacity: 0.6 }}>✔️</span> : <span>📌</span>}
                              <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                                {task.topic}
                              </span>
                              {task.note && (
                                <div className="task-note" style={{ fontSize: "14px", color: "#444", marginTop: "8px", lineHeight: "1.6" }}>
                                  {task.note}
                                </div>
                              )}
                              
                              {task.concepts && task.concepts.length > 0 && (
                                <div style={{ marginTop: "12px", display: "flex", flexWrap: "wrap", gap: "8px" }}>
                                  {task.concepts.map((concept, cIdx) => (
                                    <span key={cIdx} style={{ 
                                      fontSize: "11px", 
                                      background: "#f1f5f9", 
                                      padding: "3px 8px", 
                                      borderRadius: "4px",
                                      color: "#475569",
                                      border: "1px solid #e2e8f0"
                                    }}>
                                      #{concept}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
                            <div className="task-meta">
                              <span className={`badge badge-type badge-${task.type.replace(/\s+/g, '-')}`}>{task.type}</span>
                              {task.level && (
                                <span className={`badge badge-level ${task.level.toLowerCase()}`}>
                                  {task.level}
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="task-actions">
                            {task.completed ? (
                              <span style={{ color: "var(--success)", fontWeight: 600, fontSize: "14px", padding: "8px 16px" }}>
                                Done
                              </span>
                            ) : (
                              <>
                                {task.type === "learning" && task.level && (
                                  <Link
                                    to={`/learn/${encodeURIComponent(role)}/${encodeURIComponent(task.topic)}/${encodeURIComponent(task.level)}`}
                                    className="btn-secondary"
                                  >
                                    Learn
                                  </Link>
                                )}
                                
                                <button
                                  className="btn-primary"
                                  disabled={task.completed}
                                  onClick={() => markTaskDone(item.day, taskIdx)}
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
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <div className="empty-state">
          <span style={{ fontSize: "48px", marginBottom: "16px" }}>🧭</span>
          <h2 style={{ marginBottom: "8px" }}>No Roadmap Found</h2>
          <p style={{ color: "var(--text-muted)", marginBottom: "24px" }}>
            You haven't generated your personalized learning path yet.
          </p>
          <Link to="/profile-setup" className="btn-primary">
            Set Up Your Profile
          </Link>
        </div>
      )}
    </div>
  );
};

export default Roadmap;