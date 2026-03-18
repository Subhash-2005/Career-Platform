const SKILL_TREES = require("../data/skillTrees");

exports.getTopicContent = async (req, res) => {

  try {

    const { role, topic, level } = req.params;

    const skillTree =
      SKILL_TREES[decodeURIComponent(role).toLowerCase()] ||
      SKILL_TREES["software engineer"];

    let result = null;

    skillTree.sections.forEach(section => {

      section.skills.forEach(skill => {

        if (skill.topic === decodeURIComponent(topic)) {

          skill.levels.forEach(lvl => {

            if (lvl.name === decodeURIComponent(level)) {

              result = {
                topic: skill.topic,
                level: lvl.name,
                explanation: lvl.explanation || "",
                keyIdeas: lvl.keyIdeas || [],
                patterns: lvl.patterns || [],
                example: lvl.example || "",
                problems: lvl.problems || [],
                tips: lvl.tips || []
              };

            }

          });

        }

      });

    });

    if (!result) {
      return res.status(404).json({ message: "Topic not found" });
    }

    res.json(result);

  } catch (err) {
    res.status(500).json({ message: "Failed to load topic" });
  }

};