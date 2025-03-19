import React, { useState } from "react";
import axios from "axios";

const PredictionForm = () => {
  const [formData, setFormData] = useState({
    over_due: "",
    delay_days: "",
    project: "",
    priority: "",
    cause: "",
    task_group: "",
    to_package: "",
  });

  const [prediction, setPrediction] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:8000/predict", formData);
      setPrediction(response.data);
    } catch (error) {
      console.error("Error predicting delay:", error);
    }
  };

  return (
    <div>
      <h2>Delay Prediction</h2>
      <form onSubmit={handleSubmit}>
        <input type="number" name="over_due" placeholder="Overdue Days" onChange={handleChange} required />
        <input type="number" name="delay_days" placeholder="Delay Days" onChange={handleChange} required />
        <input type="number" name="project" placeholder="Project ID" onChange={handleChange} required />
        <input type="number" name="priority" placeholder="Priority" onChange={handleChange} required />
        <input type="number" name="cause" placeholder="Cause ID" onChange={handleChange} required />
        <input type="number" name="task_group" placeholder="Task Group ID" onChange={handleChange} required />
        <input type="number" name="to_package" placeholder="To Package ID" onChange={handleChange} required />
        <button type="submit">Predict Delay</button>
      </form>

      {prediction && (
        <div>
          <h3>Prediction Result</h3>
          <p>Predicted Delay: {prediction.predicted_delay}</p>
          <p>Delay Probability: {prediction.delay_probability}</p>
        </div>
      )}
    </div>
  );
};

export default PredictionForm;
