import React from 'react';
import '../styles/app.scss';
import { Link } from 'react-router-dom';
import { isLoggedIn, logout } from '../helpers/Auth';
import Logo from '../assets/logo.png';

const guestLinks = () => (
  <ul>
    <Link to="/">
      <li>
        <img src={Logo} alt="Logo" />
      </li>
    </Link>
    <Link to="/">
      <li>Home</li>
    </Link>
    <Link to="/signup">
      <li>Signup</li>
    </Link>
    <Link to="/login">
      <li>Login</li>
    </Link>
  </ul>
);
const userLink = () => (
  <ul>
    <Link to="/profile">
      <li>
        <img src={Logo} alt="Logo" />
      </li>
    </Link>
    <Link to="/profile">
      <li>Profile</li>
    </Link>
    <Link to="/logout" onClick={logout}>
      <li>Logout</li>
    </Link>
  </ul>
);

const Nav = () => <nav>{isLoggedIn() ? userLink() : guestLinks()}</nav>;

export default Nav;
