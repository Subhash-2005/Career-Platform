import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import "./Practice.css";

const Practice = () => {
  const [topic, setTopic] = useState("");
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState([]);
  const [attemptedKeys, setAttemptedKeys] = useState([]); // Use generic key (link or id)
  const [justAttempted, setJustAttempted] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showFeedback, setShowFeedback] = useState({});

  useEffect(() => {
    loadPractice();
    loadStats();
  }, []);

  const loadPractice = async () => {
    try {
      const res = await api.get("/practice/today");
      setTopic(res.data.topic || "");
      setQuestions(res.data.questions || []);
    } catch (err) {
      console.error("Practice load failed", err);
    } finally {
      setLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      const res = await api.get("/attempt/stats").catch(() => ({ data: [] }));
      setStats(res.data);

      const attempts = await api.get("/attempt/all").catch(() => ({ data: [] }));
      // Map both link and ID for tracking attempted status
      const keys = attempts.data.map((a) => a.link || a.id); 
      setAttemptedKeys(keys);
    } catch (err) {
      console.log("Failed to load stats");
    }
  };

  const handleAttempt = async (question, isCorrect, index) => {
    try {
      const confidence = document.getElementById(`confidence-${index}`)?.value || "medium";
      const key = question.link || question.id;

      const res = await api.post("/attempt/submit", {
        topic: question.topic,
        difficulty: question.difficulty || "medium",
        correct: isCorrect,
        confidence,
        link: question.link || question.id, // Fallback to id if link missing
      });

      if (res.data.message === "Attempt recorded") {
        setAttemptedKeys((prev) => prev.includes(key) ? prev : [...prev, key]);
        setJustAttempted(index);
        setTimeout(() => setJustAttempted(null), 2000);
      }

      loadStats();
    } catch (err) {
      console.error("Attempt error:", err.response?.data || err);
    }
  };

  const handleMcqSubmit = (question, index) => {
    const selected = selectedAnswers[index];
    if (!selected) return;

    const isCorrect = selected === question.answer;
    setShowFeedback(prev => ({ ...prev, [index]: true }));
    handleAttempt(question, isCorrect, index);
  };

  if (loading) {
    return (
      <div className="practice-container">
        <Navbar />
        <div className="practice-header">
           <div className="skeleton" style={{ width: 300, height: 44 }}></div>
           <div className="skeleton stats-badge" style={{ width: 200, height: 48, padding: 0 }}></div>
        </div>
        <div className="problem-grid">
           {[1, 2, 3, 4].map(i => (
             <div key={i} className="problem-card skeleton" style={{ height: 280 }}></div>
           ))}
        </div>
      </div>
    );
  }

  if (!questions.length) {
    return (
      <div className="practice-container">
        <Navbar />
        <div className="empty-state">
          <span style={{ fontSize: "56px", marginBottom: "16px" }}>🎉</span>
          <h2 style={{ marginBottom: "8px" }}>No practice tasks for today!</h2>
          <p style={{ color: "var(--text-muted)", fontSize: "16px" }}>
            You've cleared everything. Take a break or check out the roadmap.
          </p>
        </div>
      </div>
    );
  }

  const currentTopicStats = stats.find((s) => s.topic === topic);

  const getLinkLabel = (url) => {
    if (!url) return "🔗 View Resource";
    try {
      const hostname = new URL(url).hostname.replace("www.", "");
      if (hostname.includes("leetcode")) return "🔗 Solve on LeetCode";
      if (hostname.includes("aws")) return "🔗 AWS Documentation";
      if (hostname.includes("mozilla")) return "🔗 MDN Web Docs";
      if (hostname.includes("react")) return "🔗 React Docs";
      if (hostname.includes("mongodb")) return "🔗 MongoDB Docs";
      if (hostname.includes("nodejs")) return "🔗 Node.js Docs";
      if (hostname.includes("github")) return "🔗 View on GitHub";
      const domain = hostname.split('.')[0];
      return `🔗 View on ${domain.charAt(0).toUpperCase() + domain.slice(1)}`;
    } catch {
      return "🔗 View Resource";
    }
  };

  return (
    <div className="practice-container">
      <Navbar />

      <header className="practice-header">
        <h1 className="practice-title">
          <span>🧠</span> Practice: {topic}
        </h1>

        {currentTopicStats && (
          <div className="stats-badge">
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span className="stats-label">Accuracy Rate</span>
              <span className="stats-value">{currentTopicStats.accuracy}%</span>
            </div>
            <div style={{ width: "1px", height: "30px", background: "var(--border-divider)" }}></div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span className="stats-label">Total Attempts</span>
              <span className="stats-value" style={{ color: "var(--text-main)" }}>{currentTopicStats.attempts}</span>
            </div>
          </div>
        )}
      </header>

      <div className="problem-grid">
        {questions.map((q, index) => {
          const key = q.link || q.id;
          const isAttempted = attemptedKeys.includes(key);
          const showStamp = justAttempted === index;
          const isMcq = !!q.options;
          const feedbackVisible = showFeedback[index] || isAttempted;
          const isCorrect = isMcq ? (selectedAnswers[index] === q.answer || isAttempted) : true; // Simplified for UI

          return (
            <div key={key} className={`problem-card ${isAttempted ? 'attempted' : ''} ${isMcq ? 'mcq-card' : ''}`}>
              
              {showStamp && <div className="attempted-stamp">SOLVED</div>}
              
              <div className="problem-header">
                <h3 className="problem-title">
                  {index + 1}. {isMcq ? q.question : q.title}
                </h3>
                <span className={`difficulty-badge difficulty-${(q.difficulty || "medium").toLowerCase()}`}>
                  {q.difficulty || "Medium"}
                </span>
              </div>

              {isMcq ? (
                <div className="mcq-options">
                  {q.options.map((opt, i) => {
                    const isSelected = selectedAnswers[index] === opt;
                    const isCorrectOpt = opt === q.answer;
                    let optClass = "";
                    if (feedbackVisible) {
                      if (isCorrectOpt) optClass = "correct-opt";
                      else if (isSelected) optClass = "wrong-opt";
                    } else if (isSelected) {
                      optClass = "selected-opt";
                    }

                    return (
                      <button
                        key={i}
                        className={`option-btn ${optClass}`}
                        onClick={() => !feedbackVisible && setSelectedAnswers(prev => ({ ...prev, [index]: opt }))}
                        disabled={feedbackVisible}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              ) : (
                <a
                  href={q.link}
                  target="_blank"
                  rel="noreferrer"
                  className="problem-link"
                >
                  {getLinkLabel(q.link)}
                </a>
              )}

              {feedbackVisible && isMcq && (
                <div className="explanation-box">
                  <p><strong>Explanation:</strong> {q.explanation}</p>
                </div>
              )}

              <div className="form-group" style={{ marginTop: isMcq ? "16px" : "auto" }}>
                <label htmlFor={`confidence-${index}`} className="form-label">How confident were you?</label>
                <select id={`confidence-${index}`} className="confidence-select" disabled={isAttempted}>
                  <option value="high">High Confidence (Solved easily)</option>
                  <option value="medium">Medium Confidence (Took some time)</option>
                  <option value="low">Low Confidence (Needed help/hints)</option>
                </select>
              </div>

              <div className="card-actions">
                {isMcq ? (
                  <button
                    className="btn-primary"
                    style={{ width: "100%" }}
                    disabled={feedbackVisible || !selectedAnswers[index]}
                    onClick={() => handleMcqSubmit(q, index)}
                  >
                    Check Answer
                  </button>
                ) : (
                  <>
                    <button
                      className="btn-success btn-icon"
                      disabled={isAttempted}
                      onClick={() => handleAttempt(q, true, index)}
                    >
                      <span>✅</span> I Solved It
                    </button>

                    <button
                      className="btn-danger btn-icon"
                      disabled={isAttempted}
                      onClick={() => handleAttempt(q, false, index)}
                    >
                      <span>❌</span> Need Review
                    </button>
                  </>
                )}
              </div>
              
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Practice;
