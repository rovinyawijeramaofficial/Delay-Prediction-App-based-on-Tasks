import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import PredictDelayForANewTask from "./pages/PredictDelayForANewTask";

const App = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://127.0.0.1:8000/projects"); // Update with your backend URL
      setProjects(response.data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
    // Keep the loading message visible for an additional 1.5 seconds
    setTimeout(() => {
      setLoading(false);
      navigate("/predict-delay");
    }, 1500);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Welcome to Delay Prediction System</h1>
      <button 
        onClick={fetchProjects} 
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "5px",
          marginTop: "20px"
        }}>
        Fetch Project
      </button>

      {loading && (
        <div style={{ 
          marginTop: "20px", 
          fontSize: "18px", 
          color: "black", 
          padding: "10px", 
        }}>
          Predicting delay of new task in project...
        </div>
      )}

      <ul style={{ listStyle: "none", padding: 0 }}>
        {projects.map((project) => (
          <li key={project.id} style={{ marginTop: "10px", fontSize: "18px" }}>
            {project.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/predict-delay" element={<PredictDelayForANewTask />} />
      </Routes>
    </Router>
  </React.StrictMode>
);