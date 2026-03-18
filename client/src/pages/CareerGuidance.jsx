import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import "./CareerGuidance.css";

const CareerGuidance = () => {
  const [guidance, setGuidance] = useState(null);
  const [currentPath, setCurrentPath] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selecting, setSelecting] = useState(false);
  
  const navigate = useNavigate();

  useEffect(() => {
    loadGuidance();
  }, []);

  const loadGuidance = async () => {
    try {
      const res = await api.get("/roadmap");
      if (res.data.mode === "school" || res.data.mode === "foundation") {
        setGuidance(res.data.guidance);
        if (res.data.currentPath) {
          setCurrentPath(res.data.currentPath);
        }
      } else {
        // If not school mode, maybe redirect or show a different state
        setGuidance(null);
      }
    } catch (err) {
      console.error("Failed to load career guidance", err);
    } finally {
      setLoading(false);
    }
  };

  const selectPath = async (pathTitle) => {
    try {
      setSelecting(true);
      await api.post("/user/school-path", {
        selectedPath: pathTitle
      });

      await api.post("/roadmap/generate");
      navigate("/home");
      
    } catch (err) {
      console.error("Path selection failed", err);
      setSelecting(false);
    }
  };


  if (loading) {
    return (
      <div className="guidance-container">
        <Navbar />
        <div className="guidance-content">
           <div className="guidance-header">
              <div className="skeleton" style={{ width: 80, height: 80, borderRadius: '50%', marginBottom: 24 }}></div>
              <div className="skeleton" style={{ width: 300, height: 48, marginBottom: 16 }}></div><br/>
              <div className="skeleton" style={{ width: '80%', height: 24, margin: '0 auto' }}></div>
           </div>
           <div className="skeleton" style={{ width: '100%', height: 400, borderRadius: 24 }}></div>
        </div>
      </div>
    );
  }

  if (!guidance) {
    return (
      <div className="guidance-container">
        <Navbar />
        <div className="guidance-content">
          <div className="empty-state">
            <div className="glow-icon">🎓</div>
            <h2>No Guidance Blueprint Found</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: 24 }}>
              Career guidance is currently optimized for School students exploring paths. Update your profile to School mode to view Career Paths.
            </p>
            <button 
              onClick={() => navigate('/profile')}
              className="btn-select-path" 
              style={{ maxWidth: 200, margin: '0 auto' }}
            >
              Update Profile
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="guidance-container">
      <Navbar />

      <div className="guidance-content">
        
        <div className="guidance-header">
          <div className="glow-icon">🤖</div>
          <h1 className="guidance-title">Your Custom Career Blueprint</h1>
          <p className="guidance-desc">
            Based on your goal to become a <b>{guidance.goal}</b>, our recommendation engine has analyzed the industry and generated the optimal paths for you to take.
          </p>
        </div>

        <div className="ai-response-block">
          
          <div className="ai-avatar">✨</div>
          <div className="ai-intro">
            {guidance.description} 
            <br /><br />
            Here are the recommended roadmaps tailored to your current educational level. Select the one that best fits your learning style below:
          </div>

          {guidance.paths.length === 0 ? (
            <div className="empty-state" style={{ background: 'transparent', padding: '20px 0', border: 'none' }}>
              <p>Specialized career paths are currently being generated and will be available soon.</p>
            </div>
          ) : (
            <div className="paths-grid">
              {guidance.paths.map((path, index) => {
                const isSelected = currentPath === path.title;
                return (
                  <div key={index} className="path-card" style={isSelected ? { borderColor: 'var(--success)', boxShadow: '0 8px 32px rgba(16, 185, 129, 0.2)' } : {}}>
                    <h3 className="path-title">
                      {path.title} {isSelected && <span style={{ color: 'var(--success)', fontSize: '18px' }}>✅</span>}
                    </h3>
                    <ul className="path-steps">
                      {path.steps.map((step, i) => (
                        <li key={i}>{step}</li>
                      ))}
                    </ul>
                    <button 
                      className="btn-select-path" 
                      onClick={() => selectPath(path.title)}
                      disabled={selecting || isSelected}
                      style={isSelected ? { background: 'var(--success-bg, rgba(16, 185, 129, 0.1))', color: 'var(--success)', borderColor: 'var(--success)', cursor: 'default' } : {}}
                    >
                      {isSelected ? "Current Active Path" : (selecting ? "Generating..." : "Select This Path →")}
                    </button>
                  </div>
                );
              })}
            </div>
          )}

        </div>

      </div>
    </div>
  );
};

export default CareerGuidance;
