import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "./Navbar.css";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();

  const isActive = (path) => location.pathname === path ? "active" : "";

  return (
    <nav className="nav-container">
      
      <Link to={user ? "/home" : "/"} className="nav-brand">
        <div className="nav-logo-cube">C</div>
        Career Planner
      </Link>

      {user ? (
        <>
          <div className="nav-links-wrapper">
            <Link to="/home" className={`nav-link-item ${isActive('/home')}`}>
              🏠 Home
            </Link>
            <Link to="/roadmap" className={`nav-link-item ${isActive('/roadmap')}`}>
              🗺️ Roadmap
            </Link>
            <Link to="/dashboard" className={`nav-link-item ${isActive('/dashboard')}`}>
              📊 Dashboard
            </Link>
            <Link to="/practice" className={`nav-link-item ${isActive('/practice')}`}>
              💻 Practice
            </Link>
            <Link to="/mock-interview" className={`nav-link-item ${isActive('/mock-interview')}`}>
              🎤 Interview
            </Link>
            <Link to="/career-guidance" className={`nav-link-item ${isActive('/career-guidance')}`}>
              🤖 Career Path
            </Link>
            {user.role === "admin" && (
              <Link to="/admin" className={`nav-link-item ${isActive('/admin')}`}>
                🛡️ Admin
              </Link>
            )}
          </div>
          
          <div className="nav-actions">
            <Link to="/profile" className={`nav-link-item ${isActive('/profile')}`} style={{ padding: '8px', borderRadius: '50%' }} title="Profile">
              👤
            </Link>
            <button className="btn-nav-logout" onClick={logout}>
              Log Out
            </button>
          </div>
        </>
      ) : (
        <div className="nav-actions">
          <Link to="/login" className="nav-link-item">Log In</Link>
          <Link to="/register" className="btn-nav-primary">Get Started</Link>
        </div>
      )}
      
    </nav>
  );
};

export default Navbar;
