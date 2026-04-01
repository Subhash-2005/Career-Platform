import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import "./Practice.css";

const Practice = () => {
  const [topic, setTopic] = useState("");
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState([]);
  const [attemptedKeys, setAttemptedKeys] = useState([]);
  const [justAttempted, setJustAttempted] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showFeedback, setShowFeedback] = useState({});

  useEffect(() => {
    loadPractice();
    loadStats();
  }, []);

  const loadPractice = async () => {
    setLoading(true);
    try {
      const res = await api.get("/practice/generate");
      setTopic(res.data.topic || "Daily Practice");
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
      // Ensure we use questionId for tracking consistently
      const keys = attempts.data.map((a) => a.questionId);
      setAttemptedKeys(keys);
    } catch (err) {
      console.error("Failed to load stats:", err.message || err);
    }
  };

  const handleAttempt = async (question, isCorrect, index) => {
    try {
      const confidence = document.getElementById(`confidence-${index}`)?.value || "medium";
      
      // Creating a stable key. Priority: AI provided ID > generated key
      const questionKey = question.id || `q-${topic.replace(/\s+/g, '-')}-${index}`;

      const payload = {
        topic: question.topic || topic || "General",
        difficulty: (question.difficulty || "medium").toLowerCase(),
        correct: isCorrect,
        confidence: confidence,
        questionId: questionKey,
        link: "" // Explicitly sending empty string to avoid backend validation errors
      };

      const res = await api.post("/attempt/submit", payload);

      if (res.status === 200 || res.data.message === "Attempt recorded") {
        setAttemptedKeys((prev) => [...prev, questionKey]);
        setJustAttempted(index);
        loadStats(); 
        setTimeout(() => setJustAttempted(null), 2000);
      }
    } catch (err) {
      // This will now catch and display specific 400 Bad Request messages
      console.log("BACKEND ERROR DETAIL:", err.response?.data); 
  console.error("Attempt save failed:", err.response?.data || err);
    }
  };

  const handleMcqSubmit = (question, index) => {
    const selected = selectedAnswers[index];
    if (!selected) return;

    const isCorrect = selected === question.answer;
    setShowFeedback(prev => ({ ...prev, [index]: true }));
    handleAttempt(question, isCorrect, index);
  };

  // Improved helper to render question text and code blocks
  const renderQuestionText = (text) => {
    if (!text) return "";
    return text.split('\n').map((line, i) => {
      // Regex to detect common code characters or indentation
      const isCodeLine = /[{};]|->|::/.test(line) || line.startsWith('  ') || line.startsWith('\t');
      return isCodeLine ? (
        <div key={i} className="code-snippet">
          <code>{line}</code>
        </div>
      ) : (
        <p key={i} className="text-line" style={{ marginBottom: '8px', fontWeight: '500' }}>
        {line}
      </p>
      );
    });
  };

  if (loading) {
    return (
      <div className="practice-container">
        <Navbar />
        <div className="practice-header skeleton-header"></div>
        <div className="problem-grid">
           {[1, 2, 3].map(i => <div key={i} className="problem-card skeleton"></div>)}
        </div>
      </div>
    );
  }

  if (!questions.length) {
    return (
      <div className="practice-container">
        <Navbar />
        <div className="empty-state">
          <span className="emoji">🧭</span>
          <h2>No practice tasks found!</h2>
          <p>Try generating new questions or verify your roadmap progress.</p>
          <button className="btn-primary" onClick={loadPractice}>↻ Generate New Questions</button>
        </div>
      </div>
    );
  }

  const currentTopicStats = stats.find((s) => s.topic === topic);

  return (
    <div className="practice-container">
      <Navbar />

      <header className="practice-header">
        <h1 className="practice-title">
          <span>🧠</span> Practice: {topic}
        </h1>

        {currentTopicStats && (
          <div className="stats-badge">
            <div className="stat-group">
              <span className="stats-label">Accuracy</span>
              <span className="stats-value">{currentTopicStats.accuracy}%</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-group">
              <span className="stats-label">Topic Attempts</span>
              <span className="stats-value">{currentTopicStats.attempts}</span>
            </div>
          </div>
        )}
      </header>

      <div className="problem-grid">
        {questions.map((q, index) => {
          const questionKey = q.id || `q-${topic.replace(/\s+/g, '-')}-${index}`;
          const isAttempted = attemptedKeys.includes(questionKey);
          const showStamp = justAttempted === index;
          const feedbackVisible = showFeedback[index] || isAttempted;
          
          // Safety fallback for difficulty
          const diff = (q.difficulty || "medium").toLowerCase();

          return (
            <div key={index} className={`problem-card ${isAttempted ? 'attempted' : ''}`}>
              {showStamp && <div className="attempted-stamp">RECORDED</div>}
              
              <div className="problem-header">
                <div className="problem-title-container">
                   <span className="q-number">{index + 1}.</span>
                   <div className="q-text">{renderQuestionText(q.question)}</div>
                </div>
                <span className={`difficulty-badge difficulty-${diff}`}>
                  {q.difficulty || "Medium"}
                </span>
              </div>

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

              {feedbackVisible && (
                <div className="explanation-box">
                  <p><strong>Expert Explanation:</strong> {q.explanation}</p>
                </div>
              )}

              <div className="form-group">
                <label className="form-label">Self-Assessed Confidence</label>
                <select id={`confidence-${index}`} className="confidence-select" disabled={isAttempted} defaultValue="medium">
                  <option value="high">High Confidence (Solved instantly)</option>
                  <option value="medium" selected>Medium Confidence (Required thought)</option>
                  <option value="low">Low Confidence (Guessed / Uncertain)</option>
                </select>
              </div>

              <div className="card-actions">
                <button
                  className="btn-primary"
                  style={{ width: "100%" }}
                  disabled={feedbackVisible || !selectedAnswers[index]}
                  onClick={() => handleMcqSubmit(q, index)}
                >
                  {isAttempted ? "Attempt Saved ✅" : "Check Answer"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Practice;