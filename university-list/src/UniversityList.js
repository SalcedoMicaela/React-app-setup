import React, { useState, useEffect } from 'react';
import axios from 'axios';
const UniversityList = ({ countryName }) => {
const [universities, setUniversities] = useState([]);
 const [loading, setLoading] = useState(true);
const [error, setError] = useState('');
useEffect(() => {
    const fetchUniversities = async () => {
        try {
             setLoading(true);
             const response = await axios.get(`http://universities.hipolabs.com/search?country=${countryName}`);
            setUniversities(response.data);
         } catch (err) {
        setError('Failed to fetch universities.');
        } finally {
        setLoading(false);
        }
        };
        if (countryName) {
    fetchUniversities();
 }
}, [countryName]);
 if (loading) return <p>Loading...</p>;
 if (error) return <p>{error}</p>;
 return (
 <div>
         <h2>Universities in {countryName}</h2>
        <ul>
        {universities.map((university, index) => (
         <li key={index}>
         <a href={university.web_pages[0]} target="_blank" rel="noopener noreferrer">
         {university.name}
         </a>
            </li>
         ))}
</ul>
</div>
);
};
export default UniversityList;
