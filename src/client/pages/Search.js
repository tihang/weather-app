import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Axios from 'axios';
import { toCelsius } from '../helpers/TempConverter';

const Search = () => {
  const [cityName, setCityName] = useState('');
  const [weatherMain, setWeatherMain] = useState('');
  const [weatherDescription, setWeatherDescription] = useState('');
  const [mainTemp, setMainTemp] = useState('');
  const [mainFeelsLike, setMainFeelsLike] = useState('');
  const [mainTempMax, setmainTempMax] = useState('');
  const [mainTempMin, setMainTempMin] = useState('');

  const { id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await Axios.get('/api/getWeatherById', {
          params: { id },
          headers: { 'auth-token': localStorage.getItem('auth-token') }
        });

        setCityName(result.data.data.name);
        setWeatherMain(result.data.data.weather[0].main);
        setWeatherDescription(result.data.data.weather[0].description);
        setMainTemp(result.data.data.main.temp);
        setMainFeelsLike(result.data.data.main.feels_like);
        setmainTempMax(result.data.data.main.temp_max);
        setMainTempMin(result.data.data.main.temp_min);
      } catch (error) {
        setCityName(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>Details</h1>
      <h4>{cityName}</h4>
      <h5>{weatherMain}</h5>
      <h5>{weatherDescription}</h5>
      <h5>{`Temperature: ${Math.round(toCelsius(mainTemp))} °C`}</h5>
      <h5>{`Feels Like: ${Math.round(toCelsius(mainFeelsLike))} °C`}</h5>
      <h5>{`Max: ${Math.round(toCelsius(mainTempMax))} °C`}</h5>
      <h5>{`Min: ${Math.round(toCelsius(mainTempMin))} °C`}</h5>
    </div>
  );
};

export default Search;
