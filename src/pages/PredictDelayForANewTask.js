import React from "react";

const PredictDelayForANewTask = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <iframe
        src="http://localhost:8501"
        style={{ width: "100%", height: "100vh", border: "none" }}
        title="Predict Delay for a New Task"
      ></iframe>
    </div>
  );
};

export default PredictDelayForANewTask;