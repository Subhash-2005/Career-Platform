import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import "./MockInterview.css";

const MockInterview = () => {
  const [questions, setQuestions] = useState([]);
  const [currentStep, setCurrentStep] = useState(0); // 0: Start, 1-4: Questions, 5: Result
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const res = await api.get("/mock-interview/start");
      setQuestions(res.data.questions);
    } catch (err) {
      console.error("Failed to fetch questions", err);
    } finally {
      setLoading(false);
    }
  };

  const currentQuestion = questions[currentStep];

  const handleAnswerChange = (val) => {
    setAnswers({ ...answers, [currentQuestion.id]: val });
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      submitInterview();
    }
  };

  const submitInterview = async () => {
    try {
      setSubmitting(true);
      // Format answers for API
      const formattedAnswers = questions.map(q => ({
        id: q.id,
        category: q.category,
        userAnswer: answers[q.id] || ""
      }));

      const res = await api.post("/mock-interview/submit", { answers: formattedAnswers });
      setResult(res.data.interview);
      setCurrentStep(questions.length); // Transition to result state
    } catch (err) {
      console.error("Submission failed", err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="interview-container">
        <Navbar />
        <div className="interview-content" style={{ textAlign: "center", marginTop: "100px" }}>
          <div className="interviewer-avatar">🤖</div>
          <h2>Preparing your customized interview...</h2>
        </div>
      </div>
    );
  }

  if (questions.length === 0 && !result) {
    return (
      <div className="interview-container">
        <Navbar />
        <div className="interview-content" style={{ textAlign: "center", marginTop: "100px" }}>
          <div className="interviewer-avatar">⚠️</div>
          <h2>No questions found.</h2>
          <p>Please try again later or contact support.</p>
          <button className="btn-nav btn-primary" onClick={() => navigate("/home")} style={{ margin: "20px auto" }}>
            Return Home
          </button>
        </div>
      </div>
    );
  }

  // --- RESULT VIEW ---
  if (result) {
    return (
      <div className="interview-container">
        <Navbar />
        <div className="interview-content">
          <div className="results-container">
            <h2 style={{ textAlign: "center", marginBottom: "40px", fontSize: "32px" }}>Interview Performance Report</h2>
            
            <div className="dashboard-grid">
              <div className="score-panel">
                <div className="radial-meter" style={{ "--score": result.totalScore }}>
                  <div className="score-display">
                    <span className="score-number">{result.totalScore}</span>
                    <span className="score-percent">READINESS %</span>
                  </div>
                </div>
                <p style={{ color: "#94a3b8", marginTop: "20px" }}>Overall Match to Industry Standards</p>
              </div>

              <div className="analysis-panel">
                <div className="insight-card strength">
                  <h4>✅ Key Strengths</h4>
                  <ul className="insight-list">
                    {result.strengths.length > 0 ? result.strengths.map((s, i) => (
                      <li key={i}>{s.charAt(0).toUpperCase() + s.slice(1)} Knowledge</li>
                    )) : <li>Keep practicing to build your core strengths!</li>}
                  </ul>
                </div>

                <div className="insight-card weakness">
                  <h4>⚠️ Critical Improvements</h4>
                  <ul className="insight-list">
                    {result.weaknesses.length > 0 ? result.weaknesses.map((w, i) => (
                      <li key={i}>Focus on diving deeper into {w} concepts</li>
                    )) : <li>Fantastic! You have a solid grasp across categories.</li>}
                  </ul>
                </div>

                <button className="btn-nav btn-primary" onClick={() => navigate("/home")} style={{ marginTop: "20px" }}>
                  Finish and Save Progress →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- INTERVIEW FLOW ---
  return (
    <div className="interview-container">
      <Navbar />
      <div className="interview-content">
        
        <div className="interviewer-box">
          <div className="interviewer-avatar">👨‍💼</div>
          <div className="interviewer-status">Interview in Progress</div>
        </div>

        <div className="chat-window">
          {/* Interviewer Bubble */}
          <div className="bubble bubble-bot">
             <div style={{ fontSize: "12px", color: "#6366f1", marginBottom: "8px", fontWeight: "bold", textTransform: "uppercase" }}>
               {currentQuestion.category} Question
             </div>
             {currentQuestion.title}
             <div className="tip-box">
               <span>💡 Tip:</span> {currentQuestion.tips}
             </div>
          </div>

          {/* User Bubble (Input) */}
          <div className="bubble bubble-user">
             <textarea
               className="answer-textarea"
               placeholder="Write your answer here... (be detailed for better analysis)"
               value={answers[currentQuestion.id] || ""}
               onChange={(e) => handleAnswerChange(e.target.value)}
               autoFocus
             />
          </div>
        </div>

        <div className="nav-bar">
          <div className="progress-text">
            Step {currentStep + 1} of {questions.length}
          </div>
          
          <div style={{ display: "flex", gap: "16px" }}>
             {currentStep > 0 && (
               <button className="btn-nav" onClick={() => setCurrentStep(currentStep - 1)}>
                 Back
               </button>
             )}
             
             <button 
               className="btn-nav btn-primary" 
               onClick={handleNext}
               disabled={submitting || !(answers[currentQuestion.id]?.trim()?.length > 5)}
             >
               {submitting ? "Processing..." : (currentStep === questions.length - 1 ? "Finish Interview" : "Next Question →")}
             </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default MockInterview;

