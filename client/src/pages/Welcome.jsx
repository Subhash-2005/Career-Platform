import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./Welcome.css";

const Welcome = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      if(user.role === "admin"){
        navigate("/admin");
      }else{
        navigate("/home");
      }
    }
  }, [user, navigate]);

  return (
    <div className="welcome-container">
      
      {/* Navigation */}
      <nav className="welcome-nav">
        <Link to="/" className="welcome-logo">
          <div className="logo-cube">C</div>
          Career Planner
        </Link>
        <div className="nav-links">
          <a href="#features" className="nav-link">Features</a>
          <a href="#how-it-works" className="nav-link">How it Works</a>
        </div>
        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <Link to="/login" className="btn-login">Log in</Link>
          <Link to="/register" className="btn-signup">Get Started</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-pill">
          <span>✨</span> Next-Generation Learning Engine
        </div>
        
        <h1 className="hero-title">
          Master any role with <br />
          <span className="title-gradient">data-driven precision.</span>
        </h1>
        
        <p className="hero-subtitle">
          Stop guessing what to study. Our intelligent engine generates dynamic, personalized roadmaps, custom practice questions, and mock interviews tailored exactly to your timeline and target career.
        </p>

        <div className="hero-cta">
          <Link to="/register" className="btn-large btn-primary-large">
            Start Preparing Free
          </Link>
          <a href="#features" className="btn-large btn-secondary-large">
            Explore Features
          </a>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="features-section">
        <div className="section-header">
          <h2 className="section-title">Everything you need to succeed</h2>
          <p className="section-subtitle">A complete ecosystem designed to optimize every second of your preparation time.</p>
        </div>

        <div className="features-grid">
          
          <div className="feature-card">
            <div className="feature-icon">🗺️</div>
            <h3 className="feature-title">Dynamic Roadmaps</h3>
            <p className="feature-desc">
              Whether you have 30 days or 6 months, the platform builds a day-by-day plan of exactly what topics to study, adjusting dynamically as you progress.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">💻</div>
            <h3 className="feature-title">Targeted Practice</h3>
            <p className="feature-desc">
              Get customized, LeetCode-style questions generated for the exact topic you are learning today, complete with detailed explanations.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🎙️</div>
            <h3 className="feature-title">Mock Interviews</h3>
            <p className="feature-desc">
              Simulate high-pressure technical interviews. Let the intelligent scoring evaluate your answers, find your weak spots, and improve your delivery.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3 className="feature-title">Readiness Analytics</h3>
            <p className="feature-desc">
              Watch your readiness score grow in real-time. Identify exactly which concepts are holding you back before the actual interview.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🧠</div>
            <h3 className="feature-title">Any Role, Any Level</h3>
            <p className="feature-desc">
              From school students exploring tech, to professionals preparing for Senior Engineering roles. The platform adapts to your unique context.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3 className="feature-title">High-ROI Focus</h3>
            <p className="feature-desc">
              No more studying irrelevant material. The engine strictly prioritizes patterns and concepts that offer the highest return on your time.
            </p>
          </div>

        </div>
      </section>

      <footer className="welcome-footer">
        <div className="footer-text">
          © {new Date().getFullYear()} Career Platform
        </div>
        <div className="footer-links" style={{ display: 'flex', gap: '24px' }}>
          <a href="#" className="nav-link">Privacy</a>
          <a href="#" className="nav-link">Terms</a>
          <a href="#" className="nav-link">Contact</a>
        </div>
      </footer>

    </div>
  );
};

export default Welcome;
