import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import "./MockInterview.css";

const MockInterview = () => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    startInterview();
  }, []);

  const startInterview = async () => {
    try {
      const res = await api.get("/mock-interview/start");
      setQuestions(res.data.questions);

      // initialize answers
      setAnswers(
        res.data.questions.map(q => ({
          questionId: q._id,
          category: q.category || "coding",
          userAnswer: ""
        }))
      );
    } catch (err) {
      console.error("Failed to fetch mock interview questions");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (index, value) => {
    const updated = [...answers];
    updated[index].userAnswer = value;
    setAnswers(updated);
  };

  const submitInterview = async () => {
    try {
      setSubmitting(true);
      const res = await api.post("/mock-interview/submit", {
        answers
      });
      setResult(res.data.interview);
    } catch (err) {
      console.error("Failed to submit interview validation");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="interview-container">
        <Navbar />
        <div className="interview-content">
           <div className="interview-header">
              <div className="skeleton" style={{ width: 80, height: 80, borderRadius: '50%', marginBottom: 24 }}></div>
              <div className="skeleton" style={{ width: 400, height: 48, marginBottom: 16 }}></div>
           </div>
           {[1, 2, 3].map(i => (
             <div key={i} className="skeleton" style={{ width: '100%', height: 250, borderRadius: 24, marginBottom: 32 }}></div>
           ))}
        </div>
      </div>
    );
  }

  // --- RESULTS VIEW ---
  if (result) {
    return (
      <div className="interview-container">
        <Navbar />
        <div className="interview-content">
          <div className="results-card">
            
            <h2 className="interview-title" style={{ textAlign: "center", marginBottom: 40 }}>
              Interview Results
            </h2>

            <div className="score-circle">
              <span className="score-num">{result.totalScore}</span>
              <span className="score-label">Total Score</span>
            </div>

            <div className="feedback-section">
              <div className="feedback-box box-success">
                <h4>✅ Key Strengths</h4>
                {result.strengths.length > 0 ? (
                  <ul className="feedback-list">
                    {result.strengths.map((s, i) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ul>
                ) : (
                  <p style={{ color: "var(--text-muted)", fontSize: 14 }}>No clear strengths identified in this session.</p>
                )}
              </div>

              <div className="feedback-box box-warning">
                <h4>⚠️ Areas for Improvement</h4>
                {result.weaknesses.length > 0 ? (
                  <ul className="feedback-list">
                    {result.weaknesses.map((w, i) => (
                      <li key={i}>{w}</li>
                    ))}
                  </ul>
                ) : (
                  <p style={{ color: "var(--text-muted)", fontSize: 14 }}>Excellent! No major weaknesses identified.</p>
                )}
              </div>
            </div>

            <div style={{ textAlign: "center", marginTop: 48 }}>
               <button className="btn-submit" onClick={() => navigate("/home")}>
                 Return to Dashboard
               </button>
            </div>

          </div>
        </div>
      </div>
    );
  }

  // --- INTERVIEW VIEW ---
  return (
    <div className="interview-container">
      <Navbar />
      
      <div className="interview-content">
        <div className="interview-header">
          <div className="interview-icon">🎤</div>
          <h2 className="interview-title">Mock Interview Session</h2>
          <p className="interview-desc">
            Answer the following questions to the best of your ability. The system will evaluate your responses for technical accuracy and communication.
          </p>
        </div>

        {questions.length === 0 ? (
          <div className="empty-state">
             <p>No interview questions available right now.</p>
          </div>
        ) : (
          <>
            {questions.map((q, index) => (
              <div key={index} className="question-card">
                <div className="q-header">
                  <div className="q-number">{index + 1}</div>
                  <h4 className="q-title">{q.title}</h4>
                </div>

                <textarea
                  className="answer-input"
                  placeholder="Type your comprehensive answer here..."
                  value={answers[index]?.userAnswer}
                  onChange={e => handleChange(index, e.target.value)}
                />
              </div>
            ))}

            <div className="submit-block">
              <button 
                className="btn-submit" 
                onClick={submitInterview}
                disabled={submitting}
              >
                {submitting ? "Analyzing Responses..." : "Submit Interview"} <span>→</span>
              </button>
            </div>
          </>
        )}

      </div>
    </div>
  );
};

export default MockInterview;
