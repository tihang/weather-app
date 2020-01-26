import React from 'react';
import { Link } from 'react-router-dom';
import { isLoggedIn } from '../helpers/Auth';

const guest = () => (
  <div className="home-page">
    <h1>Welcome to Anchor Weather.</h1>
    <h3>Sign up to start searching.</h3>
    <Link to="/signup">
      <button className="btn btn-secondary" type="button">
        Sign me up!
      </button>
    </Link>
    <hr />
    <h3>Already have an account?</h3>
    <Link to="/login">
      <button className="btn btn-secondary" type="button">
        Login
      </button>
    </Link>
  </div>
);

const user = () => (
  <div className="home-page">
    <h1>Welcome to Anchor Weather.</h1>
    <h3>You are logged in</h3>
    <hr />
    <Link to="/profile">
      <button className="btn btn-secondary" type="button">
        Profile Page
      </button>
    </Link>
  </div>
);

const Home = () => <div className="home-page">{isLoggedIn() ? user() : guest()}</div>;

export default Home;
