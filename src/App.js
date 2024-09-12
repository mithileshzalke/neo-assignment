import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import axios from 'axios';

function App() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [asteroidsData, setAsteroidsData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const apiKey = 'DEMO_KEY'; // Replace with your actual NASA API key

  const fetchAsteroids = async () => {
    const url = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=${apiKey}`;
    
    try {
      setLoading(true);
      const response = await axios.get(url);
      setAsteroidsData(response.data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchAsteroids();
  };
  return (
    <div className="container">
      <h1>Asteroid Neo Stats</h1>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label>Start Date:</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>End Date:</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
            className="form-control"
          />
        </div>
        <button type="submit" className="btn-submit">Submit</button>
      </form>

      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">{error}</p>}
      {asteroidsData && (
        <div className="results">
          <h2>Asteroid Data from {startDate} to {endDate}</h2>
          <pre>{JSON.stringify(asteroidsData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
