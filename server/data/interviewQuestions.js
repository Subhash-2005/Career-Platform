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
  ],

  // ====================== IAS (UPSC Personality Test) ======================
  ias: [
    {
      id: "ias_1",
      question: "Introduce yourself and explain why you want to join the Indian Administrative Service despite having other professional options.",
      tips: "Focus on public service motivation, leadership vision, and your personal backround alignment.",
      keywords: ["public service", "leadership", "impact", "country", "vision", "administration"]
    },
    {
      id: "ias_2",
      question: "Imagine you are the District Magistrate during a communal tension in your region. What immediate steps would you take to restore peace?",
      tips: "Mention law and order maintenance, communication with community leaders, and verifying social media rumors.",
      keywords: ["law and order", "communication", "leaders", "verification", "peace", "neutrality"]
    },
    {
      id: "ias_3",
      question: "How would you handle a situation where a powerful local politician is pressuring you to bypass environment norms for a development project?",
      tips: "Emphasize on rule of law, constitutional morality, and diplomacy while maintaining integrity.",
      keywords: ["integrity", "rule of law", "neutrality", "norms", "diplomacy", "constitution"]
    },
    {
      id: "ias_4",
      question: "What are the three core values according to you that a civil servant must possess in the 21st century?",
      tips: "Suggestions: Integrity, Empathy, and Digital Literacy/Innovation.",
      keywords: ["integrity", "empathy", "innovation", "excellence", "neutrality", "accountability"]
    },
    {
      id: "ias_5",
      question: "In your opinion, what is the biggest challenge facing Indian administration today, and how would you address it?",
      tips: "Topics could be rural infrastructure, digital divide, or corruption. Provide a solution-oriented answer.",
      keywords: ["infrastructure", "transparency", "digital", "corruption", "solution", "inclusive"]
    },
    {
      id: "ias_6",
      question: "With the rise of Artificial Intelligence, how do you see the role of a civil servant changing in the next decade?",
      tips: "Discuss data-driven decision making, personalized public services, and the ethics of automated systems.",
      keywords: ["ai", "efficiency", "transparency", "ethics", "data", "citizen-centric"]
    },
    {
      id: "ias_7",
      question: "You are the head of a department where corruption is systemic. How will you initiate a cleanup without paralyzing the department's work?",
      tips: "Mention technology for transparency (e-governance), protecting whistleblowers, and setting a personal example.",
      keywords: ["e-governance", "whistleblower", "transparency", "systemic", "cleanup", "accountability"]
    },
    {
      id: "ias_8",
      question: "What is your stand on 'Development vs Environment'? Can India achieve high growth while preserving its ecological heritage?",
      tips: "Talk about 'Sustainable Development', renewable energy transitions, and balancing immediate needs with long-term survival.",
      keywords: ["sustainable", "growth", "ecology", "balance", "green energy", "responsibility"]
    },
  ],
    
    // ====================== IFS (Indian Foreign Service) ======================
    ifs: [
      {
        id: "ifs_1",
        question: "Why have you chosen the Indian Foreign Service over other civil services, and which country would you like to be posted to first?",
        tips: "Highlight your interest in global affairs, diplomacy, and representing India's interests abroad. Be strategic with your posting choice.",
        keywords: ["diplomacy", "representation", "interests", "global", "culture", "strategy"]
      },
      {
        id: "ifs_2",
        question: "Imagine you are an Indian diplomat in a country that has just undergone a military coup. How will you ensure the safety of Indian citizens there?",
        tips: "Mention emergency helplines, coordination with local authorities, evacuation plans (e.g., Operation Ganga), and staying neutral in internal politics.",
        keywords: ["evacuation", "emergency", "citizens", "coordination", "safety", "neutrality"]
      },
      {
        id: "ifs_3",
        question: "How do you define 'Strategic Autonomy' in the context of India's current relations with both the USA and Russia?",
        tips: "Explain the balance between traditional partnerships and emerging security alliances without compromising national interest.",
        keywords: ["strategic autonomy", "balance", "interest", "partnerships", "alignment", "neutrality"]
      },
      {
        id: "ifs_4",
        question: "What is your take on the 'Debt-trap Diplomacy' being observed in India's neighborhood, and what should be India's counter-strategy?",
        tips: "Discuss economic assistance, regional connectivity (e.g., BIMSTEC), and transparency in infrastructure projects.",
        keywords: ["debt-trap", "counter-strategy", "neighborhood", "connectivity", "transparency", "assistance"]
      }
    ]
  };


module.exports = INTERVIEW_QUESTIONS;
