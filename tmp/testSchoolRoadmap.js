const SCHOOL_CAREER_PATHS = require("../server/data/schoolCareerPaths");
const SCHOOL_FOUNDATION = require("../server/data/schoolFoundation");

// Mocking logic from roadmapController.js
function testGenerateRoadmap(targetRole, selectedPath, schoolClass = 10) {
    const rawRole = (targetRole || "").toLowerCase().trim();
    const engineerVariant = rawRole.replace("developer", "engineer");
    const developerVariant = rawRole.replace("engineer", "developer");

    const guidance =
        SCHOOL_CAREER_PATHS[rawRole] ||
        SCHOOL_CAREER_PATHS[engineerVariant] ||
        SCHOOL_CAREER_PATHS[developerVariant] ||
        {
          goal: targetRole,
          description: "Career guidance will be added soon.",
          paths: []
        };

    const classLevel = schoolClass || 8;
    const topics = SCHOOL_FOUNDATION[classLevel] || SCHOOL_FOUNDATION[8];

    let roadmapDays = [];
    let day = 1;

    const pathObj = guidance.paths?.find(p => p.title === selectedPath);
    if (pathObj) {
        pathObj.steps.forEach((step, index) => {
            roadmapDays.push({
                day: day++,
                tasks: [{ topic: step, type: "career-path" }]
            });
        });
    }

    topics.forEach(topic => {
        for (let i = 0; i < topic.days; i++) {
            roadmapDays.push({
                day: day++,
                tasks: [{ topic: topic.topic, type: "learning" }]
            });
        }
    });

    return { guidance, roadmapDays };
}

// Test Case 1: Fullstack Developer (should match fullstack engineer)
console.log("--- Test Case 1: Fullstack Developer ---");
const tc1 = testGenerateRoadmap("Fullstack Developer", "PCM → BTech → Fullstack Engineer");
console.log("Matched Goal:", tc1.guidance.goal);
console.log("Path Tasks Count:", tc1.roadmapDays.filter(d => d.tasks[0].type === "career-path").length);
if (tc1.guidance.goal === "Fullstack Engineer" && tc1.roadmapDays.length > 0) {
    console.log("✅ Success");
} else {
    console.log("❌ Failed");
}

// Test Case 2: Cloud Engineer
console.log("\n--- Test Case 2: Cloud Engineer ---");
const tc2 = testGenerateRoadmap("Cloud Engineer", "PCM → BTech (Cloud Specialization)");
console.log("Matched Goal:", tc2.guidance.goal);
console.log("Path Tasks Count:", tc2.roadmapDays.filter(d => d.tasks[0].type === "career-path").length);
if (tc2.guidance.goal === "Cloud Engineer" && tc2.roadmapDays.length > 0) {
    console.log("✅ Success");
} else {
    console.log("❌ Failed");
}

// Test Case 3: UI/UX Designer
console.log("\n--- Test Case 3: UI/UX Designer ---");
const tc3 = testGenerateRoadmap("UI/UX Designer", "Design School → Product Designer");
console.log("Matched Goal:", tc3.guidance.goal);
console.log("Path Tasks Count:", tc3.roadmapDays.filter(d => d.tasks[0].type === "career-path").length);
if (tc3.guidance.goal === "UI/UX Designer" && tc3.roadmapDays.length > 0) {
    console.log("✅ Success");
} else {
    console.log("❌ Failed");
}
