import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ProfileDetail = ({ profile }) => (
  <div className="profile-detail">
    <h2>{`${profile.name}`}</h2>
    <h4>{`Email: ${profile.email}`}</h4>
    <h4>{`Member since ${new Date(profile.date).toDateString()}`}</h4>
    <br />
    <Link to="/search">
      <h3>Add More to watchlist</h3>
    </Link>
  </div>
);

ProfileDetail.propTypes = {
  profile: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.array])).isRequired
};

export default ProfileDetail;
