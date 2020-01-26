import React, { useState, useEffect } from 'react';
import ReactLoading from 'react-loading';
import ResultComponent from './ResultComponent';

export default function SearchComponent() {
  const [CityName, setCityName] = useState([]);
  const [Result, setResult] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
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
      setIsLoading(false);
    }
    setIsLoading(true);
    getData();
  }, [CityName]);

  return (
    <div className="search-component">
      <input type="text" onChange={handleChange} />
      {isLoading ? <ReactLoading type="spin" color="grey" height={60} width={60} /> : null}
      <ResultComponent Result={Result} />
    </div>
  );
}
