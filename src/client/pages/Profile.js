import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
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
    // used isSubscribed to handle unfinished promise
    let isSubscribed = true;
    Axios.get('/api/profile/show', {
      headers: { 'auth-token': localStorage.getItem('auth-token') }
    }).then((user) => {
      if (isSubscribed) {
        setProfile({
          name: user.data.name,
          email: user.data.email,
          date: user.data.date,
          savedCityId: user.data.savedCityId
        });
      }
    });
    return () => {
      isSubscribed = false;
    };
  }, []);

  useEffect(() => {
    // used isSubscribed to handle unfinished promise
    let isSubscribed = true;
    profile.savedCityId.forEach((cityId) => {
      Axios.get('/api/getWeatherById', {
        params: { id: cityId },
        headers: { 'auth-token': localStorage.getItem('auth-token') }
      }).then((result) => {
        if (isSubscribed) {
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
        }
      });
      return () => {
        console.log('cleanup2');

        isSubscribed = false;
      };
    });
  }, [profile.savedCityId]);

  const emptyArrayMessage = () => (
    <React.Fragment>
      <h4>No items found. Search and add weather to your watch list</h4>
      <button type="button">
        <Link to="/search">Start searching!</Link>
      </button>
    </React.Fragment>
  );

  return (
    <div className="profile-page">
      <h1>Profile</h1>
      <ProfileDetail profile={profile} />
      <h2>Watch List</h2>
      {resultData.length < 1 ? emptyArrayMessage() : null}
      {resultData.map((result, i) => (
        <DetailCardComponent key={(result.id, i)} data={result} />
      ))}
    </div>
  );
};
export default Profile;

// useEffect(() => {
//   async function getData() {
//     let isSubscribed = true;
//     // Getting weather data after profile data
//     if (isSubscribed) {
//       profile.savedCityId.forEach(async (cityId) => {
//         try {
//           const result = await Axios.get('/api/getWeatherById', {
//             params: { id: cityId },
//             headers: { 'auth-token': localStorage.getItem('auth-token') }
//           });
//           setResultData(existingArrayVal => [
//             ...existingArrayVal,
//             {
//               id: result.data.data.id,
//               name: result.data.data.name,
//               weatherMain: result.data.data.weather[0].main,
//               mainTemp: result.data.data.main.temp,
//               mainFeelsLike: result.data.data.main.feels_like,
//               mainTempMax: result.data.data.main.temp_max,
//               mainTempMin: result.data.data.main.temp_min
//             }
//           ]);
//         } catch (error) {
//           setResultData(error);
//         }
//       });
//     }
//   }
//   getData();
// }, [profile.savedCityId]);

// useEffect(() => {
//   // Getting profile data first
//   async function getData() {
//     const user = await Axios.get('/api/profile/show', {
//       headers: { 'auth-token': localStorage.getItem('auth-token') }
//     });
//     setProfile({
//       name: user.data.name,
//       email: user.data.email,
//       date: user.data.date,
//       savedCityId: user.data.savedCityId
//     });
//   }
//   getData();
// }, []);
