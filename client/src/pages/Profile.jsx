import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./Profile.css";

const Profile = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    educationLevel: "",
    schoolClass: "",
    targetRole: "",
    hoursPerDay: "",
    daysToCrack: ""
  });

  const [studyTime, setStudyTime] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const res = await api.get("/user/profile");

      setForm({
        educationLevel: res.data.educationLevel || "",
        schoolClass: res.data.schoolClass || "",
        targetRole: res.data.targetRole || "",
        hoursPerDay: res.data.hoursPerDay || "",
        daysToCrack: res.data.daysToCrack || ""
      });

      if (res.data.educationLevel === "school") {
        setStudyTime(res.data.hoursPerDay || "");
      }

    } catch (err) {
      console.error("Failed to load profile", err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async (e) => {
    e.preventDefault(); // Prevent form submission refresh
    setSaving(true);
    try {
      const payload = {
        ...form,
        hoursPerDay:
          form.educationLevel === "school"
            ? studyTime
            : form.hoursPerDay,

        daysToCrack:
          form.educationLevel === "school"
            ? 365
            : form.daysToCrack
      };

      await api.post("/user/profile", payload);
      await api.post("/roadmap/generate");

      // Small delay to let the user see the "saving" animation briefly
      setTimeout(() => {
        setSaving(false);
        navigate("/home");
      }, 600);

    } catch (err) {
      console.error(err);
      alert("Failed to update profile");
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="profile-container">
        <Navbar />
        <div className="profile-header">
           <div className="skeleton" style={{ width: 280, height: 44, margin: "0 auto 12px" }}></div>
           <div className="skeleton" style={{ width: 350, height: 20, margin: "0 auto" }}></div>
        </div>
        <div className="profile-card skeleton" style={{ height: 500, maxWidth: 640 }}></div>
      </div>
    );
  }

  const isSchool = form.educationLevel === "school";

  return (
    <div className="profile-container">
      <Navbar />

      <header className="profile-header">
        <h1 className="profile-title">
          <span>👤</span> Your Profile
        </h1>
        <p className="profile-subtitle">
          Update your details to automatically recalibrate your learning roadmap.
        </p>
      </header>

      <form className="profile-card" onSubmit={handleSave}>
        
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
                  value={form.schoolClass}
                  onChange={handleChange}
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

        </div>

        <button type="submit" className="btn-save" disabled={saving}>
          {saving ? (
            <span>Processing... ⏳</span>
          ) : (
            <>
              <span>💾</span> Save & Update Roadmap
            </>
          )}
        </button>

      </form>

    </div>
  );
};

export default Profile;