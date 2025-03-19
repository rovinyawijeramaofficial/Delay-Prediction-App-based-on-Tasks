import React, { useState } from "react";
import axios from "axios";

function App() {
  const [formData, setFormData] = useState({
    OverDue: 0,
    Delay_Days: 0,
    project: 1,
    Priority: 1,
    Cause: 1,
    Task_Group: 1,
    To_Package: 1,
  });

  const [prediction, setPrediction] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: Number(e.target.value) });
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
      <h2>Construction Delay Prediction</h2>
      <form onSubmit={handleSubmit}>
        {Object.keys(formData).map((key) => (
          <div key={key}>
            <label>{key}:</label>
            <input
              type="number"
              name={key}
              value={formData[key]}
              onChange={handleChange}
            />
          </div>
        ))}
        <button type="submit">Predict Delay</button>
      </form>
      {prediction && (
        <div>
          <h3>Prediction Result</h3>
          <p>Predicted Delay: {prediction.Predicted_Delay}</p>
          <p>Delay Probability: {prediction.Delay_Probability * 100}%</p>
        </div>
      )}
    </div>
  );
}

export default App;
