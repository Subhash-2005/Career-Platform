const SCHOOL_CAREER_PATHS = {
  "data analyst": {
    goal: "Data Analyst",
    description: "Works with data to find insights and trends.",
    paths: [
      {
        title: "Science Stream → BSc → Data Analyst",
        steps: [
          "Choose Science stream after 10th",
          "Focus on Mathematics & Statistics",
          "Bachelor’s in Statistics / Computer Science",
          "Learn Python, SQL, Data Analysis"
        ]
      },
      {
        title: "PCM → BTech → Data Analyst",
        steps: [
          "Choose PCM after 10th",
          "Prepare for engineering entrance exams",
          "BTech in CSE / IT",
          "Learn SQL, Python, Analytics tools"
        ]
      }
    ]
  },

  "software engineer": {
    goal: "Software Engineer",
    description: "Builds software systems and applications.",
    paths: [
      {
        title: "PCM → BTech → Software Engineer",
        steps: [
          "Choose PCM after 10th",
          "Prepare for JEE / state exams",
          "BTech in CSE / IT",
          "Learn DSA, OS, DBMS, Projects"
        ]
      }
    ]
  }
};

module.exports = SCHOOL_CAREER_PATHS;
