import React, { useState } from 'react';
import UniversityList from './UniversityList';

const UniversitySearch = () => {
const [countryName, setCountryName] = useState('');
const handleCountryChange = (event) => {
setCountryName(event.target.value);
};
return (
<div>
<h1>Search Universities by Country</h1>
<input
type="text"
placeholder="Enter country"
value={countryName}
onChange={handleCountryChange}
/>
{countryName && <UniversityList countryName={countryName} />}
</div>
);
};
export default UniversitySearch;