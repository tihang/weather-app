import React, { useState, useEffect } from 'react';
import ResultComponent from './ResultComponent';

export default function SearchComponent() {
  const [CityName, setCityName] = useState([]);
  const [Result, setResult] = useState([]);

  const handleChange = async (e) => {
    setCityName(e.target.value);
  };

  useEffect(() => {
    async function getData() {
      if (CityName.length >= 3) {
        try {
          const response = await fetch(`/api/getCityByName?name=${CityName}`, {
            headers: {
              'auth-token': localStorage.getItem('auth-token')
            }
          });
          const json = await response.json();
          setResult(json);
        } catch (error) {
          setResult(error);
        }
      }
    }
    getData();
  }, [CityName]);

  return (
    <div className="search-component">
      <input type="text" onChange={handleChange} />
      <ResultComponent Result={Result} />
    </div>
  );
}
