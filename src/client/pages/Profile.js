import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import ProfileDetail from '../components/ProfileDetail';
import DetailCardComponent from '../components/DetailCardComponent';

const Profile = () => {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    date: '',
    savedCityId: []
  });

  const [resultData, setResultData] = useState([]);

  useEffect(() => {
    // Getting profile data first
    async function getData() {
      const user = await Axios.get('/api/profile/show', {
        headers: { 'auth-token': localStorage.getItem('auth-token') }
      });
      setProfile({
        name: user.data.name,
        email: user.data.email,
        date: user.data.date,
        savedCityId: user.data.savedCityId
      });
    }
    getData();
  }, []);

  useEffect(() => {
    async function getData() {
      // Getting weather data after profile data
      profile.savedCityId.forEach(async (cityId) => {
        try {
          const result = await Axios.get('/api/getWeatherById', {
            params: { id: cityId },
            headers: { 'auth-token': localStorage.getItem('auth-token') }
          });
          setResultData(existingArrayVal => [
            ...existingArrayVal,
            {
              id: result.data.data.id,
              name: result.data.data.name,
              weatherMain: result.data.data.weather[0].main,
              mainTemp: result.data.data.main.temp,
              mainFeelsLike: result.data.data.main.feels_like,
              mainTempMax: result.data.data.main.temp_max,
              mainTempMin: result.data.data.main.temp_min
            }
          ]);
        } catch (error) {
          setResultData(error);
        }
      });
    }
    getData();
  }, [profile.savedCityId]);

  return (
    <div className="profile-page">
      <h1>Profile</h1>
      <ProfileDetail profile={profile} />
      <h2>Watch List</h2>
      {resultData.map((result, i) => (
        <DetailCardComponent key={(result.id, i)} data={result} />
      ))}
    </div>
  );
};
export default Profile;
