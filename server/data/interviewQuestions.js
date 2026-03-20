const INTERVIEW_QUESTIONS = {
  general: [
    {
      id: "gen_1",
      question: "Tell me about yourself and your journey in technology.",
      category: "hr",
      keywords: ["experience", "passion", "projects", "learning"],
      tips: "Focus on your unique selling points and key achievements."
    },
    {
      id: "gen_2",
      question: "What is your greatest technical strength, and how has it helped you in a project?",
      category: "hr",
      keywords: ["strength", "impact", "application", "problem-solving"],
      tips: "Use the STAR method (Situation, Task, Action, Result)."
    },
    {
      id: "gen_3",
      question: "How do you stay updated with the latest trends in your field?",
      category: "hr",
      keywords: ["blogs", "courses", "practice", "community"],
      tips: "Mention specific resources like MDN, AWS Blogs, or GitHub."
    }
  ],
  frontend: [
    {
      id: "fe_1",
      question: "Explain the difference between Virtual DOM and Real DOM in React.",
      category: "technical",
      keywords: ["reconciliation", "performance", "updating", "diffing"],
      tips: "Mention how React avoids expensive DOM manipulations."
    },
    {
      id: "fe_2",
      question: "What are the common ways to optimize a web application's performance?",
      category: "technical",
      keywords: ["lazy loading", "caching", "minification", "bundling", "cdn"],
      tips: "Talk about both asset optimization and code execution."
    },
    {
      id: "fe_3",
      question: "How does CSS specificity work, and how do you manage it in large projects?",
      category: "technical",
      keywords: ["selectors", "importance", "bem", "cascading"],
      tips: "Mention methodologies like BEM or CSS Modules."
    }
  ],
  backend: [
    {
      id: "be_1",
      question: "Explain the concept of RESTful APIs and their constraints.",
      category: "technical",
      keywords: ["stateless", "client-server", "uniform interface", "resource"],
      tips: "Focus on the six architectural constraints of REST."
    },
    {
      id: "be_2",
      question: "What is the difference between SQL and NoSQL databases? When would you choose one over the other?",
      category: "technical",
      keywords: ["relational", "schema", "scaling", "document", "acid"],
      tips: "Compare structure, consistency, and scalability."
    },
    {
      id: "be_3",
      question: "How do you handle authentication and authorization in a Node.js application?",
      category: "technical",
      keywords: ["jwt", "sessions", "middleware", "oauth", "bcrypt"],
      tips: "Explain the flow from login to protected routes."
    }
  ],
  ml: [
    {
      id: "ml_1",
      question: "What is the bias-variance tradeoff in machine learning?",
      category: "technical",
      keywords: ["overfitting", "underfitting", "complexity", "generalization"],
      tips: "Explain how these two errors impact model performance."
    },
    {
      id: "ml_2",
      question: "Explain the difference between supervised and unsupervised learning.",
      category: "technical",
      keywords: ["labels", "clustering", "regression", "classification"],
      tips: "Provide real-world examples for each."
    },
    {
      id: "ml_3",
      question: "How do you handle missing or imbalanced data in a dataset?",
      category: "technical",
      keywords: ["imputation", "oversampling", "undersampling", "smote"],
      tips: "Mention both data-level and algorithm-level techniques."
    }
  ]
};

module.exports = INTERVIEW_QUESTIONS;
