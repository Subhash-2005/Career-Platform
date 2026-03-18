function generateSkillRoadmap(skillTree, days) {

  const roadmap = [];
  let day = 1;

  Object.values(skillTree).forEach(section => {

    section.skills.forEach(skill => {

      skill.levels.forEach(level => {

        if (day > days) return;

        roadmap.push({
          day,
          topic: skill.topic,
          level: level.name,
          concept: level.concept,
          example: level.example,
          resources: level.resources || [],
          taskType: "learning",
          status: "pending"
        });

        day++;

      });

    });

  });

  return roadmap;
}

module.exports = generateSkillRoadmap;