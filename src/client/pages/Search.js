import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Axios from 'axios';

const Search = () => {
  const [cityDetail, setcityDetail] = useState('');
  const { id } = useParams();
  useEffect(() => {
    Axios.get('/api/getWeatherById', {
      params: { id },
      headers: { 'auth-token': localStorage.getItem('auth-token') }
    })
      .then(res => setcityDetail(res.data.data.name))
      .catch(err => err.response.data);
  }, []);

  return (
    <div>
      <h1>Details</h1>
      <h4>{cityDetail}</h4>
    </div>
  );
};

export default Search;
