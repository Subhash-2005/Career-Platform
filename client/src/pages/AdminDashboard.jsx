import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";

const AdminDashboard = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const res = await api.get("/admin/analytics");
      setData(res.data);
    } catch (err) {
      console.log("Admin fetch failed");
    }
  };

  if (!data) return <h3>Loading admin analytics...</h3>;

  return (
    <div style={{ padding: "20px" }}>
      <Navbar />
      <h2>📊 Admin Analytics</h2>

      <p><b>Total Users:</b> {data.totalUsers}</p>
      <p><b>Average Readiness:</b> {data.averageReadiness}</p>

      <h3>🏆 Top Users</h3>
      <ul>
        {data.topUsers.map((u, i) => (
          <li key={i}>
            {u.name} - {u.readinessScore}
          </li>
        ))}
      </ul>

      <h3>⚠️ Most Common Weak Topics</h3>
      <ul>
        {data.mostCommonWeakTopics.map(([topic, count], i) => (
          <li key={i}>
            {topic} ({count} users)
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;