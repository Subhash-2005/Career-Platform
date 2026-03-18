function selectTopicsByTime(blocks, days) {
  const allTopics = [];

  blocks.forEach(block => {
    block.topics.forEach(topic => {
      allTopics.push({
        name: topic.name,
        weight: topic.weight,
        block: block.block,
        blockPriority: block.priority
      });
    });
  });

  // Sort by combined importance
  allTopics.sort((a, b) =>
    (b.blockPriority * 2 + b.weight) -
    (a.blockPriority * 2 + a.weight)
  );

  // Short time → high ROI only
  if (days <= 7) {
    return allTopics.slice(0, days);
  }

  // Medium time → moderate coverage
  if (days <= 30) {
    return allTopics.slice(0, Math.min(days, allTopics.length));
  }

  // Long time → full coverage
  return allTopics;
}

module.exports = selectTopicsByTime;
