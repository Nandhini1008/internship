import { useState } from 'react';
import './App.css';

const initialState = {
  Age: '',
  Gender: '',
  Heart_rate: '',
  Systolic_blood_pressure: '',
  Diastolic_blood_pressure: '',
  Blood_sugar: '',
  CK_MB: '',
  Troponin: ''
};

function App() {
  const [form, setForm] = useState(initialState);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const response = await fetch('http://localhost:8000/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          Age: parseInt(form.Age),
          Gender: parseInt(form.Gender),
          Heart_rate: parseInt(form.Heart_rate),
          Systolic_blood_pressure: parseInt(form.Systolic_blood_pressure),
          Diastolic_blood_pressure: parseInt(form.Diastolic_blood_pressure),
          Blood_sugar: parseFloat(form.Blood_sugar),
          CK_MB: parseFloat(form.CK_MB),
          Troponin: parseFloat(form.Troponin)
        })
      });
      const data = await response.json();
      setResult(data.result);
    } catch (err) {
      setError('Prediction failed. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="container">
      <h1 className="title">❤️ Heart Attack Predictor</h1>
      <p className="subtitle">Stay chill, stay healthy. Enter your details below!</p>
      <form className="predict-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <label>Age</label>
          <input name="Age" type="number" min="1" max="120" value={form.Age} onChange={handleChange} required />
        </div>
        <div className="form-row">
          <label>Gender</label>
          <select name="Gender" value={form.Gender} onChange={handleChange} required>
            <option value="">Select</option>
            <option value="1">Male</option>
            <option value="0">Female</option>
          </select>
        </div>
        <div className="form-row">
          <label>Heart Rate</label>
          <input name="Heart_rate" type="number" value={form.Heart_rate} onChange={handleChange} required />
        </div>
        <div className="form-row">
          <label>Systolic BP</label>
          <input name="Systolic_blood_pressure" type="number" value={form.Systolic_blood_pressure} onChange={handleChange} required />
        </div>
        <div className="form-row">
          <label>Diastolic BP</label>
          <input name="Diastolic_blood_pressure" type="number" value={form.Diastolic_blood_pressure} onChange={handleChange} required />
        </div>
        <div className="form-row">
          <label>Blood Sugar</label>
          <input name="Blood_sugar" type="number" step="0.01" value={form.Blood_sugar} onChange={handleChange} required />
        </div>
        <div className="form-row">
          <label>CK-MB</label>
          <input name="CK_MB" type="number" step="0.01" value={form.CK_MB} onChange={handleChange} required />
        </div>
        <div className="form-row">
          <label>Troponin</label>
          <input name="Troponin" type="number" step="0.001" value={form.Troponin} onChange={handleChange} required />
        </div>
        <button className="submit-btn" type="submit" disabled={loading}>{loading ? 'Predicting...' : 'Predict'}</button>
      </form>
      {result && (
        <div className={`result-card ${result === 'positive' ? 'danger' : 'safe'}`}> 
          <h2>{result === 'positive' ? '⚠️ Risk Detected!' : '✅ No Risk Detected'}</h2>
          <p>{result === 'positive' ? 'Please consult a doctor. Take care!' : 'You are safe! Keep chilling 😎'}</p>
        </div>
      )}
      {error && <div className="error-msg">{error}</div>}
      <footer className="footer">Made with ❤️ & Vibes</footer>
    </div>
  );
}

export default App;
