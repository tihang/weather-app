import React, { useState, useEffect } from 'react';

export default function SearchComponent() {
  const [CityName, setCityName] = useState([]);
  const [Result, setResult] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleChange = async (e) => {
    setCityName(e.target.value);
  };

  useEffect(() => {
    async function getData() {
      if (CityName.length >= 3) {
        const response = await fetch(`/api/getCityByName?name=${CityName}`);
        const json = await response.json();
        console.log(CityName);
        setResult(json);
        console.log(Result);
      }
    }
    getData();
  }, [CityName]);

  return (
    <div className="search-component">
      <h2>{CityName}</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={handleChange} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
