import React, { useState } from 'react';
import axios from 'axios';
import './PredictForm.css';

const PredictForm = () => {
  const [features, setFeatures] = useState(Array(29).fill(0));
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (index, value) => {
    const newFeatures = [...features];
    newFeatures[index] = parseFloat(value);
    setFeatures(newFeatures);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    try {
      const response = await axios.post('/api/fraud_detection/', { features });
      setPrediction(response.data.prediction);
    } catch (err) {
      console.error(err);
      setError('An error occurred while predicting.');
    }
  };

  return (
    <div className="predict-form-container">
      <h2>Credit Card Fraud Detection</h2>
      <form onSubmit={handleSubmit}>
        {features.map((feature, index) => (
          <input
            key={index}
            type="number"
            step="any"
            value={feature}
            onChange={(e) => handleChange(index, e.target.value)}
            placeholder={`Feature ${index + 1}`}
          />
        ))}
        <button type="submit">Predict</button>
      </form>
      {prediction !== null && <p>Prediction: {prediction}</p>}
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default PredictForm;
