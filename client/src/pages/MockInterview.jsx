import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import "./MockInterview.css";

const MockInterview = () => {
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(true);
  const [isFinishing, setIsFinishing] = useState(false);
  const [finalReport, setFinalReport] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchNextQuestion();
  }, []);

  const fetchNextQuestion = async () => {
    setLoading(true);
    setAnswer("");
    try {
      // Added ?reset=true only if you want to force start from Q1 every time you enter
      const res = await api.get("/mock-interview/next-question");
      
      if (res.data.status === "completed") {
        setIsFinishing(true);
        generateFinalAnalysis();
      } else {
        setCurrentQuestion(res.data);
      }
    } catch (err) {
      console.error("Error fetching question:", err);
    } finally {
      setLoading(false);
    }
  };

  const submitAnswer = async () => {
    if (!answer.trim()) return;
    setLoading(true); // Show loading while processing and fetching next
    try {
      // 1. Submit answer (backend saves it silently)
      await api.post("/mock-interview/submit-answer", { answer });
      
      // 2. Immediately trigger next question for "Fast Flow"
      const res = await api.get("/mock-interview/next-question");
      
      if (res.data.status === "completed") {
        setIsFinishing(true);
        generateFinalAnalysis();
      } else {
        setCurrentQuestion(res.data);
        setAnswer("");
      }
    } catch (err) {
      console.error("Submission error:", err);
      alert("Submission failed. Check your connection.");
    } finally {
      setLoading(false);
    }
  };

  const generateFinalAnalysis = async () => {
    try {
      const res = await api.get("/mock-interview/final-analysis");
      setFinalReport(res.data.analysis);
    } catch (err) {
      console.error("Final analysis failed", err);
    }
  };

  if (loading && !isFinishing && !currentQuestion) {
    return <div className="loading-screen">🤖 Preparing your technical assessment...</div>;
  }

  // --- RESULT SCREEN ---
  if (isFinishing && finalReport) {
    return (
      <div className="interview-container">
        <Navbar />
        <div className="report-card">
          <div className="report-header">
            <h2>Interview Summary</h2>
            <div className="score-badge">{finalReport.totalScore}%</div>
          </div>
          
          <div className="mentor-box">
            <h4>💡 Senior Mentor's Feedback</h4>
            <p>{finalReport.mentorTips}</p>
          </div>

          <div className="analysis-grid">
            <div className="analysis-item">
              <strong>✅ Key Strengths</strong>
              <ul>
                {finalReport.strengths?.map((s, i) => <li key={i}>{s}</li>)}
              </ul>
            </div>
            <div className="analysis-item">
              <strong>🚩 Areas to Improve</strong>
              <ul>
                {finalReport.weaknesses?.map((w, i) => <li key={i}>{w}</li>)}
              </ul>
            </div>
          </div>

          <button className="btn-finish" onClick={() => navigate("/roadmap")}>
            Back to Roadmap
          </button>
        </div>
      </div>
    );
  }

  // --- INTERVIEW FLOW SCREEN ---
  return (
    <div className="interview-container">
      <Navbar />
      <div className="interview-main">
        {currentQuestion && (
          <div className="interview-card">
            <div className="interview-header">
              <span className="step-tag">Step {currentQuestion.step} / 10</span>
              <span className="category-tag">{currentQuestion.category}</span>
            </div>

            <h2 className="question-text">{currentQuestion.question}</h2>
            
            <div className="interviewer-tip">
              <span className="tip-icon">💡</span>
              <p>{currentQuestion.tip}</p>
            </div>

            <textarea
              className="answer-textarea-pro"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Provide a detailed technical explanation here..."
              autoFocus
            />

            <div className="action-bar">
              <p className="char-count">{answer.length} characters</p>
              <button 
                className="btn-next-step" 
                onClick={submitAnswer}
                disabled={loading || answer.length < 10}
              >
                {loading ? "Processing..." : "Submit & Next Question →"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MockInterview;