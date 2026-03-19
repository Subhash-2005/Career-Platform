import { useEffect, useState } from "react";
import api from "../services/api";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./Roadmap.css";

const Roadmap = () => {
  const [roadmap, setRoadmap] = useState([]);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState("");
  
  const navigate = useNavigate();

  useEffect(() => {
    loadRoadmap();
  }, []);

  const loadRoadmap = async () => {
    try {
      const res = await api.get("/roadmap").catch(() => ({ data: {} }));

      if (res.data?.mode === "school") {
        navigate("/career-guidance");
        return;
      }

      if (res.data?.roadmap?.roadmapDays) {
        setRoadmap(res.data.roadmap.roadmapDays);
      } else {
        setRoadmap([]);
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

  const totalUnits = roadmap.length;
  const completedUnits = roadmap.filter((item) => item.status === "completed").length;
  
  const unitType =
    roadmap[0]?.label?.includes("Week")
      ? "weeks"
      : roadmap[0]?.label?.includes("Month")
      ? "months"
      : "days";

  const progressPercent = totalUnits > 0 ? Math.round((completedUnits / totalUnits) * 100) : 0;

  // Determine which item is currently "active"/next to do
  const currentDayIndex = roadmap.findIndex(item => item.status !== "completed");

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

      {roadmap.length > 0 ? (
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
            {roadmap.map((item, index) => {
              
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
                        {isCompleted && <span style={{ fontSize: "16px" }}>✅</span>}
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
                                <div className="task-note" style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "4px", fontStyle: "italic" }}>
                                  {task.note}
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