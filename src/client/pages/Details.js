import React, { useEffect, useState } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import Axios from 'axios';
import DetailCardComponent from '../components/DetailCardComponent';

const Search = () => {
  const [searchData, setSearchData] = useState({
    id: '',
    name: '',
    weatherMain: '',
    mainTemp: '',
    mainFeelsLike: '',
    mainTempMax: '',
    mainTempMin: ''
  });

  const [message, setMessage] = useState('');

  const history = useHistory();

  const { id } = useParams();

  const addToWatchList = async () => {
    try {
      const result = await Axios.post(
        '/api/profile/favorite/create',
        { savedCityId: searchData.id },
        { headers: { 'auth-token': localStorage.getItem('auth-token') } }
      );
      if (result.status === 200) {
        history.push('/profile');
      }
    } catch (error) {
      setMessage('Oops something went wrong!');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await Axios.get('/api/getWeatherById', {
          params: { id },
          headers: { 'auth-token': localStorage.getItem('auth-token') }
        });

        setSearchData({
          id: result.data.data.id,
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
      <DetailCardComponent data={searchData} remove={false} />
      <button className="far fa-bookmark" type="button" onClick={addToWatchList}>
        Add to watchlist
      </button>
      <p>{message}</p>
      <button type="button">
        <Link to="/profile">Profile</Link>
      </button>
    </div>
  );
};

export default Search;
