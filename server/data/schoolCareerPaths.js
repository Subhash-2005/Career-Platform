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
      },
      {
        title: "Science Stream → BSc → Software Engineer",
        steps: [
          "Choose Science stream after 10th",
          "Develop strong programming fundamentals",
          "Bachelor’s in Computer Science",
          "Practice problem solving and build projects"
        ]
      }
    ]
  },

  "frontend developer": {
    goal: "Frontend Developer",
    description: "Builds user-facing web and mobile interfaces.",
    paths: [
      {
        title: "PCM → BTech → Frontend Developer",
        steps: [
          "Choose PCM after 10th",
          "Learn HTML, CSS, JavaScript",
          "BTech in CSE / IT",
          "Build UI projects using React"
        ]
      },
      {
        title: "Science Stream → BSc → Frontend Developer",
        steps: [
          "Choose Science stream after 10th",
          "Focus on math and logic",
          "BSc in Computer Science or IT",
          "Learn JavaScript frameworks and accessibility"
        ]
      }
    ]
  },

  "backend developer": {
    goal: "Backend Developer",
    description: "Builds server-side systems, APIs, and databases.",
    paths: [
      {
        title: "PCM → BTech → Backend Developer",
        steps: [
          "Choose PCM after 10th",
          "Gain strong programming fundamentals",
          "BTech in CSE / IT",
          "Learn Node.js/Java/Python and databases"
        ]
      },
      {
        title: "Science Stream → BSc → Backend Developer",
        steps: [
          "Choose Science stream after 10th",
          "Master algorithms and data structures",
          "BSc in Computer Science",
          "Build backend projects and REST APIs"
        ]
      }
    ]
  },

  "machine learning engineer": {
    goal: "Machine Learning Engineer",
    description: "Builds intelligent systems using models and data.",
    paths: [
      {
        title: "PCM → BTech → ML Engineer",
        steps: [
          "Choose PCM after 10th",
          "Strengthen mathematics and programming",
          "BTech in CSE / ECE",
          "Learn Python, ML libraries, and projects"
        ]
      },
      {
        title: "Science Stream → BSc → ML Engineer",
        steps: [
          "Choose Science stream after 10th",
          "Focus on statistics and linear algebra",
          "BSc in Mathematics / CS",
          "Learn data science, ML, and model deployment"
        ]
      }
    ]
  },

  "fullstack engineer": {
    goal: "Fullstack Engineer",
    description: "Master of both frontend (UI) and backend (Server) development.",
    paths: [
      {
        title: "PCM → BTech → Fullstack Engineer",
        steps: [
          "Choose PCM after 10th",
          "Learn MERN stack (MongoDB, Express, React, Node)",
          "BTech in CSE / IT",
          "Build end-to-end fullstack applications"
        ]
      },
      {
        title: "Self-Taught / Diploma → Fullstack Engineer",
        steps: [
          "Start coding early with web technologies",
          "Join bootcamps or online specialized courses",
          "Build a strong portfolio of 5+ fullstack projects",
          "Apply for junior roles or internships directly"
        ]
      }
    ]
  },

  "mobile app developer": {
    goal: "Mobile App Developer",
    description: "Creates applications for iOS and Android platforms.",
    paths: [
      {
        title: "CS Background → Mobile Specialist",
        steps: [
          "Learn Java/Kotlin for Android or Swift for iOS",
          "BTech in Computer Science",
          "Master Flutter or React Native for cross-platform",
          "Publish your own apps on Play Store / App Store"
        ]
      },
      {
        title: "Any Background → App Development",
        steps: [
          "Learn basic UI design and UX principles",
          "Enroll in mobile app development electives",
          "Focus on cross-platform frameworks",
          "Freelance or build startup apps"
        ]
      }
    ]
  },

  "cloud engineer": {
    goal: "Cloud Engineer",
    description: "Maintains and scales infrastructure on AWS, Azure, or Google Cloud.",
    paths: [
      {
        title: "PCM → BTech (Cloud Specialization)",
        steps: [
          "Choose PCM and focus on Networking basics",
          "Get AWS Certified Cloud Practitioner certificate",
          "BTech with focus on Distributed Systems",
          "Learn Terraform and Cloud Architecture"
        ]
      },
      {
        title: "IT Support → Cloud Migration",
        steps: [
          "Choose Computer Science in 11th/12th",
          "Learn Linux and basic shell scripting",
          "Pursue BCA / BSc IT",
          "Focus on Cloud Security and DevOps"
        ]
      }
    ]
  },

  "devops engineer": {
    goal: "DevOps Engineer",
    description: "Bridges the gap between development and IT operations.",
    paths: [
      {
        title: "Engineering Route → SRE / DevOps",
        steps: [
          "Strong focus on OS and Networking in college",
          "Learn Docker, Kubernetes, and CI/CD tools",
          "BTech in CSE / IT",
          "Gain experience in system automation"
        ]
      },
      {
        title: "System Admin → DevOps Specialist",
        steps: [
          "Join vocational training in systems management",
          "Learn Python/Go for infrastructure automation",
          "Gain certifications like CKA (Kubernetes)",
          "Implement CI/CD pipelines in personal projects"
        ]
      }
    ]
  },

  "cybersecurity specialist": {
    goal: "Cybersecurity Specialist",
    description: "Protects systems and networks from digital attacks.",
    paths: [
      {
        title: "Standard Education → Cyber Expert",
        steps: [
          "Focus on PCM and Networking after 10th",
          "BTech / BSc with Cybersecurity major",
          "Learn Ethical Hacking and Network Security",
          "Participate in CTF (Capture The Flag) competitions"
        ]
      },
      {
        title: "Certification Route → Cyber Analyst",
        steps: [
          "Take basic computer security courses after 12th",
          "Get CEH (Certified Ethical Hacker) certification",
          "Focus on Penetration Testing and SIEM tools",
          "Work in Security Operations Center (SOC)"
        ]
      }
    ]
  },

  "ui/ux designer": {
    goal: "UI/UX Designer",
    description: "Designs the look, feel, and usability of digital products.",
    paths: [
      {
        title: "Design School → Product Designer",
        steps: [
          "Choose Arts or Science after 10th",
          "Prepare for NID / UCEED entrance exams",
          "Bachelor’s in Design (B.Des)",
          "Master Figma, Adobe XD, and User Research"
        ]
      },
      {
        title: "Self-Paced Learning → UX Designer",
        steps: [
          "Learn visual design principles (Colors, Type)",
          "Take online UX certification (e.g., Google UX)",
          "Build a portfolio on Behance / Dribbble",
          "Intern at startups to gain real-world experience"
        ]
      }
    ]
  },
  
  "ias officer": {
    goal: "IAS Officer (Civil Services)",
    description: "Serves the nation through administration and policy implementation.",
    paths: [
      {
        title: "Any Stream → Graduation → UPSC",
        steps: [
          "Focus on NCERTs (History, Polity, Geography) from Class 6-12",
          "Choose any stream (Arts/Science/Commerce) after 10th",
          "Complete any Graduation degree",
          "Prepare for UPSC Civil Services Examination"
        ]
      },
      {
        title: "Arts Stream → Specialized Graduation → IAS",
        steps: [
          "Choose Humanities/Arts in Class 11-12",
          "Focus on History, Political Science, and Economics",
          "Bachelor's in Humanities (Political Science / History)",
          "Intensive UPSC Prelims and Mains preparation"
        ]
      }
    ]
  },

  "ifs officer": {
    goal: "IFS Officer (International Relations)",
    description: "Represents India's interests globally and manages diplomatic relations.",
    paths: [
      {
        title: "Humanities / Arts Route → Diplomat",
        steps: [
          "Focus on World History and Political Science in Class 11-12",
          "Bachelor's in International Relations / Political Science",
          "Develop strong command over English and a Foreign Language",
          "Clear UPSC Civil Services Exam with high rank for IFS"
        ]
      },
      {
        title: "English / Literature Route → IFS",
        steps: [
          "Focus on English Literature and Communication after 10th",
          "Bachelor's in English Honours / History",
          "Read extensively on Geopolitics and International Trade",
          "Take elective courses in Diplomacy and Public Policy"
        ]
      }
    ]
  }
};



module.exports = SCHOOL_CAREER_PATHS;
