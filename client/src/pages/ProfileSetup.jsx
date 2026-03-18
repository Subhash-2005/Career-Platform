import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./Profile.css"; // Reuse Profile.css for consistent design

const ProfileSetup = () => {
  const navigate = useNavigate();
  const [schoolClass, setSchoolClass] = useState("");
  const [studyTime, setStudyTime] = useState("");
  const [saving, setSaving] = useState(false);
  
  const [form, setForm] = useState({
    age: "",
    educationLevel: "",
    targetRole: "",
    hoursPerDay: "",
    daysToCrack: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      // 1. Save Profile
      await api.post("/user/profile", {
        ...form,
        schoolClass,
        hoursPerDay: form.educationLevel === "school" ? studyTime : form.hoursPerDay,
        daysToCrack: form.educationLevel === "school" ? 365 : form.daysToCrack
      });

      // 2. Generate roadmap
      await api.post("/roadmap/generate");

      // 3. Navigate home
      setTimeout(() => {
        setSaving(false);
        navigate("/home");
      }, 600);
      
    } catch (err) {
      console.error(err);
      alert("Profile setup failed. Please try again.");
      setSaving(false);
    }
  };

  const isSchool = form.educationLevel === "school";

  return (
    <div className="profile-container">
      <Navbar />

      <header className="profile-header">
        <h1 className="profile-title">
          <span>🚀</span> Complete Your Profile
        </h1>
        <p className="profile-subtitle">
          Let's tailor your personalized learning roadmap precisely to your goals and schedule.
        </p>
      </header>

      <form className="profile-card" onSubmit={handleSubmit}>
        
        <div className="form-grid">
          
          <div className="form-group full-width">
            <label>Target Role (Goal)</label>
            <input
              className="form-control"
              name="targetRole"
              placeholder="e.g. Software Engineer, Data Scientist"
              value={form.targetRole}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Age</label>
            <input
              className="form-control"
              type="number"
              min="1"
              name="age"
              placeholder="Your age"
              value={form.age}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Education Level</label>
            <select
              className="form-control"
              name="educationLevel"
              value={form.educationLevel}
              onChange={handleChange}
              required
            >
              <option value="" disabled>Select your level</option>
              <option value="school">School Student</option>
              <option value="college">College Student</option>
              <option value="professional">Working Professional</option>
            </select>
          </div>

          {/* Conditional based on Education Level */}
          {isSchool ? (
            <>
              <div className="form-group">
                <label>School Class</label>
                <select
                  className="form-control"
                  name="schoolClass"
                  value={schoolClass}
                  onChange={(e) => setSchoolClass(e.target.value)}
                  required
                >
                  <option value="" disabled>Select Class</option>
                  {[6, 7, 8, 9, 10, 11, 12].map(c => (
                    <option key={c} value={c}>Class {c}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Daily Study Time</label>
                <select
                  className="form-control"
                  value={studyTime}
                  onChange={(e) => setStudyTime(e.target.value)}
                  required
                >
                  <option value="" disabled>Select Time</option>
                  <option value="0.5">30 minutes / day</option>
                  <option value="1">1 hour / day</option>
                  <option value="2">2 hours / day</option>
                </select>
              </div>
            </>
          ) : (
            <>
              {form.educationLevel && (
                <>
                  <div className="form-group">
                    <label>Hours Per Day Dedicated</label>
                    <input
                      className="form-control"
                      type="number"
                      step="0.5"
                      min="0.5"
                      max="16"
                      name="hoursPerDay"
                      placeholder="e.g. 2.5"
                      value={form.hoursPerDay}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Days Left to Crack Goal</label>
                    <input
                      className="form-control"
                      type="number"
                      min="1"
                      name="daysToCrack"
                      placeholder="e.g. 180"
                      value={form.daysToCrack}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </>
              )}
            </>
          )}

        </div>

        <button type="submit" className="btn-save" disabled={saving || !form.educationLevel}>
          {saving ? (
            <span>Processing... ⏳</span>
          ) : (
            <>
              <span>✨</span> Generate My Roadmap
            </>
          )}
        </button>

      </form>

    </div>
  );
};

export default ProfileSetup;
