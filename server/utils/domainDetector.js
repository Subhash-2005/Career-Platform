const DOMAINS = {
  data: ["data", "analyst", "analytics", "sql", "power bi", "tableau"],
  web: ["web", "frontend", "backend", "react", "node", "full stack"],
  core_cs: ["software", "developer", "engineer", "sde"],
  security: ["cyber", "security", "hacking"],
  ai: ["ai", "machine learning", "ml"],
};

function detectDomain(goal = "") {
  const g = goal.toLowerCase();

  for (const domain in DOMAINS) {
    for (const keyword of DOMAINS[domain]) {
      if (g.includes(keyword)) return domain;
    }
  }
  return "general";
}

module.exports = detectDomain;
