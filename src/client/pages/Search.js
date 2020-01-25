import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Axios from 'axios';
import DetailCardComponent from '../components/DetailCardComponent';

const Search = () => {
  const [searchData, setSearchData] = useState({
    name: '',
    weatherMain: '',
    mainTemp: '',
    mainFeelsLike: '',
    mainTempMax: '',
    mainTempMin: ''
  });

  const history = useHistory();

  const { id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await Axios.get('/api/getWeatherById', {
          params: { id },
          headers: { 'auth-token': localStorage.getItem('auth-token') }
        });

        setSearchData({
          name: result.data.data.name,
          weatherMain: result.data.data.weather[0].main,
          mainTemp: result.data.data.main.temp,
          mainFeelsLike: result.data.data.main.feels_like,
          mainTempMax: result.data.data.main.temp_max,
          mainTempMin: result.data.data.main.temp_min
        });
      } catch (error) {
        setSearchData(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="display-page">
      <button type="button" className="back-btn" onClick={() => history.goBack()}>
        {'<- Go back'}
      </button>
      <h1>Detail</h1>
      <DetailCardComponent data={searchData} />
      <button className="far fa-bookmark" type="button">
        Add to favorite
      </button>
    </div>
  );
};

export default Search;
