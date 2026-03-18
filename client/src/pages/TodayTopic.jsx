// import { useEffect, useState } from "react";
// import api from "../services/api";
// import { Link, useNavigate } from "react-router-dom";

// const TodayTopic = () => {
//   const [today, setToday] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     loadToday();
//   }, []);

//   const loadToday = async () => {
//     try {
//       const res = await api.get("/roadmap/today");
//       setToday(res.data);
//     } catch (err) {
//       console.log("Failed to load today topic");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const markCompleted = async () => {
//   try {
//     await api.post("/roadmap/complete-day", {
//       day: today.day
//     });
//     alert("Today's task completed");
//   } catch (err) {
//     console.log(err);
//     alert("Failed to complete today's task");
//   }
// };


//   if (loading) return <h3>Loading today’s plan...</h3>;

//   if (!today || today.message) {
//     return <h3>🎉 You have completed all tasks!</h3>;
//   }

//   return (
//     <div>
//       <h2>📘 Today’s Learning Plan</h2>

//       <p><b>Day:</b> {today.day}</p>
//       <p><b>Stage:</b> {today.stage}</p>
//       <p><b>Topic:</b> {today.topic}</p>

//       <hr />

//       <p><b>Description:</b></p>
//       <p>{today.description}</p>

//       <hr />

//       <p><b>What to do today:</b></p>
//       {today.taskType === "revision" ? (
//         <ul>
//           <li>Revise previous concepts</li>
//           <li>Solve mixed practice problems</li>
//         </ul>
//       ) : (
//         <ul>
//           <li>Understand core concepts</li>
//           <li>Read examples</li>
//           <li>Try basic problems</li>
//         </ul>
//       )}

//       <hr />

//       <Link to="/practice">
//         <button>Practice This Topic</button>
//       </Link>

//       <button onClick={markCompleted}>
//         Mark Today as Completed
//       </button>
//     </div>
//   );
// };

// export default TodayTopic;
