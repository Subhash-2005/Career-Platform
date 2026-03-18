// function expandToDailyRoadmap(stages, totalDays) {
//   let roadmap = [];
//   let dayCounter = 1;

//   for (const stage of stages) {
//     for (const topic of stage.topics) {
//       for (let i = 1; i <= topic.days && dayCounter <= totalDays; i++) {
//         roadmap.push({
//           day: dayCounter,
//           stage: stage.stage,
//           topic: topic.name,
//           description: topic.description,
//           taskType:
//             i === topic.days ? "revision" : "learning",
//           status: "pending",
//         });
//         dayCounter++;
//       }
//     }
//   }

//   return roadmap;
// }

// module.exports = expandToDailyRoadmap;
