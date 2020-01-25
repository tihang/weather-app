import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import SearchComponent from '../components/SearchComponent';

const Profile = () => {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    date: ''
  });

  useEffect(() => {
    async function getData() {
      const result = await Axios.get('/api/profile/show', {
        headers: { 'auth-token': localStorage.getItem('auth-token') }
      });
      setProfile({
        name: result.data.name,
        email: result.data.email,
        date: result.data.date
      });
    }
    getData();
  }, []);

  return (
    <div className="profile-page">
      <h1>Profile</h1>
      <h4>{`Welcome ${profile.name}`}</h4>
      <h4>{`Email ${profile.email}`}</h4>
      <h4>{`Member since ${new Date(profile.date).toDateString()}`}</h4>
      <h3>Search Citites</h3>
      <SearchComponent />
    </div>
  );
};
export default Profile;
