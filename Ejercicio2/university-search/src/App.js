import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [countryName, setCountryName] = useState('');
  const [universities, setUniversities] = useState([]);
  const [error, setError] = useState(null);

  const handleCountryChange = (e) => {
    setCountryName(e.target.value);
  };

  const fetchUniversities = async () => {
    if (!countryName.trim()) {
      setError('Please enter a country name');
      return;
    }
    try {
      const response = await axios.get(`http://universities.hipolabs.com/search?country=${countryName}`);
      if (response.data && response.data.length > 0) {
        setUniversities(response.data);
        setError(null);
      } else {
        setError('No universities found for this country');
        setUniversities([]);
      }
    } catch (err) {
      setError('Error fetching data, please try again.');
      setUniversities([]);
    }
  };
return (
    <div className="App">
      <h1>University Search</h1>
      <div>
        <input
          type="text"
          placeholder="Enter country name"
          value={countryName}
          onChange={handleCountryChange}
        />
        <button onClick={fetchUniversities}>Search</button>
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {universities.length > 0 && (
        <table border="1" cellPadding="10" cellSpacing="0">
          <thead>
            <tr>
              <th>University Name</th>
              <th>Country</th>
              <th>Web Page</th>
              <th>Domain</th>
            </tr>
          </thead>
<tbody>
            {universities.map((university, index) => (
              <tr key={index}>
                <td>{university.name}</td>
                <td>{university.country}</td>
                <td>
                  <a href={university.web_pages[0]} target="_blank" rel="noopener noreferrer">
                    {university.web_pages[0]}
                  </a>
                </td>
                <td>{university.domains.join(', ')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;


