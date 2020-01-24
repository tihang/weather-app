import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
  <div className="home-page">
    <h1>Welcome to Anchor Weather.</h1>
    <h3>Sign up to start searching.</h3>
    <hr />
    <Link to="/signup">
      <button className="btn btn-secondary" type="button">
        Sign me up!
      </button>
    </Link>
  </div>
);

export default Home;
