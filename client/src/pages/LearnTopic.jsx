import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Navbar";
import "./LearnTopic.css";

const LearnTopic = () => {
  const { role, topic, level } = useParams();
  const navigate = useNavigate();

  const decodedRole = decodeURIComponent(role);
  const decodedTopic = decodeURIComponent(topic);
  const decodedLevel = decodeURIComponent(level);

  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadContent();
  }, [role, topic, level]);

  const loadContent = async () => {
    try {
      const res = await api.get(
        `/learn/${decodedRole}/${decodedTopic}/${decodedLevel}`
      );
      setContent(res.data);
    } catch (err) {
      console.error("Failed to load topic", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="learn-container">
        <Navbar />
        <div className="learn-hero" style={{ paddingBottom: 100 }}>
          <div className="skeleton" style={{ width: 120, height: 32, borderRadius: 20, marginBottom: 24 }}></div><br/>
          <div className="skeleton" style={{ width: '80%', maxWidth: 600, height: 64, marginBottom: 24 }}></div><br/>
          <div className="skeleton" style={{ width: '90%', maxWidth: 700, height: 24, marginBottom: 8 }}></div><br/>
          <div className="skeleton" style={{ width: '60%', maxWidth: 400, height: 24 }}></div>
        </div>
        <div className="learn-content-grid">
           <div className="skeleton" style={{ width: '100%', height: 200, borderRadius: 20 }}></div>
           <div className="skeleton" style={{ width: '100%', height: 200, borderRadius: 20 }}></div>
        </div>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="learn-container">
        <Navbar />
        <div className="learn-hero" style={{ height: "60vh", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <span style={{ fontSize: "64px", marginBottom: "24px" }}>😕</span>
          <h2 style={{ fontSize: "36px", marginBottom: "16px" }}>Topic not found</h2>
          <p style={{ color: "var(--text-muted)", fontSize: "18px" }}>We couldn't load the study material for this topic.</p>
          <div style={{ marginTop: "32px" }}>
            <button 
              onClick={() => navigate("/roadmap")} 
              style={{ 
                padding: "16px 32px", borderRadius: "14px", fontSize: "16px",
                border: "none", background: "var(--primary-gradient)", color: "white", 
                fontWeight: 600, cursor: "pointer", boxShadow: "0 8px 20px rgba(79,70,229,0.3)"
              }}
            >
              Back to Roadmap
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="learn-container">
      <Navbar />

      {/* Hero Section */}
      <section className="learn-hero">
        <div className="hero-glow"></div>
        <div className="hero-content">
          <div className="topic-badge">
            <div className="badge-dot"></div>
            {content.level} Level
          </div>
          <h1 className="learn-topic-title">{content.topic}</h1>
          <p className="explanation-text">{content.explanation}</p>
        </div>
      </section>

      {/* Main Content Grid */}
      <div className="learn-content-grid">
        
        {/* Key Ideas */}
        {content.keyIdeas && content.keyIdeas.length > 0 && (
          <section>
            <div className="section-header">
              <div className="section-icon-bg"><span role="img" aria-label="lightbulb">💡</span></div>
              <h2 className="section-title">Core Concepts</h2>
            </div>
            <div className="ideas-grid">
              {content.keyIdeas.map((idea, i) => (
                <div key={i} className="idea-card">
                  <div className="idea-icon">✦</div>
                  <div className="idea-text">{idea}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Patterns */}
        {content.patterns && content.patterns.length > 0 && (
          <section>
            <div className="section-header">
              <div className="section-icon-bg"><span role="img" aria-label="puzzle">🧩</span></div>
              <h2 className="section-title">Recognize Patterns</h2>
            </div>
            <div className="patterns-container">
              {content.patterns.map((p, i) => (
                <div key={i} className="pattern-tag" style={{ animationDelay: `${i * 0.1}s` }}>
                  <span>🎯</span> {p}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Example Block */}
        {content.example && (
          <section>
            <div className="section-header">
              <div className="section-icon-bg"><span role="img" aria-label="code">💻</span></div>
              <h2 className="section-title">In Practice</h2>
            </div>
            <div className="example-block">
              <div className="example-dots">
                <div className="example-dot dot-r"></div>
                <div className="example-dot dot-y"></div>
                <div className="example-dot dot-g"></div>
              </div>
              <pre className="example-text">{content.example}</pre>
            </div>
          </section>
        )}

        {/* Interview Tips */}
        {content.tips && content.tips.length > 0 && (
          <section>
             <div className="section-header">
              <div className="section-icon-bg"><span role="img" aria-label="mic">🎙️</span></div>
              <h2 className="section-title">Interview Tips</h2>
            </div>
            <div className="tips-container">
              {content.tips.map((tip, i) => (
                <div key={i} className="tip-card">
                  <div className="tip-icon">✅</div>
                  <div>{tip}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Practices */}
        {content.problems && content.problems.length > 0 && (
          <section>
            <div className="section-header">
              <div className="section-icon-bg"><span role="img" aria-label="target">🎯</span></div>
              <h2 className="section-title">Put It to the Test</h2>
            </div>
            <div className="problems-grid">
              {content.problems.map((p, i) => (
                <a 
                  key={i} 
                  href={p.link} 
                  target="_blank" 
                  rel="noreferrer"
                  className="problem-card"
                >
                  <div className="prob-title">{p.title}</div>
                  <div className="prob-meta">
                    <span className="prob-link-text">Solve Challenge <span style={{fontSize:'12px'}}>↗</span></span>
                    <span className="prob-diff">{p.difficulty}</span>
                  </div>
                </a>
              ))}
            </div>
          </section>
        )}

      </div>
    </div>
  );
};

export default LearnTopic;