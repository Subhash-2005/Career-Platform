async function getAdaptivePractice(topic, attempts, problemBank) {

  // get all attempts for this topic
  const topicAttempts = (attempts || []).filter(a => a.topic === topic);

  // get problems for topic
  const topicProblems = problemBank[topic] || [];

  if (!topicProblems.length) {
    return [];
  }

  // if user never attempted → start easy
  if (topicAttempts.length === 0) {
    return topicProblems.filter(p => p.difficulty === "easy");
  }

  const correct = topicAttempts.filter(a => a.correct).length;
  const accuracy = (correct / topicAttempts.length) * 100;

  let difficulty;

  if (accuracy < 40) difficulty = "easy";
  else if (accuracy < 70) difficulty = "medium";
  else difficulty = "hard";

  const filtered = topicProblems.filter(p => p.difficulty === difficulty);

  // fallback if difficulty not available
  return filtered.length ? filtered : topicProblems;
}

module.exports = getAdaptivePractice;