import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import SearchComponent from '../components/SearchComponent';
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
  }, [profile.savedCityId]);

  return (
    <div className="profile-page">
      <h1>Profile</h1>
      <ProfileDetail profile={profile} />
      <h3>Watch List</h3>
      {resultData.map((result, i) => (
        <DetailCardComponent key={(result.id, i)} data={result} />
      ))}
      <h3>Search Citites</h3>
      <SearchComponent />
    </div>
  );
};
export default Profile;

// {resultData.map((entireData) => {
//   const filteredData = {
//     name: entireData.name,
//     weatherMain: entireData.data.weather[0].main,
//     mainTemp: entireData.main.temp,
//     mainFeelsLike: entireData.main.feels_like,
//     mainTempMax: entireData.main.temp_max,
//     mainTempMin: entireData.main.temp_min
//   };
//   return <DetailCardComponent key={entireData.name} data={filteredData} />;
// })}
